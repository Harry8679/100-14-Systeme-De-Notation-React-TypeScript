import { useState } from 'react';
import { RatingInput } from './RatingInput';
import type { ReviewFormProps } from '../types';

export const ReviewForm = ({ productId, onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = 'Veuillez sélectionner une note';
    }
    if (!title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!comment.trim()) {
      newErrors.comment = 'Le commentaire est requis';
    }
    if (!author.trim()) {
      newErrors.author = 'Votre nom est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        productId,
        author: author.trim(),
        rating,
        title: title.trim(),
        comment: comment.trim(),
        verified: false,
      });

      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      setAuthor('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Laisser un avis
      </h3>

      <div className="space-y-6">
        {/* Rating */}
        <RatingInput
          value={rating}
          onChange={setRating}
          label="Votre note"
          required
          error={errors.rating}
        />

        {/* Author */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Votre nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          {errors.author && (
            <p className="text-sm text-red-500 mt-1">{errors.author}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Titre de votre avis <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Excellent produit !"
            maxLength={100}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Votre commentaire <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre expérience avec ce produit..."
            rows={5}
            maxLength={500}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 outline-none transition-colors resize-none"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.comment ? (
              <p className="text-sm text-red-500">{errors.comment}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {comment.length}/500
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            Publier l'avis
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};