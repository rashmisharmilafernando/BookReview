"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import './assets/css/style.css';
import axios from 'axios';
import mainImage from '../app/assets/mainImg.png';
import { useEffect, useState } from 'react';
import BookReviewCard from './components/Card';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//Book review interface
interface Data {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewText: string;
  dateAdded: string;
}


export default function Home() {
  const [data, setData] = useState<Data[]>([]);

  const [reviews, setReviews] = useState<Data[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      rating: 5,
      reviewText: 'A classic novel with timeless themes.',
      dateAdded: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      rating: 4,
      reviewText: 'An important story about justice and race.',
      dateAdded: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      rating: 5,
      reviewText: 'A thought-provoking dystopian novel.',
      dateAdded: new Date().toLocaleDateString(),
    },
    {
      id: 4,
      title: 'Moby Dick',
      author: 'Herman Melville',
      rating: 3,
      reviewText: 'A challenging but rewarding read.',
      dateAdded: new Date().toLocaleDateString(),
    },
  ]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    const headers = {
      'Content-Type': 'application/json',

    }
    axios.get("http://localhost:8097/GET/reviews", { headers: headers })
      .then(r => {
        setData(r.data.data);
      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Sorry!",
          text: "Something went wrong"
        });
      })
  }

  const handleDelete = (review: Data) => {  
    Swal.fire({
      icon: "question",
      title: "Are you sure to delete this?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let id = review.id;  
        const headers = {
          'Content-Type': 'application/json',
        }
  
        axios.delete(`http://localhost:8097/DELETE/reviews/${id}`, { headers: headers })
          .then(r => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Review deleted successfully!"
            });
            getReviews();  
          })
          .catch(e => {
            Swal.fire({
              icon: "error",
              title: "Sorry!",
              text: "Something went wrong"
            });
          })
      }
    });
  };
  
  function handleEdit(id: string): void {
    <a href="/addnewreview" type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100">Add New Review</a>

  }

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
          <div className="flex justify-end mb-6">
            <a href="/addnewreview" type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100">Add New Review</a>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((r: Data, index: number) => (
              <BookReviewCard
                key={r.id}
                title={r.title}
                author={r.author}
                rating={r.rating}
                reviewText={r.reviewText}
                dateAdded={r.dateAdded}
                onEdit={handleEdit}
                onDelete={handleDelete}   />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
