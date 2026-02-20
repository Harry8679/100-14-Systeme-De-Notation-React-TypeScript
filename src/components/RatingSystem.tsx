import { useState } from 'react';
import { products } from '../data/products';
import { useReviews } from '../hooks/useReviews';
import { calculateRatingStats } from '../utils/helpers';
import { ProductCard } from './ProductCard';
import { RatingStats } from './RatingStats';
import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm';

export const RatingSystem = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addReview, markHelpful, getReviewsByProduct } = useReviews();

  const selectedProduct = selectedProductId
    ? products.find(p => p.id === selectedProductId)
    : null;

  const productReviews = selectedProductId
    ? getReviewsByProduct(selectedProductId)
    : [];

  const stats = calculateRatingStats(productReviews);

  const handleBackToProducts = () => {
    setSelectedProductId(null);
    setShowReviewForm(false);
  };

  const handleSubmitReview = (review: Parameters<typeof addReview>[0]) => {
    addReview(review);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ⭐ Système de Notation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Projet 14/100 • Controlled Components
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Gestion avancée des composants contrôlés et états
          </p>
        </div>

        {/* Content */}
        {!selectedProduct ? (
          /* Products list */
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Nos produits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProductId}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Product details and reviews */
          <div>
            <button
              onClick={handleBackToProducts}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux produits
            </button>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar - Stats */}
              <div className="space-y-6">
                <RatingStats stats={stats} />

                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Écrire un avis
                  </button>
                )}
              </div>

              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {showReviewForm ? (
                  <ReviewForm
                    productId={selectedProduct.id}
                    onSubmit={handleSubmitReview}
                    onCancel={() => setShowReviewForm(false)}
                  />
                ) : (
                  <ReviewList reviews={productReviews} onHelpful={markHelpful} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};