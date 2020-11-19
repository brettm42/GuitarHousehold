import { Tokens } from '../../infrastructure/constants';
import { roundToHundredths } from '../../infrastructure/datautils';

const maxPagesPerRequest = 35;
const reverbApiEndpoint = 'https://api.reverb.com/api';

let recentSearches: RecentSearches = {};

interface RecentSearches {
  [keywords: string]: Search
}

interface Search {
  keywords: string;
  date: number;
  results: Listing[];
}

class Listing {
  make?: string;
  model?: string;
  finish?: string;
  title?: string;
  price: number = 0;
};

function addRecentSearch(keywords: string, results: Listing[]) {
  recentSearches[keywords] =
    {
      keywords: keywords, 
      date: Date.now(), 
      results: results
    };

  console.log(`Recent searches now with: ${Object.keys(recentSearches)}`);
}

function buildReverbRequestAsync(): RequestInit {
  const requestHeaders = new Headers();
  requestHeaders.append('Content-Type', 'application/hal+json');
  requestHeaders.append('X-Auth-Token', Tokens.reverb);
  requestHeaders.append('Accept-Version', '3.0');

  return {
    method: 'GET',
    headers: requestHeaders,
    redirect: 'follow'
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

  if (response.price.amount) {
    listing.price = response.price.amount;
  }

  return listing;
}

async function fetchQueryKeywordsWithPageAsync(keywords: string, page: number | string) {
  return await 
    fetch(`${reverbApiEndpoint}/listings/all?query=${encodeURI(keywords)}&page=${page}`, buildReverbRequestAsync())
    .catch(error => 
      {
        console.log(`ReverbServiceError: ${error}`, error);
        
        return null;
      })
    .then(res => res ? res.json() : '');
}

export async function testParsedResponseJsonAsync(keywords: string) {
  if (recentSearches[keywords]) {
    console.log(`Found cached search: ${keywords}`);
    
    return recentSearches[keywords].results.map(i => JSON.stringify(i));
  }

  // Page indexing on Reverb start at 1
  let currentPage = 1;
  let totalPages = 1;

  const initialResponse: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage);
  if (!initialResponse) {
    return [];
  }

  let listings = [ ...initialResponse.listings];
  totalPages = initialResponse.total_pages;

  while (currentPage < totalPages && currentPage < maxPagesPerRequest) {
    currentPage++;

    const response: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage);
    if (!response) {
      break;
    }

    listings = [ ...listings, ...response.listings ];
    currentPage = response.current_page;
  }
  console.log(`Requested up to page: ${currentPage}`);

 addRecentSearch(
   keywords, 
   listings.map((response: any) => parseReverbResponse(response)));

  return listings.map(
    (response: any) => {
      return JSON.stringify({
        make: response.make,
        model: response.model,
        title: response.title,
        finish: response.finish,
        price: response.price.amount
      });
    });
}

export async function testParsedResponseAsync(keywords: string): Promise<Listing[]> {
  if (recentSearches[keywords]) {
    console.log(`Found cached search: ${keywords}`);

    return recentSearches[keywords].results;
  }

  // Page indexing on Reverb start at 1
  let currentPage = 1;
  let totalPages = 1;

  const initialResponse: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage);
  if (!initialResponse) {
    return [];
  }

  let listings = [ ...initialResponse.listings];
  totalPages = initialResponse.total_pages;

  while (currentPage < totalPages && currentPage < maxPagesPerRequest) {
    currentPage++;

    const response: any = await fetchQueryKeywordsWithPageAsync(keywords, currentPage);
    if (!response) {
      break;
    }

    listings = [ ...listings, ...response.listings ];
    currentPage = response.current_page;
  }
  console.log(`Requested up to page: ${currentPage}`);

  addRecentSearch(
    keywords, 
    listings.map((response: any) => parseReverbResponse(response)));

  return listings
    .map((response: any) => parseReverbResponse(response));
}

export async function testResponseAsync(keywords: string): Promise<string> {
  const res = await fetch(`${reverbApiEndpoint}/listings/all?query=${keywords}`, buildReverbRequestAsync())
    .then(response => response.text())
    .catch(error => 
      {
        console.log(`ReverbServiceError: ${error}`, error);
        
        return '';
      });
    
  return res;
}

export async function testAveragePriceForKeywordsASync(keywords: string, monetarySymbol: string): Promise<string> {
  const results = await testParsedResponseAsync(keywords);

  if (results.length < 1) {
    return `ReverbServiceError: no results for ${keywords}`;
  }

  const average = results.reduce(
      (a: number, i: Listing) => +a + +i.price, 0) 
    / results.length;

  return `Average Price for ${keywords}: ${monetarySymbol}${roundToHundredths(average)}`;
}
