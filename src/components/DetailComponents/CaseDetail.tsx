import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { getDeliveryTime, isDelivered, isFactoryCase } from '../../data/guitarservice/guitarutils';
import { formatCurrencyStringToString } from '../../infrastructure/datautils';
import { Case } from '../../interfaces/models/case';

type CaseDetailProps = {
  item: Case;
  isMobile?: boolean;
};

const CaseDetail: React.FC<CaseDetailProps> = ({ item: guitarCase, isMobile }) => {
  const caseDetails = [
    guitarCase.caseStyle ? `Case Style: ${guitarCase.caseStyle}` : null,
    guitarCase.purchaseDate ? `Purchased: ${guitarCase.purchaseDate}` : null,
    guitarCase.purchaseStore ? `Purchase Store: ${guitarCase.purchaseStore}` : null,
    guitarCase.deliveryDate
      ? `Delivered: ${
          isDelivered(guitarCase)
            ? `${guitarCase.deliveryDate} (${getDeliveryTime(guitarCase)})`
            : 'not yet delivered'
        }`
      : null,
    guitarCase.purchasePrice
      ? `Purchase Price: ${formatCurrencyStringToString(guitarCase.purchasePrice)}`
      : null,
    isFactoryCase(guitarCase) ? 'Case came with guitar' : null,
  ].filter(Boolean);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Column */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold text-neutral-900">{guitarCase.name}</h4>

          {guitarCase.description && (
            <p className="text-sm text-neutral-600 font-medium">
              {guitarCase.description}
            </p>
          )}

          <div className="space-y-1.5 text-sm text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            {caseDetails.map((text, idx) => (
              <p key={idx} className="font-medium">
                {text}
              </p>
            ))}

            {guitarCase.productUrl && (
              <p className="pt-2 text-xs truncate">
                <span className="font-bold text-neutral-800">Product Link: </span>
                <a
                  target={isMobile ? undefined : '_blank'}
                  rel="noreferrer"
                  href={guitarCase.productUrl}
                  className="text-blue-600 hover:underline"
                >
                  {guitarCase.productUrl}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* JSON Inspector */}
        <div>
          <details className="group bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none font-semibold text-sm text-neutral-800 bg-neutral-100 hover:bg-neutral-200/70 transition-colors">
              <span>Case JSON Data</span>
              <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="p-3 bg-neutral-900 text-neutral-100 overflow-x-auto max-h-96">
              <pre className="text-xs font-mono leading-relaxed">
                {JSON.stringify(guitarCase, undefined, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
