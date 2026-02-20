import { useState, useCallback } from 'react';

export const useRating = (initialRating: number = 0, readonly: boolean = false) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = useCallback((newRating: number) => {
    if (!readonly) {
      setRating(newRating);
    }
  }, [readonly]);

  const handleMouseEnter = useCallback((starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  }, [readonly]);

  const handleMouseLeave = useCallback(() => {
    if (!readonly) {
      setHoverRating(0);
    }
  }, [readonly]);

  const displayRating = hoverRating || rating;

  return {
    rating,
    hoverRating,
    displayRating,
    handleRatingChange,
    handleMouseEnter,
    handleMouseLeave,
    setRating,
  };
};