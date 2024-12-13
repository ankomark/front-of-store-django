import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products/api/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products/api/products", {
          params: { category_id: selectedCategory } // Fetch products by selected category
        });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Refetch products whenever the selected category changes

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-semibold mb-6">Welcome to Our Store</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-sky-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-100">
              <img
                src={product.image || "placeholder.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-500">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
