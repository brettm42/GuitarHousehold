import * as React from 'react';
import Link from 'next/link';
import { TableDataCell } from './DataDetailTableColumns';
import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';
import { summarizeGuitar } from '../../data/guitarservice/guitarutils';

type DataDetailTableRowProps = {
  columns: ReadonlyArray<TableDataCell>;
  guitar: Project;
};

const DataDetailTableRow: React.FC<DataDetailTableRowProps> = ({ columns, guitar }) => {
  return (
    <tr className="border-b border-neutral-200/70 hover:bg-neutral-50/80 transition-colors text-sm">
      <td className="px-4 py-3 text-center font-mono text-xs text-neutral-500 font-medium">
        {guitar.id}
      </td>

      <td className="px-4 py-3 min-w-[200px]">
        <Link
          href={`/detail/${guitar.id}`}
          className="font-semibold text-neutral-900 hover:text-[#FE6B8B] transition-colors"
        >
          {guitar.name}
        </Link>
        <div className="text-xs text-neutral-500 mt-0.5 max-w-xs">
          {summarizeGuitar(guitar as Guitar)}
        </div>
      </td>

      {columns.map((cell) => {
        if (cell.id === 'id' || cell.id === 'name') {
          return null;
        }

        const value = cell.formatter
          ? cell.formatter(guitar)
          : (guitar[cell.id] as React.ReactNode);

        return (
          <td key={`${guitar.id}-${cell.id}`} className="px-4 py-3 text-neutral-700 whitespace-nowrap">
            {value !== undefined && value !== null ? String(value) : '—'}
          </td>
        );
      })}
    </tr>
  );
};

export default DataDetailTableRow;
