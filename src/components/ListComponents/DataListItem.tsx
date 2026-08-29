import * as React from 'react';
import Link from 'next/link';
import { Entry } from '../../interfaces/entry';

export type DataListItemProps = {
  data: Entry;
};

const DataListItem: React.FC<DataListItemProps> = ({ data }) => (
  <div className="py-1">
    <Link
      href={`/detail/${data.id}`}
      className="text-neutral-900 font-medium hover:text-[#FE6B8B] transition-colors text-sm inline-block"
    >
      <span className="font-mono text-xs text-neutral-500 mr-1.5">{data.id}:</span>
      {data.name}
    </Link>
  </div>
);

export default DataListItem;
