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
import { useAccount } from '../../contexts/AccountContext';

type ReverbDetailProps = {
  keywords: string;
  purchasePrice?: string;
  isMobile?: boolean;
};

const ReverbDetail: React.FC<ReverbDetailProps> = ({
  keywords,
  purchasePrice,
}) => {
  const { activeAccount, accountData } = useAccount();
  const [isLoading, setIsLoading] = React.useState(true);
  const [averagePrice, setAveragePrice] = React.useState('');
  const [numberOfListings, setNumberOfListings] = React.useState('');
  const [reverbCacheStats, setReverbCacheStats] = React.useState('');

  const reverbToken =
    activeAccount?.tokens?.reverb ||
    accountData?.account?.tokens?.reverb ||
    activeAccount?.assets?.tokens?.reverb ||
    accountData?.assets?.tokens?.reverb;

  React.useEffect(() => {
    const accountId = activeAccount?.id;

    async function getReverbData(query: string) {
      try {
        const [avgPrice, numOfListings] = await Promise.all([
          averagePriceForKeywordsAsync(query, reverbToken, accountId),
          numberOfListingsForKeywordsAsync(query, reverbToken, accountId),
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
        const cacheStats = await getRecentSearchCacheStatsAsync(accountId);
        setReverbCacheStats(cacheStats);
      } catch (err) {
        console.error('Error fetching cache stats:', err);
      }
    }

    setIsLoading(true);
    getReverbData(keywords);
    getCacheStats();
  }, [keywords, reverbToken, activeAccount?.id]);

  const priceDiff =
    purchasePrice && averagePrice && !isNaN(Number(averagePrice))
      ? getPriceChange(purchasePrice, averagePrice)
      : undefined;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-neutral-200 p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <h3 className="font-bold text-neutral-900 text-sm">Marketplace Estimates</h3>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
          Reverb.com
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6 text-neutral-400 space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#FE6B8B]" />
          <span className="text-xs">Fetching current market data...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
              <span className="block text-[11px] font-medium text-neutral-500">Average Price</span>
              <span className="block text-base font-bold text-neutral-900 mt-0.5">
                {averagePrice ? formatCurrencyStringToString(averagePrice) : 'N/A'}
              </span>
            </div>

            <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
              <span className="block text-[11px] font-medium text-neutral-500">Active Listings</span>
              <span className="block text-base font-bold text-neutral-900 mt-0.5">
                {numberOfListings || '0'}
              </span>
            </div>
          </div>

          {priceDiff && (
            <p className="text-xs text-neutral-600 text-center font-medium">
              Estimated value delta:{' '}
              <span
                className={
                  priceDiff.startsWith('+')
                    ? 'text-emerald-600 font-semibold'
                    : priceDiff.startsWith('-')
                      ? 'text-red-600 font-semibold'
                      : 'text-neutral-700'
                }
              >
                {priceDiff}
              </span>
            </p>
          )}

          <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400">
            <span>{reverbCacheStats}</span>
            <a
              href={getReverbUserFriendlyUrl(keywords)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FE6B8B] hover:underline font-medium"
            >
              View on Reverb &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverbDetail;
