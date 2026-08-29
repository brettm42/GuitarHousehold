import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';
import StringsDetail from './StringsDetail';
import ImageComponent from '../ImageComponent';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';
import { formatCurrencyToString } from '../../infrastructure/datautils';
import { Project } from '../../interfaces/models/project';

type ProjectDetailProps = {
  item: Project;
  isMobile?: boolean;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ item: guitar, isMobile }) => {
  const guitarDetails = [
    guitar.series ? `Series: ${guitar.series}` : null,
    `Project Started: ${guitar.projectStart}`,
    guitar.projectComplete ? `Project Completed: ${guitar.projectComplete}` : null,
    guitar.body
      ? `Body: ${guitar.body}${guitar.purchaseStore ? ` (from ${guitar.purchaseStore})` : ''}`
      : null,
    guitar.bodyStyle ? `Body Style: ${guitar.bodyStyle}` : null,
    GuitarUtils.isLeftHanded(guitar) ? 'Left Handed' : null,
    `Color: ${guitar.color ?? 'Unfinished'}`,
    GuitarUtils.hasPurchasePrice(guitar)
      ? `Project Cost: ${formatCurrencyToString(GuitarUtils.getGuitarCost(guitar))}`
      : null,
    guitar.currentPrice ? `Cost Today: ${guitar.currentPrice}` : null,
    guitar.neck ? `Neck: ${guitar.neck}` : null,
    guitar.serialNumber
      ? `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})`
      : null,
    guitar.manufactureYear ? `Manufacture Year: ${guitar.manufactureYear}` : null,
    guitar.pickguard ? `Pickguard: ${guitar.pickguard}` : null,
    guitar.scale ? `Neck Scale: ${guitar.scale}` : null,
    guitar.numberOfFrets ? `Number of Frets: ${guitar.numberOfFrets}` : null,
    guitar.neckRadius ? `Neck Radius: ${guitar.neckRadius}` : null,
    guitar.nutWidth ? `Nut Width: ${guitar.nutWidth}` : null,
    guitar.neckBoltOn ? 'Bolt-on Neck: Yes' : null,
    `Tuning: ${guitar.tuning ? guitar.tuning : 'Standard'}`,
    guitar.tremolo ? `Tremolo: ${guitar.tremolo}` : null,
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
        {/* Pickups */}
        {GuitarUtils.hasPickups(guitar) && (
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
