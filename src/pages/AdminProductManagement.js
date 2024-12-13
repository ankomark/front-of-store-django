import React, { useState, useEffect } from "react";
import { fetchCategories, createProduct } from "../api";

const AdminProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity_in_stock: 0,
    image: null,
  });

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
  }, []);

  const handleCreateProduct = () => {
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    createProduct(formData).then(() => alert("Product created!"));
  };

  const handleImageUpload = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock Quantity</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newProduct.quantity_in_stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity_in_stock: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            onChange={handleImageUpload}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleCreateProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AdminProductManagement;
