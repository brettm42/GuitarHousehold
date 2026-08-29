import * as React from 'react';
import {
  AllPurchaseStoreChart,
  GuitarColorChart,
  GuitarMakeChart,
  GuitarPriceChart,
  PurchaseStoreChart,
  PurchaseYearChart,
} from './ChartComponents';
import { Guitar } from '../../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[];
  isMobile?: boolean;
};

const chartsConfig = [
  { id: 'price', Component: GuitarPriceChart, bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]' },
  { id: 'year', Component: PurchaseYearChart, bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]' },
  { id: 'store', Component: PurchaseStoreChart, bg: 'bg-[#F7A278]/70 border-[#F7A278]' },
  { id: 'color', Component: GuitarColorChart, bg: 'bg-[#C7C1A6]/70 border-[#C7C1A6]' },
  { id: 'make', Component: GuitarMakeChart, bg: 'bg-[#D4A4B8]/70 border-[#D4A4B8]' },
  { id: 'allStore', Component: AllPurchaseStoreChart, bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]' },
];

const ChartComponent: React.FC<SummaryProps> = ({ data: guitars, isMobile }) => {
  const props = { data: guitars, isMobile: !!isMobile };

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartsConfig.map(({ id, Component, bg }) => (
          <div
            key={id}
            className={`rounded-xl shadow-xs border overflow-hidden backdrop-blur-xs transition-shadow hover:shadow-md ${bg}`}
          >
            <Component {...props} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;
