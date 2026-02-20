import { useRating } from '../hooks/useRating';
import { Star } from './Star';
import type { RatingInputProps } from '../types';

export const RatingInput = ({
  value,
  onChange,
  label = 'Votre note',
  required = false,
  error,
}: RatingInputProps) => {
  const {
    displayRating,
    handleRatingChange,
    handleMouseEnter,
    handleMouseLeave,
  } = useRating(value);

  const handleClick = (rating: number) => {
    handleRatingChange(rating);
    onChange(rating);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }, (_, index) => {
          const starRating = index + 1;
          return (
            <Star
              key={starRating}
              filled={starRating <= displayRating}
              size="lg"
              onClick={() => handleClick(starRating)}
              onMouseEnter={() => handleMouseEnter(starRating)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
        <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">
          {displayRating > 0 ? `${displayRating}/5` : 'Pas encore noté'}
        </span>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};