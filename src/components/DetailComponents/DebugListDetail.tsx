import * as React from 'react';
import { ListDetailProps } from './ListDetail';
import { ValidationFlag } from '../../infrastructure/sharedprops';
import {
  getValidationCount,
  getValidationPrefix,
  validate,
} from '../../data/guitarservice/validation';

const DebugListDetail: React.FC<ListDetailProps> = ({ item: entry }) => {
  const validation = entry.validation ? entry.validation : validate(entry);
  const issueCount = getValidationCount(validation);
  const criticalCount = getValidationCount(validation, ValidationFlag.Critical);
  const warningCount = getValidationCount(validation, ValidationFlag.Warning);
  const missingCount = getValidationCount(validation, ValidationFlag.Missing);
  const optionalCount = getValidationCount(validation, ValidationFlag.Optional);

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Debug #{entry.id}</h1>
        <p className="text-lg text-neutral-700 font-medium mt-1">{entry.name}</p>
      </div>

      {issueCount > 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
          <p className="font-bold text-amber-900">{issueCount} issues for model:</p>
          <ul className="text-sm space-y-1 text-amber-800 list-disc list-inside">
            {criticalCount > 0 && <li className="font-semibold text-red-600">{criticalCount} critical issues</li>}
            {warningCount > 0 && <li>{warningCount} warnings</li>}
            {missingCount > 0 && <li>{missingCount} missing properties</li>}
            {optionalCount > 0 && <li>{optionalCount} missing optional properties</li>}
          </ul>
        </div>
      ) : (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium">
          No validation issues found.
        </div>
      )}

      <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3 shadow-xs">
        <h3 className="font-bold text-neutral-800 text-sm">Validation Details</h3>
        {validation.map((t, idx) => {
          if (t.size > 0) {
            return (
              <div key={idx} className="bg-neutral-50 p-3 rounded-lg text-xs font-mono space-y-1 border border-neutral-200">
                <p className="font-bold text-neutral-800">{getValidationPrefix(t, idx)}</p>
                {[...t].map((i, pIdx) => (
                  <p key={pIdx} className="text-neutral-600">{JSON.stringify(i, undefined, 2)}</p>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="bg-neutral-900 text-neutral-100 rounded-xl p-4 overflow-x-auto shadow-md">
        <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">Raw JSON</h4>
        <pre className="text-xs font-mono leading-relaxed">{JSON.stringify(entry, undefined, 2)}</pre>
      </div>
    </div>
  );
};

export default DebugListDetail;
