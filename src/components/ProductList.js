import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-500 font-bold">${product.price}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
