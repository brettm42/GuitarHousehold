import * as React from 'react';
import Link from 'next/link';
import { DataListItemProps } from './DataListItem';
import { getValidationStatus } from '../../data/guitarservice/validation';

const DebugDataListItem: React.FC<DataListItemProps> = ({ data }) => {
  return (
    <div className="py-1.5 flex flex-wrap items-center justify-between gap-2">
      <Link
        href={`/debug?id=${data.id}`}
        className="font-medium text-sm text-neutral-900 hover:text-[#FE6B8B] transition-colors"
      >
        <span className="font-mono text-xs text-neutral-500 mr-1.5">{data.id}:</span>
        {data.name}
      </Link>
      {data.validation && (
        <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
          {getValidationStatus(data)}
        </span>
      )}
    </div>
  );
};

export default DebugDataListItem;
