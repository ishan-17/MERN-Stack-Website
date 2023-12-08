import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../utilities/db";
import CategoryContext from "../../context/CategoryContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const { state, dispatch } = useContext(ShoppingCartContext);
  const user = localStorage.getItem("accessToken");

  const totalQuantity = state?.cart?.cartItems.reduce((acc, e) => {
    acc = acc + e.quantity;
    return acc;
  }, 0);

  useEffect(() => {
    (async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories.data);
      } catch (error) {
        console.log("Error in fetching categories", error);
      }
    })();
  }, [category]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className=" border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.jpeg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            ShopCrafted
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-gray-900 md:dark:bg-gray-900 border-gray-700">
            <li>
              <Link
                to="/orders"
                className="block py-2 px-3  rounded md:bg-transparent  text-white"
                aria-current="page"
              >
                Orders
              </Link>
            </li>
            <li className="block py-2 px-3  rounded md:bg-transparent  text-white">
              <Link to="/cart">Cart</Link>
              <span className=" bg-red-600 text-white px-2 py-1 rounded-xl">
                {totalQuantity ? totalQuantity : 0}
              </span>
            </li>
            {!user && (
              <li className="block py-2 px-3  rounded md:bg-transparent  text-white">
                <Link to="/login" className="cursor-pointer">Login</Link>
              </li>
            )}

            {user && (
              <li
                onClick={logout}
                className="block py-2 px-3  rounded md:bg-transparent  text-white"
              >
                <Link to="/login">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
