import * as React from 'react';
import { ChevronDown, LayoutGrid, List, Layers, Wrench } from 'lucide-react';
import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';
import StringsDetail from './StringsDetail';
import PartDetail from './PartDetail';
import ImageComponent from '../ImageComponent';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';
import { formatCurrencyToString } from '../../infrastructure/datautils';
import { Project } from '../../interfaces/models/project';
import { css } from '../viewutils';

type ProjectDetailProps = {
  item: Project;
  isMobile?: boolean;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ item: guitar, isMobile }) => {
  const partsList = React.useMemo(() => guitar.parts || [], [guitar.parts]);
  const hasParts = partsList.length > 0;

  // Derivations from parts if root properties are omitted
  const bodyPart = React.useMemo(
    () => partsList.find((p) => (p.partType || '').toLowerCase() === 'body'),
    [partsList]
  );
  const neckPart = React.useMemo(
    () => partsList.find((p) => (p.partType || '').toLowerCase() === 'neck'),
    [partsList]
  );
  const pickguardPart = React.useMemo(
    () =>
      partsList.find(
        (p) =>
          (p.name || '').toLowerCase().includes('pickguard') ||
          (p.partType || '').toLowerCase() === 'pickguard'
      ),
    [partsList]
  );

  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [viewMode, setViewMode] = React.useState<'compact' | 'expanded'>('compact');

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    partsList.forEach((p) => {
      if (p.partType) set.add(p.partType);
    });
    return ['All', ...Array.from(set)];
  }, [partsList]);

  const filteredParts = React.useMemo(() => {
    if (selectedCategory === 'All') return partsList;
    return partsList.filter((p) => p.partType === selectedCategory);
  }, [partsList, selectedCategory]);

  const partsTotalCost = React.useMemo(() => {
    return partsList.reduce((sum, p) => {
      const val = p.purchasePrice ? Number.parseFloat(p.purchasePrice) : 0;
      return sum + (Number.isNaN(val) ? 0 : val);
    }, 0);
  }, [partsList]);

  // Derive specs preferring root properties, falling back to composed parts
  const resolvedBody =
    guitar.body ||
    (bodyPart
      ? `${bodyPart.name}${bodyPart.purchaseStore ? ` (from ${bodyPart.purchaseStore})` : ''}`
      : null);
  const resolvedBodyStyle = guitar.bodyStyle || bodyPart?.bodyStyle;
  const resolvedColor = guitar.color ?? bodyPart?.color ?? 'Unfinished';
  const resolvedNeck =
    guitar.neck ||
    (neckPart
      ? `${neckPart.name}${neckPart.purchaseStore ? ` (from ${neckPart.purchaseStore})` : ''}`
      : null);
  const resolvedPickguard = guitar.pickguard || pickguardPart?.name;
  const resolvedScale = guitar.scale || neckPart?.scale;
  const resolvedFrets = guitar.numberOfFrets ?? neckPart?.numberOfFrets;
  const resolvedRadius = guitar.neckRadius || neckPart?.neckRadius;
  const resolvedNutWidth = guitar.nutWidth || neckPart?.nutWidth;
  const resolvedBoltOn =
    guitar.neckBoltOn !== undefined
      ? guitar.neckBoltOn
      : bodyPart?.neckBoltOn !== undefined
      ? bodyPart.neckBoltOn
      : undefined;
  const resolvedTremolo = guitar.tremolo || bodyPart?.tremolo;

  const guitarDetails = [
    guitar.series ? `Series: ${guitar.series}` : null,
    `Project Started: ${guitar.projectStart}`,
    guitar.projectComplete ? `Project Completed: ${guitar.projectComplete}` : null,
    resolvedBody ? `Body: ${resolvedBody}` : null,
    resolvedBodyStyle ? `Body Style: ${resolvedBodyStyle}` : null,
    GuitarUtils.isLeftHanded(guitar) ? 'Left Handed' : null,
    `Color: ${resolvedColor}`,
    GuitarUtils.hasPurchasePrice(guitar)
      ? `Project Cost: ${formatCurrencyToString(GuitarUtils.getGuitarCost(guitar))}`
      : null,
    guitar.currentPrice ? `Cost Today: ${guitar.currentPrice}` : null,
    resolvedNeck ? `Neck: ${resolvedNeck}` : null,
    guitar.serialNumber
      ? `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})`
      : null,
    guitar.manufactureYear ? `Manufacture Year: ${guitar.manufactureYear}` : null,
    resolvedPickguard ? `Pickguard: ${resolvedPickguard}` : null,
    resolvedScale ? `Neck Scale: ${resolvedScale}` : null,
    resolvedFrets ? `Number of Frets: ${resolvedFrets}` : null,
    resolvedRadius ? `Neck Radius: ${resolvedRadius}` : null,
    resolvedNutWidth ? `Nut Width: ${resolvedNutWidth}` : null,
    resolvedBoltOn !== undefined ? (resolvedBoltOn ? 'Bolt-on Neck: Yes' : 'Set-neck') : null,
    `Tuning: ${guitar.tuning ? guitar.tuning : 'Standard'}`,
    resolvedTremolo ? `Tremolo: ${resolvedTremolo}` : null,
    guitar.hasBattery ? 'Has Battery: Yes' : null,
  ].filter(Boolean);

  const images = [guitar.picture, ...(guitar.additionalPictures || [])].filter(
    (i): i is string => Boolean(i)
  );

  return (
    <div className="space-y-8 py-4">
      {/* Top Header & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              {guitar.name}
              {GuitarUtils.isInProgress(guitar) && (
                <span className="ml-3 text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full align-middle">
                  In Progress
                </span>
              )}
            </h1>
            <p className="text-sm font-medium text-neutral-600 mt-1">
              {GuitarUtils.summarizeGuitar(guitar)}
            </p>
          </div>

          {guitar.description && (
            <p className="text-sm text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              {guitar.description}
            </p>
          )}

          {guitar.construction && (
            <div className="p-3 bg-neutral-100 rounded-lg text-xs text-neutral-700 font-medium">
              {GuitarUtils.summarizeConstruction(guitar)}
            </div>
          )}

          {/* Attributes List */}
          <div className="space-y-1.5 text-sm text-neutral-700 bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
            {guitarDetails.map((text, idx) => (
              <p key={idx} className="font-medium">
                {text}
              </p>
            ))}

            {guitar.productUrl && (
              <p className="pt-2 text-xs truncate">
                <span className="font-bold text-neutral-800">Product Link: </span>
                <a
                  target={isMobile ? undefined : '_blank'}
                  rel="noreferrer"
                  href={guitar.productUrl}
                  className="text-blue-600 hover:underline"
                >
                  {guitar.productUrl}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Right Images */}
        <div>
          <ImageComponent imageSet={images} isMobile={isMobile} altText={guitar.name} />
        </div>
      </div>

      {/* Subcomponents & Sections */}
      <div className="space-y-6 pt-4 border-t border-neutral-200">
        {/* Composable Parts Section */}
        {hasParts && (
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Project Parts Composition</h3>
                  <p className="text-xs text-neutral-500">
                    {partsList.length} individual parts totaling{' '}
                    <span className="font-semibold text-neutral-800 font-mono">
                      {formatCurrencyToString(partsTotalCost)}
                    </span>
                  </p>
                </div>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-lg self-start sm:self-auto border border-neutral-200/60">
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={css(
                    'p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors',
                    viewMode === 'compact'
                      ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  )}
                  title="Compact Cards"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Compact</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('expanded')}
                  className={css(
                    'p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors',
                    viewMode === 'expanded'
                      ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  )}
                  title="Expanded Detail"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Expanded</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            {categories.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-neutral-500 font-medium shrink-0 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Filter:
                </span>
                {categories.map((category) => {
                  const count =
                    category === 'All'
                      ? partsList.length
                      : partsList.filter((p) => p.partType === category).length;
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={css(
                        'px-2.5 py-1 rounded-full font-medium transition-all shrink-0 flex items-center gap-1.5',
                        isSelected
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      )}
                    >
                      <span>{category}</span>
                      <span
                        className={css(
                          'text-2xs px-1.5 py-0.2 rounded-full',
                          isSelected
                            ? 'bg-neutral-800 text-neutral-200'
                            : 'bg-neutral-200 text-neutral-700'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Parts Grid */}
            <div
              className={css(
                'grid gap-4',
                viewMode === 'compact'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              )}
            >
              {filteredParts.map((part) => (
                <PartDetail
                  key={part.id}
                  item={part}
                  isMobile={isMobile}
                  compact={viewMode === 'compact'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Legacy Pickups Section (rendered if root pickups present and not already replaced by parts) */}
        {Boolean(guitar.pickups && guitar.pickups.length > 0) && (
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Pickups
            </h3>
            <div className="space-y-4">
              {guitar.pickups!.map((pickup) => (
                <div key={pickup.id} className="pt-2 first:pt-0">
                  <PickupDetail item={pickup} isMobile={isMobile} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strings */}
        {GuitarUtils.hasStrings(guitar) && guitar.strings && (
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Strings
            </h3>
            <StringsDetail item={guitar.strings} parent={guitar} isMobile={isMobile} />
          </div>
        )}

        {/* Case */}
        {GuitarUtils.hasCase(guitar) && guitar.case && (
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Case
            </h3>
            <CaseDetail item={guitar.case} isMobile={isMobile} />
          </div>
        )}

        {/* Additional Components, Modifications, Repairs, Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GuitarUtils.hasComponents(guitar) && (
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <h4 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-1.5">
                Additional Components
              </h4>
              <ul className="space-y-1 text-xs text-neutral-700">
                {guitar.components!.map((i, idx) => {
                  const parts = i.split(';');
                  return (
                    <li key={idx} className="flex justify-between">
                      <span>{parts[0]}</span>
                      {parts[1] && <span className="font-medium font-mono">${parts[1].trim()}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {GuitarUtils.hasModifications(guitar) && (
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <h4 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-1.5">
                Modifications
              </h4>
              <ul className="space-y-1 text-xs text-neutral-700 list-disc list-inside">
                {guitar.modifications!.map((mod, idx) => (
                  <li key={idx}>{mod}</li>
                ))}
              </ul>
            </div>
          )}

          {GuitarUtils.hasRepairs(guitar) && (
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <h4 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-1.5">
                Repairs
              </h4>
              <ul className="space-y-1 text-xs text-neutral-700 list-disc list-inside">
                {guitar.repairs!.map((repair, idx) => (
                  <li key={idx}>{repair}</li>
                ))}
              </ul>
            </div>
          )}

          {GuitarUtils.hasControls(guitar) && (
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2">
              <h4 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-1.5">
                Controls
              </h4>
              <ul className="space-y-1 text-xs text-neutral-700 list-disc list-inside">
                {guitar.controls!.map((control, idx) => (
                  <li key={idx}>{control}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Raw JSON Data Accordion */}
        <div>
          <details className="group bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer list-none font-semibold text-sm text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 transition-colors">
              <span>{`${GuitarUtils.isInstrument(guitar) ? 'Instrument' : 'Guitar'} JSON Data`}</span>
              <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="p-4 bg-neutral-900 text-neutral-100 overflow-x-auto">
              <pre className="text-xs font-mono leading-relaxed">
                {JSON.stringify(guitar, undefined, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
