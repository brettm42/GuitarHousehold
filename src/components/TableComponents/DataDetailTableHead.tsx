import * as React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { TableDataCell } from './DataDetailTableColumns';
import { Project } from '../../interfaces/models/project';
import { Order } from './DataDetailTable';

interface DataDetailTableHeadProps {
  columns: ReadonlyArray<TableDataCell>;
  onRequestSort: (event: React.MouseEvent, property: keyof Project) => void;
  order: Order;
  orderBy: string;
}

const DataDetailTableHead: React.FC<DataDetailTableHeadProps> = ({
  columns,
  onRequestSort,
  order,
  orderBy,
}) => {
  const createSortHandler =
    (property: keyof Project) => (event: React.MouseEvent) => {
      onRequestSort(event, property);
    };

  return (
    <thead className="bg-neutral-100 text-neutral-700 text-xs uppercase font-semibold border-b border-neutral-200">
      <tr>
        {columns.map((cell) => {
          const isSorted = orderBy === cell.id;
          return (
            <th
              key={cell.id}
              scope="col"
              className={`px-4 py-3 select-none cursor-pointer hover:bg-neutral-200/70 transition-colors ${
                cell.label === 'id' ? 'text-center w-16' : 'text-left'
              }`}
              onClick={createSortHandler(cell.id)}
            >
              <div className="inline-flex items-center space-x-1.5 group">
                <span>{cell.label}</span>
                <span className="text-neutral-400 group-hover:text-neutral-700">
                  {isSorted ? (
                    order === 'desc' ? (
                      <ArrowDown className="w-3.5 h-3.5 text-neutral-900" />
                    ) : (
                      <ArrowUp className="w-3.5 h-3.5 text-neutral-900" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default DataDetailTableHead;
