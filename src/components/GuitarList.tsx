import * as React from 'react';
import DataDetailTable, { Columns } from '../components/TableComponents/DataDetailTable';
import DataTable from '../components/TableComponents/DataTable';
import Layout from '../components/Layout';
import { buildPageTitle } from '../components/viewutils';
import { buildPageTitle, css } from '../components/viewutils';
import { Guitar } from '../interfaces/models/guitar';
import * as GuitarUtils from '../data/guitarservice/guitarutils';
import { Search } from 'lucide-react';
import { cn } from '../infrastructure/utils';

type ProjectFilter = 'all' | 'in-progress' | 'completed';

type GuitarListProps = {
  items: Guitar[];
  pathname: string;
  isMobile: boolean;
  title: string;
  columns: Columns;
};

const GuitarList: React.FC<GuitarListProps> = ({ items, pathname, isMobile, title, columns }) => {
  const isProjectList = columns === 'project';
  const [projectStatus, setProjectStatus] = React.useState<ProjectFilter>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const statusCounts = React.useMemo(() => {
    if (!isProjectList) return null;
    let inProgress = 0;
    let completed = 0;
    for (const item of items) {
      if (GuitarUtils.isInProgress(item)) {
        inProgress++;
      } else {
        completed++;
      }
    }
    return {
      all: items.length,
      inProgress,
      completed,
    };
  }, [items, isProjectList]);

  const filteredItems = React.useMemo(() => {
    let result = items;

    if (isProjectList) {
      if (projectStatus === 'in-progress') {
        result = result.filter((item) => GuitarUtils.isInProgress(item));
      } else if (projectStatus === 'completed') {
        result = result.filter((item) => !GuitarUtils.isInProgress(item));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const name = (item.name || '').toLowerCase();
        const make = (item.make || '').toLowerCase();
        const body = (item.bodyStyle || '').toLowerCase();
        const store = (item.purchaseStore || '').toLowerCase();
        return name.includes(q) || make.includes(q) || body.includes(q) || store.includes(q);
      });
    }

    return result;
  }, [items, isProjectList, projectStatus, searchQuery]);

  return (
    <Layout title={buildPageTitle(title)} pathname={pathname} isMobile={isMobile}>
      <div className="py-4 space-y-4">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {title}
            </h1>
            {isProjectList && (
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Custom guitar builds, modifications, and assembly project tracking
              </p>
            )}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-9 pr-3 py-1.5 input-search"
            />
          </div>
        </div>

        {/* Project Status Filter Pills */}
        {isProjectList && statusCounts && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setProjectStatus('all')}
              className={cn(
              className={css(
                'text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer',
                projectStatus === 'all'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
              )}
            >
              All Projects
              <span
                className={cn(
                className={css(
                  'ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full',
                  projectStatus === 'all' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                )}
              >
                {statusCounts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProjectStatus('in-progress')}
              className={cn(
              className={css(
                'text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer',
                projectStatus === 'in-progress'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              )}
            >
              In Progress
              <span
                className={cn(
                className={css(
                  'ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full',
                  projectStatus === 'in-progress'
                    ? 'bg-white/20 text-white'
                    : 'bg-amber-200/70 text-amber-900'
                )}
              >
                {statusCounts.inProgress}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProjectStatus('completed')}
              className={cn(
              className={css(
                'text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer',
                projectStatus === 'completed'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              )}
            >
              Completed
              <span
                className={cn(
                className={css(
                  'ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full',
                  projectStatus === 'completed'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-200/70 text-emerald-900'
                )}
              >
                {statusCounts.completed}
              </span>
            </button>
          </div>
        )}

        {/* Table Content */}
        {filteredItems.length > 0 ? (
          isMobile ? (
            <DataTable items={filteredItems} columns={columns} />
          ) : (
            <DataDetailTable items={filteredItems} columns={columns} />
          )
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-neutral-200 shadow-xs">
            <p className="text-neutral-500 font-medium">
              {searchQuery.trim() || projectStatus !== 'all'
                ? `No ${title.toLowerCase()} found matching your current filter criteria.`
                : `Nothing to see here, looks like no ${title.toLowerCase()} results were found.`}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GuitarList;
