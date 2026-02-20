import { getStarSize } from '../utils/helpers';
import type { StarProps } from '../types';

export const Star = ({
  filled,
  half = false,
  size = 'md',
  style = 'default',
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
}: StarProps) => {
  const sizeClass = getStarSize(size);
  
  const getStarColor = () => {
    if (!filled) return 'text-gray-300 dark:text-gray-600';
    switch (style) {
      case 'filled':
        return 'text-yellow-400';
      case 'outline':
        return 'text-yellow-500';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <div
      className={`relative inline-block cursor-pointer transition-transform duration-200 hover:scale-110 ${sizeClass} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Étoile vide (outline) */}
      <svg
        className={`absolute inset-0 ${sizeClass}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>

      {/* Étoile remplie */}
      {(filled || half) && (
        <svg
          className={`absolute inset-0 ${sizeClass} ${getStarColor()}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          style={half ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )}
    </div>
  );
};