import { useState, useCallback, useEffect } from 'react';
import { initialReviews } from '../data/products';
import type { Review } from '../types';

const STORAGE_KEY = 'reviews';

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReview = useCallback((review: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date(),
      helpful: 0,
    };
    setReviews(prev => [newReview, ...prev]);
  }, []);

  const markHelpful = useCallback((reviewId: string) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  }, []);

  const getReviewsByProduct = useCallback((productId: string) => {
    return reviews.filter(review => review.productId === productId);
  }, [reviews]);

  return {
    reviews,
    addReview,
    markHelpful,
    getReviewsByProduct,
  };
};