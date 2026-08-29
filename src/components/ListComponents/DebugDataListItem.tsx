import * as React from 'react';
import Link from 'next/link';
import { DataListItemProps } from './DataListItem';
import { getValidationStatus } from '../../data/guitarservice/validation';
import { useAccount } from '../../contexts/AccountContext';

const DebugDataListItem: React.FC<DataListItemProps> = ({ data }) => {
  const status = React.useMemo(() => getValidationStatus(data), [data]);
  const { activeAccount } = useAccount();

  const queryParam = activeAccount?.id ? `&account=${encodeURIComponent(activeAccount.id)}` : '';

  return (
    <div className="py-1.5 flex flex-wrap items-center justify-between gap-2">
      <Link
        href={`/debug?id=${data.id}${queryParam}`}
        className="font-medium text-sm text-neutral-900 hover:text-brand-primary transition-colors"
      >
        <span className="font-mono text-xs text-neutral-500 mr-1.5">{data.id}:</span>
        {data.name}
      </Link>
      <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
        {status}
      </span>
    </div>
  );
};

export default DebugDataListItem;
