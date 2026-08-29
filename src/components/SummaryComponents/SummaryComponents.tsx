import * as React from 'react';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';
import Image from 'next/image';
import Link from 'next/link';
import DataList from '../../components/ListComponents/DataList';
import { Guitar } from '../../interfaces/models/guitar';
import { getStringText } from '../../data/stringservice/stringservice';

type SummaryComponentProps = {
  title: string;
  contents: [string, string | ReadonlyArray<string>][];
  className?: string;
};

type SummaryComponentsProps = {
  data: Guitar[];
  isMobile?: boolean;
};

const dividerPlaceholder: [string, string | readonly string[]] = ['*', '*'];

function gridLineFormatter(
  line: [string, string | ReadonlyArray<string>],
  idx: number
): React.ReactNode {
  if (line[0] === '') {
    return <div key={idx} className="hidden" />;
  }

  if (line === dividerPlaceholder || line[0].startsWith('*')) {
    return (
      <div key={idx} className="col-span-full my-2 border-t border-black/10" />
    );
  }

  return (
    <div key={idx} className="flex flex-col py-1 text-sm">
      <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
        {line[0]}
      </span>
      {Array.isArray(line[1]) ? (
        <div className="pl-2 mt-0.5 space-y-0.5">
          {line[1].map((item, i) => (
            <span key={i} className="block text-neutral-900 font-medium text-xs">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-neutral-900 font-medium">
          {line[1] || '—'}
        </span>
      )}
    </div>
  );
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  title,
  contents,
  className = '',
}) => {
  if (!title && !contents) {
    return null;
  }

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      {title && (
        <h3 className="font-bold text-neutral-900 text-base mb-3 pb-1 border-b border-black/10">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
        {contents.map((line, idx) => gridLineFormatter(line, idx))}
      </div>
    </div>
  );
};

const MostCommonComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Most Common..."
      contents={[
        [getStringText('SummaryComponentMostCommonMake'), GuitarUtils.mostCommonMake(guitars)],
        [getStringText('SummaryComponentMostCommonBody'), GuitarUtils.mostCommonBody(guitars)],
        [getStringText('SummaryComponentMostCommonColor'), GuitarUtils.mostCommonColor(guitars)],
        [getStringText('SummaryComponentMostCommonPickup'), GuitarUtils.mostCommonPickupType(guitars)],
        [getStringText('SummaryComponentMostCommonNumOfPickups'), GuitarUtils.mostCommonPickupNumber(guitars)],
        [getStringText('SummaryComponentMostCommonTuning'), GuitarUtils.mostCommonTuning(guitars)],
        [getStringText('SummaryComponentMostCommonScale'), GuitarUtils.mostCommonScale(guitars)],
        [getStringText('SummaryComponentMostCommonNutWidth'), GuitarUtils.mostCommonNutWidth(guitars)],
        [getStringText('SummaryComponentMostCommonRadius'), GuitarUtils.mostCommonNeckRadius(guitars)],
        [getStringText('SummaryComponentMostCommonFrets'), GuitarUtils.mostCommonFretCount(guitars)],
        [getStringText('SummaryComponentMostCommonControls'), GuitarUtils.mostCommonControlCount(guitars)],
        [getStringText('SummaryComponentMostCommonTremolo'), GuitarUtils.mostCommonTremoloType(guitars)],
        [getStringText('SummaryComponentMostCommonYear'), GuitarUtils.mostCommonManufactureYear(guitars)],
        [getStringText('SummaryComponentMostCommonCase'), GuitarUtils.mostCommonCaseStyle(guitars)],
        [getStringText('SummaryComponentMostCommonStore'), GuitarUtils.mostCommonStore(guitars)],
        [getStringText('SummaryComponentMostCommonAge'), GuitarUtils.mostCommonAge(guitars)],
      ]}
    />
  );
};

const MissingCasesComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  const data = guitars.filter((g) => !GuitarUtils.hasCase(g) && GuitarUtils.isDelivered(g));
  if (!data || data.length < 1) {
    return null;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="font-bold text-neutral-900 text-base mb-3 pb-1 border-b border-black/10">
        Guitars Missing Cases:
      </h3>
      <DataList items={data} />
    </div>
  );
};

const ProjectInProgressComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  const data = guitars.filter((g) => GuitarUtils.isInProgress(g));
  if (!data || data.length < 1) {
    return null;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="font-bold text-neutral-900 text-base mb-3 pb-1 border-b border-black/10">
        In Progress Projects:
      </h3>
      <DataList items={data} />
    </div>
  );
};

const UndeliveredGuitarsComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  const data = guitars.filter((g) => !GuitarUtils.isDelivered(g));
  if (!data || data.length < 1) {
    return null;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="font-bold text-neutral-900 text-base mb-3 pb-1 border-b border-black/10">
        Undelivered:
      </h3>
      <DataList items={data} />
    </div>
  );
};

const OutliersComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Outliers:"
      contents={[
        ['Oldest', GuitarUtils.oldestGuitarPurchase(guitars)],
        ['Newest', GuitarUtils.newestGuitarPurchase(guitars)],
        ['Most Pickups', GuitarUtils.mostPickups(guitars)],
        ['Most Modifications', GuitarUtils.mostModifications(guitars)],
        ['Most Repairs', GuitarUtils.mostRepairs(guitars)],
        ['Most Controls', GuitarUtils.mostControls(guitars)],
        ['Most Frets', GuitarUtils.mostFrets(guitars)],
        ['Least Frets', GuitarUtils.leastFrets(guitars)],
        dividerPlaceholder,
        ['Longest Project', GuitarUtils.longestProject(guitars)],
        ['Shortest Project', GuitarUtils.shortestProject(guitars)],
        dividerPlaceholder,
        ['Longest Delivery', GuitarUtils.longestDelivery(guitars)],
      ]}
    />
  );
};

const ValuesComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Values:"
      contents={[
        ['Cheapest', GuitarUtils.leastExpensiveGuitar(guitars)],
        ['with case', GuitarUtils.leastExpensiveGuitarWithCase(guitars)],
        ['Most Expensive', GuitarUtils.mostExpensiveGuitar(guitars)],
        ['with case', GuitarUtils.mostExpensiveGuitarWithCase(guitars)],
        ['Average Cost', `${GuitarUtils.averageGuitarCost(guitars)} (avg w/ case ${GuitarUtils.averageGuitarCostWithCase(guitars)})`],
        dividerPlaceholder,
        ['Least Expensive Instrument', GuitarUtils.leastExpensiveInstrument(guitars)],
        ['Most Expensive Instrument', GuitarUtils.mostExpensiveInstrument(guitars)],
        ['Average Instrument Cost', GuitarUtils.averageInstrumentCost(guitars)],
        dividerPlaceholder,
        ['Least Expensive Project', GuitarUtils.leastExpensiveProject(guitars)],
        ['Most Expensive Project', GuitarUtils.mostExpensiveProject(guitars)],
        ['Average Project Cost', GuitarUtils.averageProjectCost(guitars)],
        dividerPlaceholder,
        ['Household Total', `${GuitarUtils.getHouseholdCost(guitars)} (w/ cases ${GuitarUtils.getHouseholdCostWithCases(guitars)})`],
      ]}
    />
  );
};

const PartValuesComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Case/Pickup Values:"
      contents={[
        ['Most Expensive Case', GuitarUtils.mostExpensiveCase(guitars)],
        ['Cheapest Case', GuitarUtils.leastExpensiveCase(guitars)],
        ['Average Case Cost', GuitarUtils.averageCaseCost(guitars)],
        dividerPlaceholder,
        ['Most Expensive Pickup', GuitarUtils.mostExpensivePickup(guitars)],
        ['Cheapest Pickup', GuitarUtils.leastExpensivePickup(guitars)],
        ['Average Pickup Cost', GuitarUtils.averagePickupCost(guitars)],
      ]}
    />
  );
};

const PickupsComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Pickups:"
      contents={[
        ['Most Common Size', GuitarUtils.mostCommonPickupSize(guitars)],
        ['Most Common Type', GuitarUtils.mostCommonPickupType(guitars)],
        ['Most Common Mount', GuitarUtils.mostCommonPickupMount(guitars)],
        ['Most Common Magnet Type', GuitarUtils.mostCommonPickupMagnetType(guitars)],
        ['Most Common Cover', GuitarUtils.mostCommonPickupCover(guitars)],
        ['Highest Output', GuitarUtils.highestPickup(guitars)],
        ['Lowest Output', GuitarUtils.lowestPickup(guitars)],
        ['Average Output', GuitarUtils.averagePickup(guitars)],
      ]}
    />
  );
};

const StringsComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Strings:"
      contents={[
        ['On Most Guitars', GuitarUtils.mostCommonStrings(guitars)],
        ['Most Common Gauge', GuitarUtils.mostCommonStringGauge(guitars)],
        ['Average String Age', GuitarUtils.averageStringAge(guitars)],
        ['Oldest Strings', GuitarUtils.oldestStrings(guitars)],
        ['Newest Strings', GuitarUtils.newestStrings(guitars)],
      ]}
    />
  );
};

const RandomPickComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  const guitar = React.useMemo(() => GuitarUtils.randomPick(guitars), [guitars]);

  if (!guitar) {
    return null;
  }

  return (
    <div className="p-4 h-full flex flex-col items-center text-center">
      <h3 className="font-bold text-neutral-900 text-base mb-3 pb-1 border-b border-black/10 w-full">
        Pick of the Day!
      </h3>
      <Link
        href={`/detail/${guitar.id}`}
        className="group flex flex-col items-center max-w-xs"
      >
        <div className="relative w-48 h-60 bg-white/60 rounded-lg overflow-hidden shadow-md flex items-center justify-center p-2 mb-3 border border-black/5 group-hover:shadow-lg transition-shadow">
          {guitar.picture ? (
            <Image
              src={guitar.picture}
              alt={guitar.name}
              fill
              sizes="192px"
              className="object-contain p-2 group-hover:scale-105 transition-transform"
            />
          ) : (
            <span className="text-4xl">🎸</span>
          )}
        </div>
        <div className="text-center">
          <h4 className="font-semibold text-sm text-neutral-900 group-hover:underline">
            {guitar.name}
          </h4>
          <p className="text-xs text-neutral-700 mt-0.5">
            {GuitarUtils.summarizeGuitar(guitar)}
          </p>
        </div>
      </Link>
    </div>
  );
};

const BreakdownComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Breakdown:"
      contents={[
        ['Acoustic vs. Electric', GuitarUtils.acousticVsElectric(guitars)],
        ['Factory vs. Project', GuitarUtils.factoryVsProject(guitars)],
        ['Sunburst vs. Other Color', GuitarUtils.sunburstVsColor(guitars)],
        ['6 String vs. 12 String', GuitarUtils.sixStringVs12string(guitars)],
        ['Jazzmaster vs. Other Style', GuitarUtils.styleVsOtherStyle('Jazzmaster', guitars)],
        ['Hollowbody vs. Other Style', GuitarUtils.styleVsOtherStyle('Hollowbody', guitars)],
        ['Tremolo vs. Fixed', GuitarUtils.tremoloVsFixed(guitars)],
        ['Humbucker vs. Single Coil', GuitarUtils.humbuckerVsSingleCoil(guitars)],
        ['Swapped vs. Stock Pickups', GuitarUtils.swappedVsFactoryPickups(guitars)],
        ['Flat vs. Arched Case', GuitarUtils.flatVsArchedCase(guitars)],
        ['Has Battery vs. Not', GuitarUtils.hasBatteryVsNot(guitars)],
        ['Bolt-On vs. Set Neck', GuitarUtils.boltOnVsSetNeck(guitars)],
      ]}
    />
  );
};

const TimelineComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  const notYetDelivered = GuitarUtils.notYetDelivered(guitars);

  return (
    <SummaryComponent
      title="Timeline:"
      contents={[
        ['Average per Year', `${GuitarUtils.averageGuitarPerYear(guitars)} guitars`],
        ['Most Guitars Acquired', GuitarUtils.mostGuitarsInAYear(guitars)],
        ['Most Cases Acquired', GuitarUtils.mostCasesInAYear(guitars)],
        ['Guitars This Year', GuitarUtils.guitarsThisYear(guitars)],
        ['Guitars per Year', GuitarUtils.guitarsPerYear(guitars)],
        ['Most Projects Finished', GuitarUtils.mostProjectsInAYear(guitars)],
        dividerPlaceholder,
        notYetDelivered > 0
          ? ['Not Yet Delivered', `${notYetDelivered} instruments`]
          : ['', ''],
        ['Average Delivery Time', GuitarUtils.averageDeliveryTime(guitars)],
        dividerPlaceholder,
        ['Oldest Guitar', GuitarUtils.oldestGuitar(guitars)],
        ['Youngest Guitar', GuitarUtils.newestGuitar(guitars)],
      ]}
    />
  );
};

const ConstructionComponent: React.FC<SummaryComponentsProps> = ({ data: guitars }) => {
  return (
    <SummaryComponent
      title="Construction:"
      contents={[
        ['Most Common Material', GuitarUtils.mostCommonMaterial(guitars)],
        ['Most Common Top', GuitarUtils.mostCommonMaterialTop(guitars)],
        ['Most Common Back', GuitarUtils.mostCommonMaterialBack(guitars)],
        ['Most Common Neck', GuitarUtils.mostCommonMaterialNeck(guitars)],
        ['Most Common Sides', GuitarUtils.mostCommonMaterialSides(guitars)],
        ['Most Common Fingerboard', GuitarUtils.mostCommonMaterialFingerboard(guitars)],
        dividerPlaceholder,
        ['with Veneer Tops', `${GuitarUtils.madeWithVeneerTop(guitars)} instruments`],
        ['with Veneer Backs', `${GuitarUtils.madeWithVeneerBack(guitars)} instruments`],
      ]}
    />
  );
};

export {
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
};
