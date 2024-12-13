import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Shipping Address: {order.shipping_address}</p>
            <p>Total: ${order.total_price}</p>
            <p>Ordered At: {new Date(order.ordered_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
