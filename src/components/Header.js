import React from "react";
import { Link } from "react-router-dom";

const Header = ({ cartItemCount }) => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          My Store
        </Link>
        <nav className="space-x-6">
          <Link to="/favorites" className="hover:text-gray-200">
            Favorites
          </Link>
          <Link to="/cart" className="hover:text-gray-200 relative">
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
