import { StarRating } from './StarRating';
import type { RatingDisplayProps } from '../types';

export const RatingDisplay = ({
  rating,
  totalReviews,
  showCount = true,
  size = 'md',
}: RatingDisplayProps) => {
  return (
    <div className="flex items-center gap-2">
      <StarRating
        value={rating}
        size={size}
        readonly
        allowHalf
        showValue
      />
      {showCount && totalReviews !== undefined && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ({totalReviews.toLocaleString('fr-FR')} avis)
        </span>
      )}
    </div>
  );
};