"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import './assets/css/style.css';
import axios from 'axios';
import mainImage from '../app/assets/mainImg.png'; 
import { useEffect, useState } from 'react';
import BookReviewCard from './components/Card';

//Book review interface
interface BookReview {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewText: string;
  dateAdded: string;
}


export default function Home() {

  const [reviews, setReviews] = useState<BookReview[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      rating: 5,
      reviewText: 'A classic novel with timeless themes.',
      dateAdded: new Date().toLocaleDateString(),
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      rating: 4,
      reviewText: 'An important story about justice and race.',
      dateAdded: new Date().toLocaleDateString(),
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      rating: 5,
      reviewText: 'A thought-provoking dystopian novel.',
      dateAdded: new Date().toLocaleDateString(),
    },
    {
      id: '4',
      title: 'Moby Dick',
      author: 'Herman Melville',
      rating: 3,
      reviewText: 'A challenging but rewarding read.',
      dateAdded: new Date().toLocaleDateString(),
    },
  ]);

  const handleEdit = (id: string) => {
    const reviewToEdit = reviews.find((review) => review.id === id);
    if (reviewToEdit) {
      const updatedReviewText = prompt('Edit your review:', reviewToEdit.reviewText);
      if (updatedReviewText) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === id ? { ...review, reviewText: updatedReviewText } : review
          )
        );
      }
    }
  };

  const handleDelete = (id: string) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };
  return (
    <main>
      {/* Home Section */}
      <section id="homeSection" className="relative h-screen w-full">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0">
          <img src={mainImage.src} alt="Main Image" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Welcome to the Book Review
          </h1>
        </div>
      </section>

      {/* Card Section */}
      <section className="relative w-full flex items-center justify-center py-8">

        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Book Reviews</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <BookReviewCard
                key={review.id}
                book={review}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
