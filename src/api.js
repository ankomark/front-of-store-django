import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCategories = () => axios.get(`${API_BASE_URL}/categories/`);
export const fetchProducts = () => axios.get(`${API_BASE_URL}/products/`);
export const fetchCart = (cartId) => axios.get(`${API_BASE_URL}/carts/${cartId}/`);
export const addToCart = (cartId, productId, quantity) =>
  axios.post(`${API_BASE_URL}/carts/${cartId}/add_to_cart/`, { product_id: productId, quantity });
export const fetchOrders = () => axios.get(`${API_BASE_URL}/orders/`);
export const fetchFavorites = () => axios.get(`${API_BASE_URL}/favorites/`);
export const fetchReviews = (productId) => axios.get(`${API_BASE_URL}/products/${productId}/reviews/`);
export const addReview = (productId, rating, comment) =>
  axios.post(`${API_BASE_URL}/products/${productId}/reviews/`, { rating, comment });
export const createProduct = (productData) =>
    axios.post(`${API_BASE_URL}/products/`, productData);
  export const deleteProduct = (productId) =>
    axios.delete(`${API_BASE_URL}/products/${productId}/`);
  