import React, { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../../utilities/db";
import StarRatings from "react-star-ratings";
import CategoryContext from "../../context/CategoryContext";
import { Link } from "react-router-dom";
import Banner from "../Headers/Banner";
import ProductCard from "./ProductCard";
const accessToken = localStorage.getItem("accessToken") || "";

const ProductList = () => {
  const a = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [token, setToken] = useState(null);
  if (category !== a.category) {
    setCategory(a.category);
  }

  useEffect(() => {
    console.log("Use effect re rendered");
    setToken(accessToken);
    if (category) {
      setProducts(a.products);
    } else {
      (async () => {
        try {
          const products = await getAllProducts();
          console.log(products);
          setProducts(products);
        } catch (error) {
          console.log("Error", error);
        }
      })();
    }
  }, [category, a.products, token]);

  return (
    <>
      <Banner />
      <div className="text-center mt-12 text-4xl w-1/2 mx-auto mb-20 leading-normal">
        <h1>Empowering Your Shopping Experience!</h1>
        <h1>
          Discover the joy of shopping with us, where each purchase is a journey.
        </h1>
      </div>
      {/* <div className="container mx-auto flex items-center justify-between">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div> */}
    </>
  );
};

export default ProductList;
