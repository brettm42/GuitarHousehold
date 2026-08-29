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
    <tr className="group border-b border-neutral-200/70 hover:bg-neutral-50/80 transition-colors text-sm">
      <td className="sticky left-0 z-10 bg-white group-hover:bg-neutral-50 px-4 py-3 text-center font-mono text-xs text-neutral-500 font-medium w-16 min-w-[64px]">
        {guitar.id}
      </td>

      <td className="sticky left-16 z-10 bg-white group-hover:bg-neutral-50 px-4 py-3 min-w-[200px] sm:min-w-[240px] border-r border-neutral-200 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]">
        <Link
          href={`/detail/${guitar.id}`}
          className="font-semibold text-neutral-900 hover:text-brand-primary transition-colors"
        >
          {guitar.name}
        </Link>
        <div className="text-xs text-neutral-500 mt-0.5 max-w-xs truncate">
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
