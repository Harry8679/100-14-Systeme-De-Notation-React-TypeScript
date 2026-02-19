// Types pour le système de notation

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  helpful: number;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  averageRating: number;
  totalReviews: number;
}

export interface RatingStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export type StarSize = 'sm' | 'md' | 'lg' | 'xl';
export type StarStyle = 'default' | 'filled' | 'outline';

export interface StarProps {
  filled: boolean;
  half?: boolean;
  size?: StarSize;
  style?: StarStyle;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: StarSize;
  style?: StarStyle;
  readonly?: boolean;
  allowHalf?: boolean;
  showValue?: boolean;
  className?: string;
}

export interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  label?: string;
  required?: boolean;
  error?: string;
}

export interface RatingDisplayProps {
  rating: number;
  totalReviews?: number;
  showCount?: boolean;
  size?: StarSize;
}

export interface ReviewCardProps {
  review: Review;
  onHelpful: (reviewId: string) => void;
}

export interface ReviewFormProps {
  productId: string;
  onSubmit: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  onCancel: () => void;
}

export interface RatingStatsProps {
  stats: RatingStats;
}