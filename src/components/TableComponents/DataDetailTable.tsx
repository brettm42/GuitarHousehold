import * as React from 'react';
import DataDetailTableHead from './DataDetailTableHead';
import DataDetailTableRow from './DataDetailTableRow';
import { BaseColumns, GuitarColumns, ProjectColumns, TableDataCell } from './DataDetailTableColumns';
import { tableSort } from '../viewutils';
import { Entry } from '../../interfaces/entry';
import { Project } from '../../interfaces/models/project';
import { getStringText } from '../../data/stringservice/stringservice';

type DataDetailTableProps = {
  items: Entry[];
  columns: Columns;
};

export type Order = 'asc' | 'desc';
export type Columns = 'archive' | 'guitar' | 'instrument' | 'project' | 'wishlist';

function extractSortValue(item: Project, column?: TableDataCell): any {
  if (!item || !column) return null;

  if (column.sortValue) {
    return column.sortValue(item);
  }

  if (column.formatter) {
    return column.formatter(item);
  }

  return item[column.id];
}

export function compareTableValues(a: Project, b: Project, column?: TableDataCell): number {
  const valA = extractSortValue(a, column);
  const valB = extractSortValue(b, column);

  const isEmptyA = valA === null || valA === undefined || valA === '' || valA === '—';
  const isEmptyB = valB === null || valB === undefined || valB === '' || valB === '—';

  if (isEmptyA && isEmptyB) return 0;
  if (isEmptyA) return 1;
  if (isEmptyB) return -1;

  // Booleans
  if (
    typeof valA === 'boolean' ||
    typeof valB === 'boolean' ||
    valA === 'true' ||
    valA === 'false' ||
    valB === 'true' ||
    valB === 'false'
  ) {
    const boolA = valA === true || valA === 'true' ? 1 : 0;
    const boolB = valB === true || valB === 'true' ? 1 : 0;
    return boolA - boolB;
  }

  // Pure numbers
  if (typeof valA === 'number' && typeof valB === 'number') {
    return valA - valB;
  }

  const strA = String(valA).trim();
  const strB = String(valB).trim();

  // Currency or Numeric Columns
  const cleanNumA = strA.replace(/[$,]/g, '').replace(/[^\d.-]/g, '');
  const cleanNumB = strB.replace(/[$,]/g, '').replace(/[^\d.-]/g, '');
  const isNumericA = cleanNumA !== '' && !isNaN(Number(cleanNumA));
  const isNumericB = cleanNumB !== '' && !isNaN(Number(cleanNumB));

  if (
    (column?.id === 'id' ||
      column?.id === 'purchasePrice' ||
      column?.id === 'manufactureYear' ||
      column?.id === 'components') &&
    isNumericA &&
    isNumericB
  ) {
    return Number(cleanNumA) - Number(cleanNumB);
  }

  // Date Columns
  if (
    column?.id === 'purchaseDate' ||
    column?.id === 'projectStart' ||
    column?.id === 'projectComplete'
  ) {
    const timeA = Date.parse(strA);
    const timeB = Date.parse(strB);
    if (!isNaN(timeA) && !isNaN(timeB)) {
      return timeA - timeB;
    }
  }

  return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
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

  const tableCells = React.useMemo(() => getTableColumns(props.columns), [props.columns]);

  const handleRequestSort = (event: React.MouseEvent, property: keyof Project) => {
    event.preventDefault();
    if (orderBy === property) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(property);
      setOrder('asc');
    }
  };

  const activeColumn = React.useMemo(() => {
    return tableCells.find((c) => c.id === orderBy);
  }, [tableCells, orderBy]);

  const sortedItems = React.useMemo(() => {
    return tableSort(guitars, (a, b) => {
      const cmp = compareTableValues(a as Project, b as Project, activeColumn);
      return order === 'desc' ? -cmp : cmp;
    });
  }, [guitars, order, activeColumn]);

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
