import { Tokens } from '../../infrastructure/constants';

const reverbApiEndpoint = 'https://api.reverb.com/api';

async function buildReverbRequestAsync(): Promise<RequestInit> {
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

export async function findSimilarListingCountAsync(keywords: string): Promise<string | undefined> {
  const res = await fetch(`${reverbApiEndpoint}/my/follows/search?query=${keywords}&ships_to=US_CON`, await buildReverbRequestAsync())
    .then(response => response.text())
    .catch(error => 
      {
        console.log(`ReverbServiceError: ${error}`, error);
        
        return error;
      });
    
  return res;
}
