import * as React from 'react';

import { ListDetailProps } from './ListDetail';

import { ValidationFlag } from '../../infrastructure/shared';

import { validate } from '../../data/guitarservice/validation';

function getValidationCount(results: ReadonlyArray<Map<string, ValidationFlag>>, flag: ValidationFlag | null = null): number {
  let count = 0;

  if (!flag) {  
    for (const cat of results) {
      count += cat.size;
    }

    return count;
  } else {
    for (const cat of results) {
      for (const item of cat.values()) {
        if (item === flag) {
          count += 1;
        }
      }
    }
  }

  return count;
}

function getValidationPrefix(cat: Map<string, ValidationFlag>, fallbackString: string | number): string {
  const firstEntry = [ ...cat.keys() ][0];

  return firstEntry
    ? firstEntry.split('-')[0] ?? fallbackString.toString()
    : fallbackString.toString();
}

const DebugListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: entry,
}) => {
  const validation = entry.validation ? entry.validation : validate(entry);
  const issueCount = getValidationCount(validation);
  const criticalCount = getValidationCount(validation, ValidationFlag.Critical);
  const warningCount = getValidationCount(validation, ValidationFlag.Warning);
  const missingCount = getValidationCount(validation, ValidationFlag.Missing);
  const optionalCount = getValidationCount(validation, ValidationFlag.Optional);

  return (
    <div>
      <h1>Debug {entry.id}</h1>
      <p>{entry.name}</p>
      {issueCount > 0 
        ? (
          <div>
            <p>{issueCount} issues for model:</p>
            <ul>
              <li>{criticalCount} critical issues</li>
              <li>{warningCount} warnings</li>
              <li>{missingCount} missing properties</li>
              <li>{optionalCount} missing optional properties</li>
            </ul>
          </div>
        )
        : null}
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
