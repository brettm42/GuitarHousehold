import * as http from 'http';
import * as https from 'https';

const blsCalculatorEndpoint = 'https://data.bls.gov/cgi-bin/cpicalc.pl';

const defaultRequestTimeout = 5000;

export async function findCostToday(cost: number, purchaseDate: string): Promise<string | undefined> {
  if (cost < 0 || !purchaseDate) {
    return undefined;
  }

  const parseDate = new Date(Date.parse(purchaseDate));
  const currentDate = new Date();
  currentDate.setDate(0);
  currentDate.setDate(1);
  currentDate.setDate(0);
  currentDate.setDate(1);

  const url = 
    `${blsCalculatorEndpoint}?cost1=${cost}`
    + `&year1=${parseDate.getFullYear()}${('0' + (parseDate.getMonth() + 1)).slice(-2)}`
    + `&year2=${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}`;

  return await webRequest(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);

      return undefined;
    });
}

async function webRequest(url: string) {
  let body = '';

  https.get(url, (res: http.IncomingMessage) => {
    res.setTimeout(defaultRequestTimeout);
    res.setEncoding('utf8');

    res.on('data', data => {
      body += data;
    });
  });

  return body;
}
