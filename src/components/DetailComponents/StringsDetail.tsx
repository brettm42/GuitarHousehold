import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { getDeliveryTime, getStringAge, isDelivered } from '../../data/guitarservice/guitarutils';
import { formatCurrencyStringToString } from '../../infrastructure/datautils';
import { Guitar } from '../../interfaces/models/guitar';
import { Strings } from '../../interfaces/models/strings';

type StringsDetailProps = {
  item: Strings;
  parent: Guitar;
  isMobile?: boolean;
};

const StringsDetail: React.FC<StringsDetailProps> = ({
  item: strings,
  parent: guitar,
  isMobile,
}) => {
  const stringsDetail = [
    strings.gauge ? `Gauge: ${strings.gauge}` : null,
    strings.material ? `Material: ${strings.material}` : null,
    strings.numberOfStrings ? `Number of Strings: ${strings.numberOfStrings}` : null,
    strings && isDelivered(guitar) ? `String Age: ${getStringAge(guitar)}` : null,
    strings.lastChangeDate ? `Last Time Changed: ${strings.lastChangeDate}` : null,
    strings.purchaseDate ? `Purchased: ${strings.purchaseDate}` : null,
    strings.purchaseStore ? `Purchase Store: ${strings.purchaseStore}` : null,
    strings.deliveryDate
      ? `Delivered: ${
          isDelivered(strings)
            ? `${strings.deliveryDate} (${getDeliveryTime(strings)})`
            : 'not yet delivered'
        }`
      : null,
    strings.purchasePrice
      ? `Purchase Price: ${formatCurrencyStringToString(strings.purchasePrice)}`
      : null,
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Column */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold text-neutral-900">{strings.name}</h4>

          {strings.description && (
            <p className="text-sm text-neutral-600 font-medium">{strings.description}</p>
          )}

          <div className="space-y-1.5 text-sm text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            {stringsDetail.map((text, idx) => (
              <p key={idx} className="font-medium">
                {text}
              </p>
            ))}

            {strings.productUrl && (
              <p className="pt-2 text-xs truncate">
                <span className="font-bold text-neutral-800">Product Link: </span>
                <a
                  target={isMobile ? undefined : '_blank'}
                  rel="noreferrer"
                  href={strings.productUrl}
                  className="text-blue-600 hover:underline"
                >
                  {strings.productUrl}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* JSON Inspector */}
        <div>
          <details className="group bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none font-semibold text-sm text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 transition-colors">
              <span>Strings JSON Data</span>
              <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="p-3 bg-neutral-900 text-neutral-100 overflow-x-auto max-h-96">
              <pre className="text-xs font-mono leading-relaxed">
                {JSON.stringify(strings, undefined, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default StringsDetail;
