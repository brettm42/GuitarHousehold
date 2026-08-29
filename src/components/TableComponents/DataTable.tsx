import DataTableRow from './DataTableRow';
import { Entry } from '../../interfaces/entry';
import { getStringText } from '../../data/stringservice/stringservice';

type DataTableProps = {
  items: Entry[];
  columns?: string;
};

export default function DataTable(props: DataTableProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow-xs border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label={getStringText('GuitarDataTabelLabel')}>
          <tbody>
            {props.items.map((item, idx) => (
              <DataTableRow key={item.id || idx} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
