import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import Header from './components/Header';
import axios from 'axios'; // Import axios to fetch product data

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Assuming you will have a products state to hold all products

  // Fetch products data on initial load
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/api/products'); // Adjust the API URL as necessary
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const onAddToCart = (productId, navigate) => {
    // Find the product to add to the cart
    const productToAdd = products.find(product => product.id === productId);
    
    if (!productToAdd) {
      alert("Product not found.");
      return;
    }

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      // Add the complete product details to the cart
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
    
    // Show alert and navigate to cart
    alert("Product has been added to cart successfully!");
    navigate("/cart");
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home onAddToCart={onAddToCart} />} />
        <Route path="/products/:productId" element={<ProductDetails onAddToCart={onAddToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={() => {}} onRemoveItem={() => {}} />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
