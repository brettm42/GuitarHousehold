import * as React from 'react';
import { Guitar } from '../../interfaces/models/guitar';
import { Project } from '../../interfaces/models/project';
import { GuitarResolver, ConstructionSummary } from '../../domain/resolvers';

export type ConstructionDetailProps = {
  guitar?: Guitar | Project;
  summary?: ConstructionSummary;
  className?: string;
};

export const ConstructionDetail: React.FC<ConstructionDetailProps> = ({
  guitar,
  summary: explicitSummary,
  className = '',
}) => {
  const summary = React.useMemo(() => {
    if (explicitSummary) return explicitSummary;
    if (guitar) return GuitarResolver.constructionSummary(guitar);
    return undefined;
  }, [guitar, explicitSummary]);

  if (!summary || !summary.fullText) {
    return null;
  }

  const hasSpecifics = Boolean(summary.body || summary.neck || summary.finish);

  return (
    <div className={`p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2 ${className}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
        Construction & Tonewoods
      </div>

      {hasSpecifics ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {summary.body && (
            <div className="bg-white p-2.5 rounded-lg border border-neutral-100 flex items-start gap-2 shadow-2xs">
              <span className="font-semibold text-neutral-800 shrink-0">Body:</span>
              <span className="text-neutral-600">{summary.body}</span>
            </div>
          )}
          {summary.neck && (
            <div className="bg-white p-2.5 rounded-lg border border-neutral-100 flex items-start gap-2 shadow-2xs">
              <span className="font-semibold text-neutral-800 shrink-0">Neck:</span>
              <span className="text-neutral-600">{summary.neck}</span>
            </div>
          )}
          {summary.finish && (
            <div className="bg-white p-2.5 rounded-lg border border-neutral-100 flex items-start gap-2 shadow-2xs sm:col-span-2">
              <span className="font-semibold text-neutral-800 shrink-0">Finish:</span>
              <span className="text-neutral-600">{summary.finish}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-neutral-700 font-medium">
          {summary.fullText}
        </p>
      )}
    </div>
  );
};

export default ConstructionDetail;

