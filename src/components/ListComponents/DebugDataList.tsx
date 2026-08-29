import * as React from 'react';
import DebugDataListItem from './DebugDataListItem';
import { DataListProps } from './DataList';
import { summarizeValidation, validate } from '../../data/guitarservice/validation';
import { ValidationFlag } from '../../infrastructure/sharedprops';

const DebugDataList: React.FC<DataListProps> = ({ items }) => {
  const itemsWithValidation = React.useMemo(() => {
    return items.map((item) => ({
      ...item,
      validation: validate(item),
    }));
  }, [items]);

  const summary = React.useMemo(() => {
    return summarizeValidation(
      itemsWithValidation.map((i) => [i.name, i.validation])
    );
  }, [itemsWithValidation]);

  const criticalItems = React.useMemo(() => {
    const list = [];
    for (const item of itemsWithValidation) {
      for (const entry of item.validation ?? []) {
        if (entry instanceof Map) {
          for (const validation of entry.values()) {
            if (validation === ValidationFlag.Critical) {
              list.push(item);
              break;
            }
          }
        }
      }
    }
    return list;
  }, [itemsWithValidation]);

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Debug Page</h1>
        <h3 className="text-sm font-medium text-neutral-500 mt-1">Validate localdb health</h3>
      </div>

      <div className="bg-neutral-100 p-4 rounded-xl space-y-1 text-sm text-neutral-700">
        {summary.map((i, idx) => (
          <p key={idx}>{i}</p>
        ))}
      </div>

      {criticalItems.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
          <h4 className="font-bold text-red-800 text-sm uppercase tracking-wide">
            Items With Critical Issues ({criticalItems.length}):
          </h4>
          <ul className="divide-y divide-red-100">
            {criticalItems.map((item) => (
              <li key={item.id}>
                <DebugDataListItem data={item} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs">
        <h4 className="font-bold text-neutral-800 text-sm mb-3">All Items ({itemsWithValidation.length})</h4>
        <ul className="divide-y divide-neutral-100">
          {itemsWithValidation.map((item) => (
            <li key={item.id}>
              <DebugDataListItem data={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebugDataList;
