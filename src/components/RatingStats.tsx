import { getRatingColor } from '../utils/helpers';
import type { RatingStatsProps } from '../types';

export const RatingStats = ({ stats }: RatingStatsProps) => {
  const { averageRating, totalReviews, distribution } = stats;

  const getPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Notes et avis
      </h3>

      {/* Average rating */}
      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className={`text-5xl font-bold ${getRatingColor(averageRating)}`}>
            {averageRating.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            sur 5
          </div>
        </div>

        <div className="flex-1">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Basé sur {totalReviews.toLocaleString('fr-FR')} avis
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Distribution */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = distribution[stars as keyof typeof distribution];
          const percentage = getPercentage(count);

          return (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {stars}
                </span>
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>

              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="w-16 text-right">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};