// src/components/Rating.js
import React, { useState } from "react";

const Rating = ({ productId, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setMessage("Please select a rating before submitting.");
      return;
    }

    try {
      await onRatingSubmit(productId, rating);
      setMessage("Thank you for your rating!");
      setRating(0); // Reset rating after submission
    } catch (error) {
      setMessage("Failed to submit rating. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Rate this Product</h2>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
            onClick={() => handleRatingChange(star)}
          >
            ★
          </button>
        ))}
      </div>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Rating
      </button>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default Rating;
