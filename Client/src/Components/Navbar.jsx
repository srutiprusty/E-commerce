import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, Heart, User, Store } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const NavLinkComponent = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="hover:text-orange-500 transition-colors"
    >
      {children}
    </Link>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className=" mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1
            className="text-2xl font-bold text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Ecommerce
          </h1>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/productlist")}
            className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition-colors font-medium"
          >
            <Store size={20} />
            <span>Products</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate("/productlist")}
            className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition-colors font-medium"
          >
            <Heart size={20} />
            <span>Wishlist</span>
          </button>
          {/* Cart */}
          <button
            onClick={() => navigate("/productlist")}
            className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition-colors font-medium"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
          </button>

          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition-colors font-medium"
          >
            <User size={20} />
            <span>Login</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="text-orange-500 p-2"
          >
            <ShoppingCart size={24} />
          </button>
          <button onClick={() => setIsOpen(true)} className="text-orange-500">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isOpen ? "0%" : "-100%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 p-4 rounded-b-2xl"
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-800">
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col space-y-4 py-6 text-gray-800 font-medium">
          <NavLinkComponent to="/" onClick={() => setIsOpen(false)}>
            <div className="py-2">Home</div>
          </NavLinkComponent>
          <NavLinkComponent to="/" onClick={() => setIsOpen(false)}>
            <div className="py-2">About Us</div>
          </NavLinkComponent>
          <NavLinkComponent to="/productlist" onClick={() => setIsOpen(false)}>
            <div className="py-2">Products</div>
          </NavLinkComponent>
          <NavLinkComponent to="/" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3 py-2">
              <User size={20} />
              <span>Login</span>
            </div>
          </NavLinkComponent>
          <NavLinkComponent to="/productlist" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3 py-2">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </div>
          </NavLinkComponent>
          <NavLinkComponent to="/productlist" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3 py-2">
              <Heart size={20} />
              <span>Wishlist</span>
            </div>
          </NavLinkComponent>
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;
