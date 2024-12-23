"use client";
import React, { useState } from "react";

const AddReviewPage: React.FC = () => {
  const [review, setReview] = useState({
    title: "",
    author: "",
    rating: 0,
    reviewText: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: name === "rating" ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", review);

  };

  return (
    <section className="absolute h-screen w-full">
      <div className="max-w-lg mx-auto mt-[90px]">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">Add New Review</h1>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6  shadow">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={review.title}
              onChange={handleInputChange}
              placeholder="Enter book title"
              className="w-full p-2 border border-gray-900  mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={review.author}
              onChange={handleInputChange}
              placeholder="Enter author's name"
              className="w-full p-2 border border-gray-900  mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium">
              Rating
            </label>
            <select
              name="rating"
              value={review.rating}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-900  mt-1"
              required
            >
              <option value="0">Select Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="reviewText" className="block text-sm font-medium">
              Review
            </label>
            <textarea
              name="reviewText"
              value={review.reviewText}
              onChange={handleInputChange}
              placeholder="Write your review here..."
              className="w-full p-2 border border-gray-900  mt-1"
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full p-2 bg-gray-900 text-white  hover:bg-gray-800"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section >
  );
};

export default AddReviewPage;
