import { Star } from './Star';
import type { StarRatingProps } from '../types';

export const StarRating = ({
  value,
  onChange,
  max = 5,
  size = 'md',
  style = 'default',
  readonly = false,
  allowHalf = false,
  showValue = false,
  className = '',
}: StarRatingProps) => {
  const handleStarClick = (starIndex: number) => {
    if (!readonly && onChange) {
      onChange(starIndex);
    }
  };

  const getStarState = (starIndex: number) => {
    if (allowHalf) {
      const diff = value - starIndex;
      if (diff >= 1) return { filled: true, half: false };
      if (diff >= 0.5) return { filled: true, half: true };
      return { filled: false, half: false };
    }
    return { filled: starIndex <= value, half: false };
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: max }, (_, index) => {
          const starIndex = index + 1;
          const { filled, half } = getStarState(starIndex);

          return (
            <Star
              key={starIndex}
              filled={filled}
              half={half}
              size={size}
              style={style}
              onClick={() => handleStarClick(starIndex)}
              className={readonly ? 'cursor-default' : ''}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};