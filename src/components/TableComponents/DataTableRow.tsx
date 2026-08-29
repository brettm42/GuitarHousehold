import * as React from 'react';
import Link from 'next/link';
import { Entry } from '../../interfaces/entry';
import { Guitar } from '../../interfaces/models/guitar';
import { summarizeGuitar } from '../../data/guitarservice/guitarutils';
import { getStringText } from '../../data/stringservice/stringservice';

type DataTableRowProps = {
  item: Entry;
};

const DataTableRow: React.FC<DataTableRowProps> = ({ item }) => {
  return (
    <tr className="border-b border-neutral-200/70 hover:bg-neutral-50/80 transition-colors text-sm">
      <td className="px-4 py-3 text-center font-mono text-xs text-neutral-500 font-medium w-16">
        {item.id}
      </td>

      <td className="px-2 py-3 text-center text-neutral-300 select-none w-6" aria-hidden="true">
        {getStringText('DataTableSeparator') || '•'}
      </td>

      <td className="px-4 py-3">
        <Link
          href={`/detail/${item.id}`}
          className="font-semibold text-neutral-900 hover:text-brand-primary transition-colors"
        >
          {item.name}
        </Link>
        <div className="text-xs text-neutral-500 mt-0.5 max-w-sm">
          {summarizeGuitar(item as Guitar)}
        </div>
      </td>
    </tr>
  );
};

export default DataTableRow;
