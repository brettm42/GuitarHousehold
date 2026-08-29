import * as React from 'react';
import { Entry } from '../../interfaces/entry';

export type ListDetailProps = {
  item: Entry;
};

const ListDetail: React.FC<ListDetailProps> = ({ item: entry }) => (
  <div className="p-6 bg-white rounded-xl shadow-xs border border-neutral-200 space-y-2">
    <h1 className="text-xl font-bold text-neutral-900">Detail for {entry.name}</h1>
    <p className="text-sm text-neutral-500 font-mono">ID: {entry.id}</p>
    <p className="text-sm text-neutral-700">Description: {entry.description}</p>
  </div>
);

export default ListDetail;
