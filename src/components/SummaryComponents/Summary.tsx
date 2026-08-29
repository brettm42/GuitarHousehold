import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { getStringText } from '../../data/stringservice/stringservice';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';
import {
  BreakdownComponent,
  ConstructionComponent,
  MissingCasesComponent,
  MostCommonComponent,
  OutliersComponent,
  PartValuesComponent,
  PickupsComponent,
  ProjectInProgressComponent,
  RandomPickComponent,
  StringsComponent,
  TimelineComponent,
  UndeliveredGuitarsComponent,
  ValuesComponent,
} from './SummaryComponents';
import { Guitar } from '../../interfaces/models/guitar';

type SummaryProps = {
  data: Guitar[];
  isMobile?: boolean;
};

interface CardConfig {
  id: string;
  labelKey: string;
  Component: React.FC<{ data: Guitar[]; isMobile: boolean }>;
  bg: string;
  hasData?: (guitars: Guitar[]) => boolean;
}

const cardsConfig: CardConfig[] = [
  {
    id: 'popular',
    labelKey: 'SummaryLabelMostCommon',
    Component: MostCommonComponent,
    bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'outliers',
    labelKey: 'SummaryLabelOutliers',
    Component: OutliersComponent,
    bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'randomPick',
    labelKey: 'SummaryLabelRandomPick',
    Component: RandomPickComponent,
    bg: 'bg-[#F7A278]/70 border-[#F7A278]',
    hasData: (g) => g && g.length > 0 && !!GuitarUtils.randomPick(g),
  },
  {
    id: 'breakdown',
    labelKey: 'SummaryLabelBreakdown',
    Component: BreakdownComponent,
    bg: 'bg-[#C7C1A6]/70 border-[#C7C1A6]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'pickups',
    labelKey: 'SummaryLabelPickups',
    Component: PickupsComponent,
    bg: 'bg-[#D4A4B8]/70 border-[#D4A4B8]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'strings',
    labelKey: 'SummaryLabelStrings',
    Component: StringsComponent,
    bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'timeline',
    labelKey: 'SummaryLabelTimeline',
    Component: TimelineComponent,
    bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'cases',
    labelKey: 'SummaryLabelMissingCases',
    Component: MissingCasesComponent,
    bg: 'bg-[#F7A278]/70 border-[#F7A278]',
    hasData: (g) =>
      g && g.some((item) => !GuitarUtils.hasCase(item) && GuitarUtils.isDelivered(item)),
  },
  {
    id: 'values',
    labelKey: 'SummaryLabelValues',
    Component: ValuesComponent,
    bg: 'bg-[#C7C1A6]/70 border-[#C7C1A6]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'partValues',
    labelKey: 'SummaryLabelPartValues',
    Component: PartValuesComponent,
    bg: 'bg-[#6DD3CE]/70 border-[#6DD3CE]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'construction',
    labelKey: 'SummaryLabelConstruction',
    Component: ConstructionComponent,
    bg: 'bg-[#D4A4B8]/70 border-[#D4A4B8]',
    hasData: (g) => g && g.length > 0,
  },
  {
    id: 'undelivered',
    labelKey: 'SummaryLabelUndelivered',
    Component: UndeliveredGuitarsComponent,
    bg: 'bg-[#C8E9A0]/70 border-[#C8E9A0]',
    hasData: (g) => g && g.some((item) => !GuitarUtils.isDelivered(item)),
  },
  {
    id: 'inProgress',
    labelKey: 'SummaryLabelInProgress',
    Component: ProjectInProgressComponent,
    bg: 'bg-[#C7C1A6]/70 border-[#C7C1A6]',
    hasData: (g) => g && g.some((item) => GuitarUtils.isInProgress(item)),
  },
];

const Summary: React.FC<SummaryProps> = ({ data: guitars, isMobile }) => {
  const props = { data: guitars, isMobile: !!isMobile };
  const activeCards = React.useMemo(() => {
    return cardsConfig.filter((card) => (card.hasData ? card.hasData(guitars) : true));
  }, [guitars]);

  if (activeCards.length === 0) {
    return null;
  }

  // Desktop view: Responsive grid with colored cards
  const desktopGrid = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeCards.map(({ id, Component, bg }) => (
        <div
          key={id}
          className={`rounded-xl shadow-xs border overflow-hidden backdrop-blur-xs transition-shadow hover:shadow-md ${bg}`}
        >
          <Component {...props} />
        </div>
      ))}
    </div>
  );

  // Mobile view: Collapsible details/summary cards
  const mobileGrid = (
    <div className="space-y-3">
      {activeCards.map(({ id, labelKey, Component, bg }) => (
        <details
          key={id}
          className={`group rounded-xl shadow-xs border overflow-hidden transition-all duration-200 ${bg}`}
        >
          <summary className="flex items-center justify-between px-4 py-3.5 font-bold text-neutral-900 text-sm cursor-pointer list-none select-none">
            <span>{getStringText(labelKey as any) || id}</span>
            <ChevronDown className="w-5 h-5 text-neutral-700 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4 pt-1 border-t border-black/10">
            <Component {...props} />
          </div>
        </details>
      ))}
    </div>
  );

  return <div className="w-full">{isMobile ? mobileGrid : desktopGrid}</div>;
};

export default Summary;
