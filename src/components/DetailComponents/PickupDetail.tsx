import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  getDeliveryTime,
  isDelivered,
  isFactoryPickup,
} from '../../data/guitarservice/guitarutils';
import { formatCurrencyStringToString } from '../../infrastructure/datautils';
import { Pickup } from '../../interfaces/models/pickup';

type PickupDetailProps = {
  item: Pickup;
  isMobile?: boolean;
};

const PickupDetail: React.FC<PickupDetailProps> = ({ item: pickup, isMobile }) => {
  const pickupDetails = [
    isFactoryPickup(pickup) ? 'Factory Pickup' : null,
    pickup.position ? `Position: ${pickup.position}` : null,
    `Type: ${pickup.type}${pickup.size ? ` (${pickup.size} size)` : ''}`,
    pickup.mount ? `Mount: ${pickup.mount}` : null,
    pickup.output ? `Output: ${pickup.output}` : null,
    pickup.magnetType ? `Magnet Type: ${pickup.magnetType}` : null,
    pickup.cover ? `Cover: ${pickup.cover}` : null,
    pickup.purchaseDate ? `Purchased: ${pickup.purchaseDate}` : null,
    pickup.purchasePrice
      ? `Purchase Price: ${formatCurrencyStringToString(pickup.purchasePrice)}`
      : null,
    pickup.purchaseStore ? `Purchase Store: ${pickup.purchaseStore}` : null,
    pickup.deliveryDate
      ? `Delivered: ${
          isDelivered(pickup)
            ? `${pickup.deliveryDate} (${getDeliveryTime(pickup)})`
            : 'not yet delivered'
        }`
      : null,
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Column */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold text-neutral-900">{pickup.name}</h4>

          {pickup.description && (
            <p className="text-sm text-neutral-600 font-medium">{pickup.description}</p>
          )}

          <div className="space-y-1.5 text-sm text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            {pickupDetails.map((text, idx) => (
              <p key={idx} className="font-medium">
                {text}
              </p>
            ))}

            {pickup.productUrl && (
              <p className="pt-2 text-xs truncate">
                <span className="font-bold text-neutral-800">Product Link: </span>
                <a
                  target={isMobile ? undefined : '_blank'}
                  rel="noreferrer"
                  href={pickup.productUrl}
                  className="text-blue-600 hover:underline"
                >
                  {pickup.productUrl}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* JSON Inspector */}
        <div>
          <details className="group bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none font-semibold text-sm text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 transition-colors">
              <span>Pickup JSON Data</span>
              <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="p-3 bg-neutral-900 text-neutral-100 overflow-x-auto max-h-96">
              <pre className="text-xs font-mono leading-relaxed">
                {JSON.stringify(pickup, undefined, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default PickupDetail;
