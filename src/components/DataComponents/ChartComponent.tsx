import * as React from 'react';
import {
  AllPurchaseStoreChart,
  BodyStyleChart,
  GuitarColorChart,
  GuitarMakeChart,
  GuitarPriceChart,
  ManufactureDecadeChart,
  ProjectDurationChart,
  PurchaseStoreChart,
  PurchaseYearChart,
  ScaleLengthChart,
  StringAgeChart,
  ValueAppreciationChart,
} from './ChartComponents';
import { Guitar } from '../../interfaces/models/guitar';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';

type SummaryProps = {
  data: Guitar[];
  isMobile?: boolean;
};

interface ChartConfigItem {
  id: string;
  Component: React.FC<{ data: Guitar[]; isMobile?: boolean }>;
  bg: string;
  hasData?: (guitars: Guitar[]) => boolean;
}

const chartsConfig: ChartConfigItem[] = [
  {
    id: 'decade',
    Component: ManufactureDecadeChart,
    bg: 'bg-[#F7A278]/70 border-[#F7A278]',
    hasData: (g) => g.some((item) => !!item.manufactureYear),
  },
  {
    id: 'bodyStyle',
    Component: BodyStyleChart,
    bg: 'bg-[#D4A4B8]/70 border-[#D4A4B8]',
    hasData: (g) => g.some((item) => !!item.bodyStyle),
  },
  {
    id: 'price',
    Component: GuitarPriceChart,
    bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]',
    hasData: (g) => g.length > 0,
  },
  {
    id: 'year',
    Component: PurchaseYearChart,
    bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]',
    hasData: (g) => g.some((item) => !!item.purchaseDate || !!(item as any).projectComplete),
  },
  {
    id: 'make',
    Component: GuitarMakeChart,
    bg: 'bg-[#C7C1A6]/70 border-[#C7C1A6]',
    hasData: (g) => g.some((item) => !!item.make),
  },
  {
    id: 'color',
    Component: GuitarColorChart,
    bg: 'bg-[#D4A4B8]/70 border-[#D4A4B8]',
    hasData: (g) => g.some((item) => !!item.color),
  },
  {
    id: 'scale',
    Component: ScaleLengthChart,
    bg: 'bg-[#F7A278]/70 border-[#F7A278]',
    hasData: (g) => g.some((item) => !!item.scale),
  },
  {
    id: 'store',
    Component: PurchaseStoreChart,
    bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]',
    hasData: (g) => g.some((item) => !!item.purchaseStore),
  },
  {
    id: 'allStore',
    Component: AllPurchaseStoreChart,
    bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]',
    hasData: (g) => g.length > 0,
  },
  {
    id: 'projectDuration',
    Component: ProjectDurationChart,
    bg: 'bg-[#C7C1A6]/70 border-[#C7C1A6]',
    hasData: (g) => g.some((item) => (item as any).projectStart),
  },
  {
    id: 'stringAge',
    Component: StringAgeChart,
    bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]',
    hasData: (g) => g.length > 0,
  },
  {
    id: 'appreciation',
    Component: ValueAppreciationChart,
    bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]',
    hasData: (g) => g.some((item) => GuitarUtils.getGuitarCost(item) > 0),
  },
];

const ChartComponent: React.FC<SummaryProps> = ({ data: guitars, isMobile }) => {
  const props = { data: guitars, isMobile: !!isMobile };

  const activeCharts = React.useMemo(() => {
    return chartsConfig.filter((chart) => (chart.hasData ? chart.hasData(guitars) : true));
  }, [guitars]);

  if (activeCharts.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeCharts.map(({ id, Component, bg }) => (
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
