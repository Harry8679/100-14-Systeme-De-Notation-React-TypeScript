export const getStarSize = (size: 'sm' | 'md' | 'lg' | 'xl'): string => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  return sizes[size];
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const calculateRatingStats = (reviews: any[]) => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    const rounded = Math.floor(review.rating);
    if (rounded >= 1 && rounded <= 5) {
      distribution[rounded as keyof typeof distribution]++;
    }
  });

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  return {
    averageRating,
    totalReviews,
    distribution,
  };
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 3.5) return 'text-yellow-500';
  if (rating >= 2.5) return 'text-orange-500';
  return 'text-red-500';
};