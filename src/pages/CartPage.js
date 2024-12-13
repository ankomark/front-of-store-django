import React from "react";

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Correct calculation using item.price

    return (
        <div className="container mx-auto max-w-7xl p-6">
            <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={item.image} // Accessing item.image directly
                                alt={item.name} // Assuming you have a name property
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p>${item.price}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => onRemoveItem(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right text-lg font-semibold">
                        Total: <span className="text-blue-500">${calculateTotal()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
