// src/pages/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Favorites from "../components/Rating";
import Rating from "../components/Rating"; // Import the Rating component

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleRatingSubmit = async (productId, rating) => {
    await axios.post(`http://localhost:8000/products/api/products/${productId}/rate/`, {
      rating: rating,
    });
    // Optionally, you could refetch the product data to include the new rating
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-md">
        <img
          src={product.image || "placeholder.jpg"}
          alt={product.name}
          className="w-full md:w-1/3 h-64 object-cover rounded-md"
        />
        <div className="md:ml-6 flex-1">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg text-blue-500 font-bold mb-4">${product.price}</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => onAddToCart(product.id, navigate)}
          >
            Add to Cart
          </button>
          {/* Include the Rating component */}
          <Rating productId={productId} onRatingSubmit={handleRatingSubmit} />
          {/* Include the Favorites component */}
          {/* <Favorites favoriteProducts={favoriteProducts} onRemoveFavorite={() => {}} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
