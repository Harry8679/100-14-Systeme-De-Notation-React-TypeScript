import { ReviewCard } from './ReviewCard';
import type { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  onHelpful: (reviewId: string) => void;
}

export const ReviewList = ({ reviews, onHelpful }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Aucun avis pour le moment
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Soyez le premier à donner votre avis !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onHelpful={onHelpful} />
      ))}
    </div>
  );
};