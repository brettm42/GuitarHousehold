import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import CaseDetail from './CaseDetail';
import PickupDetail from './PickupDetail';
import ReverbDetail from './ReverbDetail';
import StringsDetail from './StringsDetail';
import ImageComponent from '../ImageComponent';
import * as GuitarUtils from '../../data/guitarservice/guitarutils';
import { formatCurrencyStringToString } from '../../infrastructure/datautils';
import { Guitar } from '../../interfaces/models/guitar';

type GuitarDetailProps = {
  item: Guitar;
  isMobile?: boolean;
};

const GuitarDetail: React.FC<GuitarDetailProps> = ({ item: guitar, isMobile }) => {
  const guitarDetails = [
    guitar.make ? `Make: ${guitar.make}` : null,
    guitar.model ? `Model: ${guitar.model}` : null,
    guitar.series ? `Series: ${guitar.series}` : null,
    guitar.bodyStyle ? `Body Style: ${guitar.bodyStyle}` : null,
    GuitarUtils.isLeftHanded(guitar) ? 'Left Handed' : null,
    `Color: ${guitar.color ?? 'Unfinished'}`,
    guitar.serialNumber
      ? `s/n: ${guitar.serialNumber} (location: ${guitar.serialNumberLocation})`
      : null,
    guitar.manufactureYear ? `Manufacture Year: ${guitar.manufactureYear}` : null,
    guitar.purchaseDate
      ? `Purchased: ${guitar.purchaseDate} from ${guitar.purchaseStore}`
      : null,
    guitar.deliveryDate != null
      ? `Delivered: ${
          GuitarUtils.isDelivered(guitar)
            ? `${guitar.deliveryDate} (${GuitarUtils.getDeliveryTime(guitar)})`
            : 'not yet delivered'
        }`
      : null,
    GuitarUtils.hasPurchasePrice(guitar)
      ? `Purchase Price: ${formatCurrencyStringToString(guitar.purchasePrice)}`
      : null,
    guitar.currentPrice ? `Cost Today: ${guitar.currentPrice}` : null,
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

        {/* Modifications, Repairs, Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Reverb Price Data */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <ReverbDetail
            keywords={guitar.name}
            purchasePrice={guitar.purchasePrice}
            isMobile={isMobile}
          />
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

export default GuitarDetail;
