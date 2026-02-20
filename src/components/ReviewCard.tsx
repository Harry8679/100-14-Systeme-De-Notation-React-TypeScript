import { StarRating } from './StarRating';
import { formatDate } from '../utils/helpers';
import type { ReviewCardProps } from '../types';

export const ReviewCard = ({ review, onHelpful }: ReviewCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {review.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-800 dark:text-white">
                {review.author}
                {review.verified && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓ Achat vérifié
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(review.date)}
              </div>
            </div>
          </div>
          <StarRating value={review.rating} readonly size="sm" allowHalf />
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="font-bold text-gray-800 dark:text-white mb-2">
          {review.title}
        </h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onHelpful(review.id)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Utile ({review.helpful})
        </button>
      </div>
    </div>
  );
};