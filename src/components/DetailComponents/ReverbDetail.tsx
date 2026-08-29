import * as React from 'react';
import { Loader2 } from 'lucide-react';
import {
  averagePriceForKeywordsAsync,
  getRecentSearchCacheStatsAsync,
  getReverbUserFriendlyUrl,
  numberOfListingsForKeywordsAsync,
} from '../../data/reverbservice/reverbservice';
import {
  formatCurrencyStringToString,
  getPriceChange,
} from '../../infrastructure/datautils';

type ReverbDetailProps = {
  keywords: string;
  purchasePrice?: string;
  isMobile?: boolean;
};

const ReverbDetail: React.FC<ReverbDetailProps> = ({
  keywords,
  purchasePrice,
  isMobile,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [averagePrice, setAveragePrice] = React.useState('');
  const [numberOfListings, setNumberOfListings] = React.useState('');
  const [reverbCacheStats, setReverbCacheStats] = React.useState('');

  React.useEffect(() => {
    async function getReverbData(query: string) {
      try {
        const [avgPrice, numOfListings] = await Promise.all([
          averagePriceForKeywordsAsync(query),
          numberOfListingsForKeywordsAsync(query),
        ]);

        setAveragePrice(avgPrice);
        setNumberOfListings(numOfListings);
      } catch (err) {
        console.error('Error fetching Reverb data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    async function getCacheStats() {
      try {
        const cacheStats = await getRecentSearchCacheStatsAsync();
        setReverbCacheStats(cacheStats);
      } catch (err) {
        console.error('Error fetching cache stats:', err);
      }
    }

    setIsLoading(true);
    getReverbData(keywords);
    getCacheStats();
  }, [keywords]);

  const items = [
    averagePrice.startsWith('No')
      ? averagePrice
      : `Average Price: ${formatCurrencyStringToString(averagePrice)}`,
    !averagePrice.startsWith('No') && purchasePrice
      ? `Potential Price Change: ${getPriceChange(purchasePrice, averagePrice)}`
      : null,
    `Number of Active Listings: ${numberOfListings}`,
  ].filter(Boolean);

  return (
    <div className="w-full space-y-3">
      <h4 className="text-lg font-bold text-neutral-900">Now on Reverb:</h4>

      {isLoading ? (
        <div className="flex items-center space-x-3 p-6 text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
          <Loader2 className="w-5 h-5 animate-spin text-[#FE6B8B]" />
          <span className="text-sm font-medium">Checking Reverb marketplace data...</span>
        </div>
      ) : (
        <div className="space-y-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="space-y-1.5 text-sm text-neutral-700">
            {items.map((text, idx) => (
              <p key={idx} className="font-medium">
                {text}
              </p>
            ))}
          </div>

          <div className="pt-2 text-xs truncate">
            <span className="font-bold text-neutral-800">Search on Reverb.com: </span>
            <a
              target={isMobile ? undefined : '_blank'}
              rel="noreferrer"
              href={getReverbUserFriendlyUrl(keywords)}
              className="text-blue-600 hover:underline"
            >
              {getReverbUserFriendlyUrl(keywords)}
            </a>
          </div>

          <div className="pt-2 border-t border-neutral-200 text-[11px] text-neutral-500">
            {`Fetched from api.reverb.com, searched for ${encodeURI(keywords)} (${reverbCacheStats})`}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverbDetail;
