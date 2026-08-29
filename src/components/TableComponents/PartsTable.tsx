import * as React from 'react';
import { ExternalLink, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Part } from '../../interfaces/models/part';
import { formatCurrencyToString } from '../../infrastructure/datautils';

type SortDirection = 'asc' | 'desc';

interface PartsTableProps {
  items: Part[];
}

function getPartTypeBadge(partType: string) {
  const typeLower = (partType || '').toLowerCase();
  switch (typeLower) {
    case 'neck':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'body':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'pickup':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'case':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'strings':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'hardware':
      return 'bg-slate-100 text-slate-800 border-slate-200';
    case 'electronics':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    default:
      return 'bg-neutral-100 text-neutral-800 border-neutral-200';
  }
}

function formatPartSpecs(part: Part): string {
  const typeLower = (part.partType || '').toLowerCase();

  if (typeLower === 'neck') {
    const specs = [
      part.scale ? `Scale: ${part.scale}` : '',
      part.neckRadius ? `Radius: ${part.neckRadius}` : '',
      part.nutWidth ? `Nut: ${part.nutWidth}` : '',
      part.numberOfFrets ? `${part.numberOfFrets} Frets` : '',
    ].filter(Boolean);
    return specs.join(' • ') || '—';
  }

  if (typeLower === 'body') {
    const specs = [
      part.bodyStyle || '',
      part.color || '',
      part.tremolo ? `Trem: ${part.tremolo}` : '',
      part.neckBoltOn ? 'Bolt-on' : '',
    ].filter(Boolean);
    return specs.join(' • ') || '—';
  }

  if (typeLower === 'pickup') {
    const specs = [
      part.position ? `${part.position} Position` : '',
      part.type || '',
      part.output ? `Output: ${part.output}` : '',
      part.magnetType ? `Magnet: ${part.magnetType}` : '',
      part.mount ? `Mount: ${part.mount}` : '',
    ].filter(Boolean);
    return specs.join(' • ') || '—';
  }

  if (typeLower === 'case') {
    return part.caseStyle ? `Style: ${part.caseStyle}` : '—';
  }

  return part.description || '—';
}

