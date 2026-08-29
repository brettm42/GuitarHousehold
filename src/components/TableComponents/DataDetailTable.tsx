import * as React from 'react';
import DataDetailTableHead from './DataDetailTableHead';
import DataDetailTableRow from './DataDetailTableRow';
import { BaseColumns, GuitarColumns, ProjectColumns, TableDataCell } from './DataDetailTableColumns';
import { isDescending, tableSort } from '../viewutils';
import { Entry } from '../../interfaces/entry';
import { Project } from '../../interfaces/models/project';
import { getStringText } from '../../data/stringservice/stringservice';

type DataDetailTableProps = {
  items: Entry[];
  columns: Columns;
};

export type Order = 'asc' | 'desc';
export type Columns = 'archive' | 'guitar' | 'instrument' | 'project' | 'wishlist';

function getTableSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (a: { [key in K]: any }, b: { [key in K]: any }) => number {
  return order === 'desc'
    ? (a, b) => isDescending(a, b, orderBy)
    : (a, b) => -isDescending(a, b, orderBy);
}

function getTableColumns(columns: Columns): ReadonlyArray<TableDataCell> {
  return columns === 'guitar' || columns === 'archive'
    ? [...BaseColumns, ...GuitarColumns]
    : columns === 'project'
      ? [...ProjectColumns]
      : BaseColumns;
}

export default function DataDetailTable(props: DataDetailTableProps) {
  const guitars = props.items as Project[];
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Project>('id');

  const handleRequestSort = (event: React.MouseEvent, property: keyof Project) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    event.preventDefault();
  };

  const tableCells = getTableColumns(props.columns);
  const sortedItems = React.useMemo(() => {
    return tableSort(guitars, getTableSorting(order, orderBy));
  }, [guitars, order, orderBy]);

  return (
    <div className="w-full bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden my-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label={getStringText('DataDetailTableLabel')}>
          <DataDetailTableHead
            columns={tableCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <tbody className="divide-y divide-neutral-100">
            {sortedItems.map((guitar) => (
              <DataDetailTableRow
                key={guitar.id}
                columns={tableCells}
                guitar={guitar}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
