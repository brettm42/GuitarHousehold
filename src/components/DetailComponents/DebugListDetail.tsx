import * as React from 'react';

import { ListDetailProps } from './ListDetail';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { ValidationFlag } from '../../infrastructure/shared';

import {
  getValidationCount,
  getValidationPrefix,
  validate
} from '../../data/guitarservice/validation';

const useStyles = makeStyles(() =>
  createStyles({
    json: {
      whiteSpace: 'nowrap',
      overflowY: 'hidden',
      overflowX: 'scroll'
    }
  }));

const DebugListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: entry,
}) => {
  const classes = useStyles();
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
              <li key='critical'>{criticalCount} critical issues</li>
              <li key='warning'>{warningCount} warnings</li>
              <li key='missing'>{missingCount} missing properties</li>
              <li key='optional'>{optionalCount} missing optional properties</li>
            </ul>
          </div>
        )
        : null}

      <hr />

      <div>
        {validation.map((t, idx) => {
          if (t.size > 0) {
            return (
              <div key={idx}>
                <p>{getValidationPrefix(t, idx)}</p>
                {[ ...t ].map((i, pIdx) => {
                  return (
                    <p key={pIdx}>{JSON.stringify(i, undefined, 2)}</p>
                  );
                })}
              </div>);
          }

          return null;
        })}
      </div>

      <hr />

      <div className={classes.json}>
        <pre>{JSON.stringify(entry, undefined, 2)}</pre>
      </div>
    </div>
  );
};

export default DebugListDetail;