const PartsTable: React.FC<PartsTableProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [sortKey, setSortKey] = React.useState<keyof Part | 'specs'>('id');
  const [sortDir, setSortDir] = React.useState<SortDirection>('asc');

  const categories = React.useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    for (const item of items) {
      const type = item.partType || 'Other';
      counts[type] = (counts[type] || 0) + 1;
    }
    return counts;
  }, [items]);

  const handleSort = (key: keyof Part | 'specs') => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filteredAndSortedItems = React.useMemo(() => {
    let result = [...items];

    if (selectedCategory !== 'all') {
      result = result.filter(
        (item) => (item.partType || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const name = (item.name || '').toLowerCase();
        const type = (item.partType || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        const store = (item.purchaseStore || '').toLowerCase();
        const specs = formatPartSpecs(item).toLowerCase();
        return (
          name.includes(q) ||
          type.includes(q) ||
          desc.includes(q) ||
          store.includes(q) ||
          specs.includes(q)
        );
      });
    }

    result.sort((a, b) => {
      let valA: any = a[sortKey as keyof Part];
      let valB: any = b[sortKey as keyof Part];

      if (sortKey === 'specs') {
        valA = formatPartSpecs(a);
        valB = formatPartSpecs(b);
      }

      if (sortKey === 'purchasePrice') {
        valA = parseFloat(a.purchasePrice || '0') || 0;
        valB = parseFloat(b.purchasePrice || '0') || 0;
        return sortDir === 'asc' ? valA - valB : valB - valA;
      }

      if (sortKey === 'id') {
        valA = Number(a.id) || 0;
        valB = Number(b.id) || 0;
        return sortDir === 'asc' ? valA - valB : valB - valA;
      }

      if (valA === undefined || valA === null) return sortDir === 'asc' ? 1 : -1;
      if (valB === undefined || valB === null) return sortDir === 'asc' ? -1 : 1;

      const comp = String(valA).localeCompare(String(valB), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      return sortDir === 'asc' ? comp : -comp;
    });

    return result;
  }, [items, selectedCategory, searchQuery, sortKey, sortDir]);

  return (
    <div className="w-full space-y-4">
      {/* Category Pills and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.entries(categories).map(([category, count]) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span
                  className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parts, specs, stores..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#FE6B8B]/40 focus:border-[#FE6B8B] transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-100/80 text-neutral-700 font-semibold border-b border-neutral-200 select-none">
                {/* Pinned ID Column */}
                <th
                  onClick={() => handleSort('id')}
                  className="sticky left-0 bg-neutral-100 z-20 py-3 px-3.5 w-16 text-center cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>ID</span>
                    {sortKey === 'id' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Pinned Name Column */}
                <th
                  onClick={() => handleSort('name')}
                  className="sticky left-16 bg-neutral-100 z-20 py-3 px-4 min-w-[200px] border-r border-neutral-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center justify-between space-x-1">
                    <span>Part Name</span>
                    {sortKey === 'name' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Type Column */}
                <th
                  onClick={() => handleSort('partType')}
                  className="py-3 px-3.5 min-w-[100px] cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Type</span>
                    {sortKey === 'partType' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Key Specs Column */}
                <th
                  onClick={() => handleSort('specs')}
                  className="py-3 px-4 min-w-[240px] cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Key Specs & Features</span>
                    {sortKey === 'specs' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Price Column */}
                <th
                  onClick={() => handleSort('purchasePrice')}
                  className="py-3 px-3.5 min-w-[110px] text-right cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Price</span>
                    {sortKey === 'purchasePrice' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Purchase Store Column */}
                <th
                  onClick={() => handleSort('purchaseStore')}
                  className="py-3 px-3.5 min-w-[120px] cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Store</span>
                    {sortKey === 'purchaseStore' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Purchase Date Column */}
                <th
                  onClick={() => handleSort('purchaseDate')}
                  className="py-3 px-3.5 min-w-[110px] cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Purchased</span>
                    {sortKey === 'purchaseDate' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Delivery Date Column */}
                <th
                  onClick={() => handleSort('deliveryDate')}
                  className="py-3 px-3.5 min-w-[110px] cursor-pointer hover:bg-neutral-200/80 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Delivered</span>
                    {sortKey === 'deliveryDate' ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="w-3 h-3 text-[#FE6B8B]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-[#FE6B8B]" />
                      )
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 opacity-40" />
                    )}
                  </div>
                </th>

                {/* Product Link Column */}
                <th className="py-3 px-3.5 text-center min-w-[60px]">Link</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {filteredAndSortedItems.length > 0 ? (
                filteredAndSortedItems.map((part) => {
                  const specsText = formatPartSpecs(part);
                  const priceNum = parseFloat(part.purchasePrice || '0');
                  const formattedPrice =
                    priceNum > 0 ? formatCurrencyToString(priceNum) : '—';

                  return (
                    <tr
                      key={part.id}
                      className="hover:bg-neutral-50/80 transition-colors group"
                    >
                      {/* Pinned ID */}
                      <td className="sticky left-0 bg-white group-hover:bg-neutral-50 z-10 py-3 px-3.5 text-center font-mono text-neutral-500 font-medium border-r border-neutral-100">
                        {part.id}
                      </td>

                      {/* Pinned Name */}
                      <td className="sticky left-16 bg-white group-hover:bg-neutral-50 z-10 py-3 px-4 font-semibold text-neutral-900 border-r border-neutral-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                        <div className="flex flex-col">
                          <span>{part.name}</span>
                          {part.description && (
                            <span className="text-[11px] text-neutral-400 font-normal line-clamp-1">
                              {part.description}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getPartTypeBadge(
                            part.partType
                          )}`}
                        >
                          {part.partType || 'Part'}
                        </span>
                      </td>

                      {/* Specs */}
                      <td className="py-3 px-4 text-neutral-600 font-medium">
                        {specsText}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3.5 text-right font-medium text-neutral-800 whitespace-nowrap">
                        {formattedPrice}
                      </td>

                      {/* Store */}
                      <td className="py-3 px-3.5 text-neutral-700 whitespace-nowrap">
                        {part.purchaseStore || '—'}
                      </td>

                      {/* Purchased */}
                      <td className="py-3 px-3.5 text-neutral-600 whitespace-nowrap">
                        {part.purchaseDate || '—'}
                      </td>

                      {/* Delivered */}
                      <td className="py-3 px-3.5 text-neutral-600 whitespace-nowrap">
                        {part.deliveryDate || '—'}
                      </td>

                      {/* External Link */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        {part.productUrl ? (
                          <a
                            href={part.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-1 rounded-md text-neutral-400 hover:text-[#FE6B8B] hover:bg-neutral-100 transition-colors"
                            title="Open product webpage"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-neutral-400 font-medium">
                    No parts matching your search or category filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartsTable;
