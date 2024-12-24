import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookReviewCardProps {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewText: string;
  dateAdded: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BookReviewCard: React.FC<BookReviewCardProps> = ({ id, title, author, rating, reviewText, dateAdded, onEdit, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">By {author}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </span>
        <span className="ml-2 text-gray-500 text-sm">{rating} / 5</span>
      </div>
      <p className="mt-2 text-gray-700">{reviewText}</p>
      <p className="mt-2 text-gray-400 text-xs">Added on: {dateAdded}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => navigate('/addnewreview', { state: { review: id } })}
          className="px-4 py-2 text-sm bg-blue-900 text-white hover:bg-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 text-sm bg-red-900 text-white hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookReviewCard;
