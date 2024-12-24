"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Swal from 'sweetalert2';

const AddReviewPage: React.FC = () => {
  const router = useRouter();
  
  // Extract query parameters or state passed through routing
  const { query } = router;
  const { review } = query; // Assuming review is passed in the query params

  // Use a fallback if `review` is undefined or null
  const initialReview = review ? JSON.parse(review as string) : {};

  const [title, setTitle] = useState<string>(initialReview.title || "");
  const [author, setAuthor] = useState<string>(initialReview.author || "");
  const [rating, setRating] = useState<string>(initialReview.rating || "");
  const [reviewText, setReviewText] = useState<string>(initialReview.reviewText || "");
  const [dateAdded, setDateAdded] = useState<string>(initialReview.dateAdded || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "rating") {
      setRating(value); // Handle rating separately as it's a select
    } else {
      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "author":
          setAuthor(value);
          break;
        case "reviewText":
          setReviewText(value);
          break;
        case "dateAdded":
          setDateAdded(value);
          break;
        default:
          break;
      }
    }
  };

  const submit = (e: React.FormEvent) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      id: initialReview._id,
      title,
      author,
      rating,
      reviewText,
      dateAdded,
    };

    const apiUrl = review ? "http://localhost:8097/PUT/reviews" : "http://localhost:8097/POST/reviews";

    const request = review ? axios.put(apiUrl, body, { headers }) : axios.post(apiUrl, body, { headers });

    request
      .then((r) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: review ? "Review details updated successfully!" : "Review saved successfully!",
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Sorry!",
          text: "Something went wrong",
        });
      });
  };

  return (
    <section className="absolute h-screen w-full">
      <div className="max-w-lg mx-auto mt-[90px]">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">Add New Review</h1>
        <form className="bg-gray-100 p-6  shadow">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
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
              value={author}
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
              value={rating}
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
              value={reviewText}
              onChange={handleInputChange}
              placeholder="Write your review here..."
              className="w-full p-2 border border-gray-900  mt-1"
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full p-2 bg-gray-900 text-white  hover:bg-gray-800"
            onClick={submit}
          >
            {review ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </section >
  );
};

export default AddReviewPage;
