import { RatingDisplay } from './RatingDisplay';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onSelect(product.id)}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {product.name}
        </h3>

        <RatingDisplay
          rating={product.averageRating}
          totalReviews={product.totalReviews}
          size="sm"
        />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </span>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors">
            Voir les avis
          </button>
        </div>
      </div>
    </div>
  );
};