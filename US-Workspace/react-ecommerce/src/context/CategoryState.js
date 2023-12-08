import React, { useEffect, useState } from "react";
import CategoryContext from "./CategoryContext";
import { getProductsByCategory } from "../utilities/db";
const CategoryState = (props) => {
  const [category, setCategory] = useState("")
  const [products, setProducts] = useState([])

  const updateCategory = (updatedCategory) => {
    setCategory(updatedCategory)
  }

  useEffect(() => {
    (async () => {
      if (category) {
        const products = await getProductsByCategory(category);
        console.log("products by category", products)
        setProducts(products)
      }
    })();
  }, [category]);

  return <CategoryContext.Provider value={{products, updateCategory, category}}>{props.children}</CategoryContext.Provider>;
};

export default CategoryState;
