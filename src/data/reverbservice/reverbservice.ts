import { roundToHundredthsString } from '../../infrastructure/datautils';

const maxPagesPerRequest = 35;
const reverbEndpoint = 'https://reverb.com';
const reverbApiEndpoint = 'https://api.reverb.com/api';

export class Listing {
  make?: string;
  model?: string;
  finish?: string;
  title?: string;
  price: number = 0;
}

interface Search {
  keywords: string;
  date: number;
  results: Listing[];
}

interface AccountCache {
  searches: { [keywords: string]: Search };
  cacheHits: number;
}

// Scoped per-account cache storage
const accountCaches = new Map<string, AccountCache>();

function getAccountCache(accountId: string = 'default'): AccountCache {
  if (!accountCaches.has(accountId)) {
    accountCaches.set(accountId, {
      searches: {},
      cacheHits: 0,
    });
  }
  return accountCaches.get(accountId)!;
}

function addRecentSearch(keywords: string, results: Listing[], accountId?: string) {
  const cache = getAccountCache(accountId);
  cache.searches[keywords] = {
    keywords: keywords,
    date: Date.now(),
    results: results,
  };
}

function buildReverbRequestAsync(token?: string): RequestInit {
  const requestHeaders = new Headers();
  requestHeaders.append('Content-Type', 'application/hal+json');
  if (token) {
    requestHeaders.append('X-Auth-Token', token);
  }
  requestHeaders.append('Accept-Version', '3.0');

  return {
    method: 'GET',
    headers: requestHeaders,
    redirect: 'follow',
  };
}

function parseReverbResponse(response: any): Listing {
  const listing = new Listing();
  if (response.make) {
    listing.make = response.make;
  }

  if (response.model) {
    listing.model = response.model;
  }

  if (response.title) {
    listing.title = response.title;
  }

  if (response.finish) {
    listing.finish = response.finish;
  }

  if (response.price?.amount) {
    listing.price = response.price.amount;
  }

  return listing;
}

async function fetchQueryKeywordsWithPageAsync(
  keywords: string,
  page: number | string,
  token?: string
) {
  return await fetch(
    `${reverbApiEndpoint}/listings/all?query=${encodeURI(keywords)}&page=${page}`,
    buildReverbRequestAsync(token)
  )
    .catch((error) => {
      throw new Error(`ReverbServiceError: ${error}`);
    })
    .then((res) => (res ? res.json() : ''));
}

export async function getRecentSearchCacheStatsAsync(accountId?: string): Promise<string> {
  const cache = getAccountCache(accountId);
  const result = Object.keys(cache.searches).length;
  return `cached ${result} search${result === 1 ? '' : 'es'} with ${cache.cacheHits} hit${cache.cacheHits === 1 ? '' : 's'}`;
}

export function getReverbUserFriendlyUrl(keywords: string): string {
  return `${reverbEndpoint}/marketplace?query=${encodeURI(keywords)}`;
}

export async function parsedResponseJsonAsync(
  keywords: string,
  token?: string,
  accountId?: string
) {
  const cache = getAccountCache(accountId);
  if (cache.searches[keywords]) {
    cache.cacheHits++;
    return cache.searches[keywords].results.map((i) => JSON.stringify(i));
  }

  let currentPage = 1;
  let totalPages = 1;

  const initialResponse: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage, token);
  if (!initialResponse || !initialResponse.listings) {
    return [];
  }

  let listings = [...initialResponse.listings];
  totalPages = initialResponse.total_pages;

  while (currentPage < totalPages && currentPage < maxPagesPerRequest) {
    currentPage++;

    const response: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage, token);
    if (!response || !response.listings) {
      break;
    }

    listings = [...listings, ...response.listings];
    currentPage = response.current_page;
  }

  addRecentSearch(
    keywords,
    listings.map((response: any) => parseReverbResponse(response)),
    accountId
  );

  return listings.map((response: any) => {
    return JSON.stringify({
      make: response.make,
      model: response.model,
      title: response.title,
      finish: response.finish,
      price: response.price?.amount,
    });
  });
}

export async function parsedResponseAsync(
  keywords: string,
  token?: string,
  accountId?: string
): Promise<Listing[]> {
  const cache = getAccountCache(accountId);
  if (cache.searches[keywords]) {
    cache.cacheHits++;
    return cache.searches[keywords].results;
  }

  let currentPage = 1;
  let totalPages = 1;

  const initialResponse: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage, token);
  if (!initialResponse || !initialResponse.listings) {
    return [];
  }

  let listings = [...initialResponse.listings];
  totalPages = initialResponse.total_pages;

  while (currentPage < totalPages && currentPage < maxPagesPerRequest) {
    currentPage++;

    const response: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage, token);
    if (!response || !response.listings) {
      break;
    }

    listings = [...listings, ...response.listings];
    currentPage = response.current_page;
  }

  const parsed = listings.map((response: any) => parseReverbResponse(response));
  addRecentSearch(keywords, parsed, accountId);

  return parsed;
}

export async function averagePriceForKeywordsAsync(
  keywords: string,
  token?: string,
  accountId?: string
): Promise<string> {
  const results = await parsedResponseAsync(keywords, token, accountId);

  if (results.length < 1) {
    return `No results for ${keywords}`;
  }

  const average =
    results.reduce((a: number, i: Listing) => +a + +i.price, 0) / results.length;

  return `${roundToHundredthsString(average)}`;
}

export async function numberOfListingsForKeywordsAsync(
  keywords: string,
  token?: string,
  accountId?: string
): Promise<string> {
  const results = await parsedResponseAsync(keywords, token, accountId);

  if (results.length < 1) {
    return '0';
  }

  return `${results.length}`;
}

export function clearReverbCache(accountId?: string): void {
  if (accountId) {
    accountCaches.delete(accountId);
  } else {
    accountCaches.clear();
  }
}
