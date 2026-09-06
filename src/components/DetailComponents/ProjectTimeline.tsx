import * as React from 'react';
import {
  Calendar,
  Clock,
  Flag,
  CheckCircle2,
  ShoppingCart,
  Truck,
  Music,
  Tag,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import { Project } from '../../interfaces/models/project';
import { formatCurrencyStringToString, millisecondsToFriendlyString } from '../../infrastructure/datautils';
import { getPartBadgeStyle } from './PartDetail';

export type ProjectTimelineProps = {
  project: Project;
  isMobile?: boolean;
};

interface TimelineEvent {
  id: string;
  dateStr: string;
  timestamp: number;
  title: string;
  subtitle?: string;
  category: 'project' | 'part' | 'case' | 'strings';
  eventType: 'start' | 'complete' | 'purchase' | 'delivery' | 'sold' | 'change';
  badge?: string;
  price?: string;
}

const eventOrder: Record<string, number> = {
  start: 0,
  purchase: 1,
  delivery: 2,
  change: 3,
  complete: 4,
  sold: 5,
};

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Collect all chronological milestone dates across project and parts
  const events = React.useMemo(() => {
    const list: TimelineEvent[] = [];

    // 1. Project Start
    if (project.projectStart) {
      const ts = Date.parse(project.projectStart);
      if (!Number.isNaN(ts)) {
        list.push({
          id: 'project-start',
          dateStr: project.projectStart,
          timestamp: ts,
          title: 'Project Initiated',
          subtitle: `Began build for ${project.name}`,
          category: 'project',
          eventType: 'start',
          badge: 'Start',
        });
      }
    }

    // 2. Project Completion
    if (project.projectComplete) {
      const ts = Date.parse(project.projectComplete);
      if (!Number.isNaN(ts)) {
        list.push({
          id: 'project-complete',
          dateStr: project.projectComplete,
          timestamp: ts,
          title: 'Project Completed',
          subtitle: 'Final assembly and setup complete',
          category: 'project',
          eventType: 'complete',
          badge: 'Completed',
        });
      }
    }

    // 3. Project-level purchase / acquisition
    if (project.purchaseDate) {
      const ts = Date.parse(project.purchaseDate);
      if (!Number.isNaN(ts)) {
        list.push({
          id: 'project-purchase',
          dateStr: project.purchaseDate,
          timestamp: ts,
          title: 'Project Base Acquired',
          subtitle: project.purchaseStore ? `Purchased from ${project.purchaseStore}` : undefined,
          price: project.purchasePrice ? formatCurrencyStringToString(project.purchasePrice) : undefined,
          category: 'project',
          eventType: 'purchase',
          badge: 'Project Base',
        });
      }
    }

    // 4. Project-level delivery
    if (project.deliveryDate) {
      const ts = Date.parse(project.deliveryDate);
      if (!Number.isNaN(ts)) {
        list.push({
          id: 'project-delivery',
          dateStr: project.deliveryDate,
          timestamp: ts,
          title: 'Project Base Delivered',
          category: 'project',
          eventType: 'delivery',
          badge: 'Delivery',
        });
      }
    }

    // 5. Project-level sold date
    if (project.soldDate) {
      const ts = Date.parse(project.soldDate);
      if (!Number.isNaN(ts)) {
        list.push({
          id: 'project-sold',
          dateStr: project.soldDate,
          timestamp: ts,
          title: 'Project Sold',
          category: 'project',
          eventType: 'sold',
          badge: 'Sold',
        });
      }
    }

    // 6. Case purchase
    if (project.case?.purchaseDate) {
      const ts = Date.parse(project.case.purchaseDate);
      if (!Number.isNaN(ts)) {
        list.push({
          id: `case-${project.case.id ?? 'purchase'}`,
          dateStr: project.case.purchaseDate,
          timestamp: ts,
          title: `Case Purchased: ${project.case.name}`,
          subtitle: project.case.purchaseStore ? `from ${project.case.purchaseStore}` : undefined,
          price: project.case.purchasePrice ? formatCurrencyStringToString(project.case.purchasePrice) : undefined,
          category: 'case',
          eventType: 'purchase',
          badge: 'Case',
        });
      }
    }

    // 7. Strings installation / change
    if (project.strings?.lastChangeDate) {
      const ts = Date.parse(project.strings.lastChangeDate);
      if (!Number.isNaN(ts)) {
        list.push({
          id: `strings-${project.strings.id ?? 'change'}`,
          dateStr: project.strings.lastChangeDate,
          timestamp: ts,
          title: `Strings Setup: ${project.strings.name}`,
          subtitle: project.strings.gauge ? `Gauge: ${project.strings.gauge}` : undefined,
          category: 'strings',
          eventType: 'change',
          badge: 'Strings',
        });
      }
    }

    // 8. Parts purchases, deliveries, sold
    if (project.parts && project.parts.length > 0) {
      for (const part of project.parts) {
        if (part.purchaseDate) {
          const ts = Date.parse(part.purchaseDate);
          if (!Number.isNaN(ts)) {
            list.push({
              id: `part-purchase-${part.id}`,
              dateStr: part.purchaseDate,
              timestamp: ts,
              title: `Purchased: ${part.name}`,
              subtitle: `${part.partType}${part.purchaseStore ? ` from ${part.purchaseStore}` : ''}`,
              price: part.purchasePrice ? formatCurrencyStringToString(part.purchasePrice) : undefined,
              category: 'part',
              eventType: 'purchase',
              badge: String(part.partType || 'Component'),
            });
          }
        }

        if (part.deliveryDate) {
          const ts = Date.parse(part.deliveryDate);
          if (!Number.isNaN(ts)) {
            list.push({
              id: `part-delivery-${part.id}`,
              dateStr: part.deliveryDate,
              timestamp: ts,
              title: `Delivered: ${part.name}`,
              subtitle: String(part.partType || 'Component'),
              category: 'part',
              eventType: 'delivery',
              badge: String(part.partType || 'Component'),
            });
          }
        }

        if (part.soldDate) {
          const ts = Date.parse(part.soldDate);
          if (!Number.isNaN(ts)) {
            list.push({
              id: `part-sold-${part.id}`,
              dateStr: part.soldDate,
              timestamp: ts,
              title: `Sold: ${part.name}`,
              subtitle: String(part.partType || 'Component'),
              category: 'part',
              eventType: 'sold',
              badge: String(part.partType || 'Component'),
            });
          }
        }
      }
    }

    // Sort chronologically (oldest to newest)
    return list.sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      return (eventOrder[a.eventType] ?? 2) - (eventOrder[b.eventType] ?? 2);
    });
  }, [project]);

  // Duration calculation
  const durationLabel = React.useMemo(() => {
    if (!project.projectStart) return null;
    const startTs = Date.parse(project.projectStart);
    if (Number.isNaN(startTs)) return null;

    const endTs = project.projectComplete ? Date.parse(project.projectComplete) : Date.now();
    if (Number.isNaN(endTs) || endTs < startTs) return null;

    const friendly = millisecondsToFriendlyString(endTs - startTs);
    if (project.projectComplete) {
      return `Build completed in ${friendly}`;
    }
    return `In Progress • ${friendly} elapsed`;
  }, [project.projectStart, project.projectComplete]);

  if (events.length === 0) {
    return null;
  }

  const getEventIcon = (event: TimelineEvent) => {
    switch (event.eventType) {
      case 'start':
        return <Flag className="w-4 h-4 text-blue-600" />;
      case 'complete':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'delivery':
        return <Truck className="w-4 h-4 text-teal-600" />;
      case 'change':
        return <Music className="w-4 h-4 text-amber-600" />;
      case 'sold':
        return <Tag className="w-4 h-4 text-rose-600" />;
      case 'purchase':
      default:
        if (event.category === 'case') {
          return <Briefcase className="w-4 h-4 text-purple-600" />;
        }
        return <ShoppingCart className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getEventNodeBg = (event: TimelineEvent) => {
    switch (event.eventType) {
      case 'start':
        return 'bg-blue-100 border-blue-300 ring-4 ring-blue-50';
      case 'complete':
        return 'bg-emerald-100 border-emerald-300 ring-4 ring-emerald-50';
      case 'delivery':
        return 'bg-teal-100 border-teal-300 ring-4 ring-teal-50';
      case 'change':
        return 'bg-amber-100 border-amber-300 ring-4 ring-amber-50';
      case 'sold':
        return 'bg-rose-100 border-rose-300 ring-4 ring-rose-50';
      case 'purchase':
      default:
        if (event.category === 'case') {
          return 'bg-purple-100 border-purple-300 ring-4 ring-purple-50';
        }
        return 'bg-indigo-100 border-indigo-300 ring-4 ring-indigo-50';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-neutral-900">Project Timeline</h3>
              {durationLabel && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {durationLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {events.length} chronological milestone{events.length === 1 ? '' : 's'} recorded across project and components
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="self-start sm:self-auto inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Timeline Rail */}
      {isExpanded && (
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
          {events.map((event, idx) => {
            const badgeStyle = event.badge ? getPartBadgeStyle(event.badge) : '';
            return (
              <div key={`${event.id}-${idx}`} className="relative flex items-start gap-4 group">
                {/* Node Icon on Vertical Line */}
                <div
                  className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${getEventNodeBg(
                    event
                  )}`}
                >
                  {getEventIcon(event)}
                </div>

                {/* Event Card Content */}
                <div className="flex-1 bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-200/80 rounded-xl p-3.5 sm:p-4 transition-all duration-200 shadow-2xs hover:shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-neutral-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                        {event.dateStr}
                      </span>
                      {event.badge && (
                        <span
                          className={`text-2xs font-semibold px-2 py-0.5 rounded-md border ${badgeStyle}`}
                        >
                          {event.badge}
                        </span>
                      )}
                      <h4 className="font-bold text-sm text-neutral-900">{event.title}</h4>
                    </div>

                    {event.price && (
                      <span className="font-mono font-bold text-xs text-neutral-900 bg-white px-2 py-1 rounded-md border border-neutral-200 shrink-0 self-start sm:self-auto">
                        {event.price}
                      </span>
                    )}
                  </div>

                  {event.subtitle && (
                    <p className="text-xs text-neutral-600 mt-1 font-medium">{event.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;
