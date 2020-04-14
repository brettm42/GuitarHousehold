import * as React from 'react';

import { ListDetailProps } from './ListDetail';

import { Guitar } from '../../interfaces/models/guitar';

import { validateGuitar } from '../../data/guitarservice/validation';

function getValidationCount(results: Map<string, string>[]): number {
  let count = 0;
  for (const cat of results) {
    count += cat.size;
  }

  return count;
}

function getValidationPrefix(cat: Map<string, string>, fallbackString: string | number): string {
  const firstEntry = [ ...cat.keys() ][0];

  return firstEntry
    ? firstEntry.split('-')[0] ?? fallbackString.toString()
    : fallbackString.toString();
}

const DebugListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: entry,
}) => {
  const validation = validateGuitar(entry as Guitar);
  const validationCount = getValidationCount(validation);

  return (
    <div>
      <h1>Debug {entry.id}</h1>
      <p>{entry.name}</p>
      <p>{validationCount} properties missing from model</p>
      <hr />
      <div>
        {validation.map((t, idx) => {
          if (t.size > 0) {
            return (
              <div>
                <p>{getValidationPrefix(t, idx)}</p>
                {[ ...t ].map(i => {
                  return (
                    <p>{JSON.stringify(i, undefined, 2)}</p>
                  );
                })}
              </div>)
          }

          return null;
        })}
      </div>
      <hr />
      <div>
        <pre>{JSON.stringify(entry, undefined, 2)}</pre>
      </div>
    </div>
  );
}

export default DebugListDetail;