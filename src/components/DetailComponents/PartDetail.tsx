import * as React from 'react';
import { ChevronDown, ExternalLink, Camera, Wrench } from 'lucide-react';
import { formatCurrencyStringToString } from '../../infrastructure/datautils';
import { resolveImageArray } from '../../infrastructure/imageutils';
import { Part } from '../../interfaces/models/part';

export type PartDetailProps = {
  item: Part;
  isMobile?: boolean;
  compact?: boolean;
};

export const getPartBadgeStyle = (partType: string): string => {
  switch (partType.toLowerCase()) {
    case 'neck':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'body':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'pickup':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'case':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'hardware':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'electronics':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'strings':
      return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

const PartDetail: React.FC<PartDetailProps> = ({ item: part, isMobile, compact = false }) => {
  const badgeStyle = getPartBadgeStyle(part.partType || 'Component');

  const allPictures = React.useMemo(() => {
    const list: string[] = [];
    if (part.picture) list.push(part.picture);
    if (part.pictures) list.push(...part.pictures);
    if (part.additionalPictures) list.push(...part.additionalPictures);
    return resolveImageArray(list, '/images/parts');
  }, [part.picture, part.pictures, part.additionalPictures]);

  const partDetails = [
    part.brand ? `Brand: ${part.brand}` : null,
    part.model ? `Model: ${part.model}` : null,
    // Body specific
    part.bodyStyle ? `Body Style: ${part.bodyStyle}` : null,
    part.color ? `Color: ${part.color}` : null,
    part.tremolo ? `Tremolo: ${part.tremolo}` : null,
    part.neckBoltOn !== undefined ? (part.neckBoltOn ? 'Bolt-on Neck' : 'Set-neck') : null,
    part.bodyMaterial ? `Body Material: ${part.bodyMaterial}` : null,
    part.topMaterial ? `Top Material: ${part.topMaterial}` : null,
    // Neck specific
    part.scale ? `Scale: ${part.scale}` : null,
    part.nutWidth ? `Nut Width: ${part.nutWidth}` : null,
    part.neckRadius ? `Radius: ${part.neckRadius}` : null,
    part.numberOfFrets ? `Frets: ${part.numberOfFrets}` : null,
    part.neckMaterial ? `Neck Wood: ${part.neckMaterial}` : null,
    part.fingerboardMaterial ? `Fingerboard: ${part.fingerboardMaterial}` : null,
    // Pickup specific
    part.position ? `Position: ${part.position}` : null,
    part.type ? `Type: ${part.type}` : null,
    part.size ? `Size: ${part.size}` : null,
    part.output ? `Output: ${part.output}` : null,
    part.magnetType ? `Magnet: ${part.magnetType}` : null,
    part.cover ? `Cover: ${part.cover}` : null,
    part.mount ? `Mount: ${part.mount}` : null,
    // Case specific
    part.caseStyle ? `Case Style: ${part.caseStyle}` : null,
    // Strings specific
    part.gauge ? `Gauge: ${part.gauge}` : null,
    part.numberOfStrings ? `Strings: ${part.numberOfStrings}` : null,
    part.lastChangeDate ? `Last Changed: ${part.lastChangeDate}` : null,
    // General
    part.material ? `Material: ${part.material}` : null,
    part.serialNumber
      ? `s/n: ${part.serialNumber}${part.serialNumberLocation ? ` (${part.serialNumberLocation})` : ''}`
      : null,
    part.purchaseStore ? `Purchased from: ${part.purchaseStore}` : null,
    part.purchaseDate ? `Purchased: ${part.purchaseDate}` : null,
    part.deliveryDate ? `Delivered: ${part.deliveryDate}` : null,
    part.currentPrice ? `Market Value: ${part.currentPrice}` : null,
  ].filter(Boolean);

  if (compact) {
    return (
      <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {allPictures.length > 0 && (
              <a
                href={allPictures[0]}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0 block group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={allPictures[0]}
                  alt={part.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </a>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-md font-semibold border ${badgeStyle}`}>
                  {part.partType}
                </span>
                <h5 className="font-bold text-neutral-900 text-sm">{part.name}</h5>
              </div>
              {part.description && (
                <p className="text-xs text-neutral-600 line-clamp-2">{part.description}</p>
              )}
            </div>
          </div>
          {part.purchasePrice && (
            <span className="font-mono font-bold text-sm text-neutral-900 bg-neutral-100 px-2 py-1 rounded-md shrink-0">
              {formatCurrencyStringToString(part.purchasePrice)}
            </span>
          )}
        </div>

        {partDetails.length > 0 && (
          <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap gap-2 text-xs text-neutral-600">
            {partDetails.map((text, idx) => (
              <span key={idx} className="bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200/60">
                {text}
              </span>
            ))}
          </div>
        )}

        {part.modifications && part.modifications.length > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-neutral-100 flex items-center gap-1.5 flex-wrap text-xs text-amber-900">
            <Wrench className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="font-semibold text-2xs uppercase tracking-wide text-neutral-500">Mods:</span>
            {part.modifications.map((mod, idx) => (
              <span key={idx} className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded-md text-2xs">
                {mod}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between text-xs pt-1">
          {allPictures.length > 1 ? (
            <span className="text-neutral-500 flex items-center gap-1 text-2xs">
              <Camera className="w-3 h-3" /> {allPictures.length} photos
            </span>
          ) : <span />}

          {part.productUrl && (
            <a
              target={isMobile ? undefined : '_blank'}
              rel="noreferrer"
              href={part.productUrl}
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline ml-auto"
            >
              <span>Product Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${badgeStyle}`}>
              {part.partType}
            </span>
            <h4 className="text-lg font-bold text-neutral-900">{part.name}</h4>
          </div>
          {part.description && (
            <p className="text-xs sm:text-sm text-neutral-600">{part.description}</p>
          )}
        </div>

        {part.purchasePrice && (
          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs text-neutral-500 block">Purchase Price</span>
            <span className="font-mono font-bold text-base text-neutral-900">
              {formatCurrencyStringToString(part.purchasePrice)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
        {partDetails.map((text, idx) => (
          <p key={idx} className="font-medium">
            {text}
          </p>
        ))}

        {part.productUrl && (
          <p className="col-span-full pt-1 text-xs truncate">
            <span className="font-bold text-neutral-800">Product Link: </span>
            <a
              target={isMobile ? undefined : '_blank'}
              rel="noreferrer"
              href={part.productUrl}
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              <span>{part.productUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </p>
        )}
      </div>

      {part.modifications && part.modifications.length > 0 && (
        <div className="space-y-2 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Wrench className="w-3.5 h-3.5 text-amber-700" />
            <span>Component Modifications</span>
          </div>
          <ul className="list-disc list-inside text-xs text-amber-950 space-y-1">
            {part.modifications.map((mod, idx) => (
              <li key={idx}>{mod}</li>
            ))}
          </ul>
        </div>
      )}

      {allPictures.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
            <Camera className="w-3.5 h-3.5 text-neutral-600" />
            <span>Component Photos ({allPictures.length})</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {allPictures.map((picUrl, idx) => (
              <a
                key={idx}
                href={picUrl}
                target="_blank"
                rel="noreferrer"
                className="relative block w-20 h-20 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-2xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={picUrl}
                  alt={`${part.name} photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible raw JSON */}
      <details className="group rounded-lg border border-neutral-200 overflow-hidden">
        <summary className="flex items-center justify-between px-3 py-2 cursor-pointer list-none text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200/70 transition-colors">
          <span>{`${part.name} JSON Data`}</span>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="p-3 bg-neutral-900 text-neutral-100 overflow-x-auto">
          <pre className="text-2xs font-mono leading-relaxed">
            {JSON.stringify(part, undefined, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};

export default PartDetail;

