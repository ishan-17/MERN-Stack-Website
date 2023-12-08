import React, { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import { Dna } from "react-loader-spinner";

const Store = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [sort, setSort] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      setLoader(true)
      let res = await fetch("http://localhost:3001/products");
      let categories = await fetch("https://dummyjson.com/products/categories");
      categories = await categories.json();
      res = await res.json();
      setData(res.data);
      setCategories(categories);
      setLoader(false)
    })();
  }, []);

  const filterByCategory = (e) => {
    setFilter(true);
    console.log("eeee", e.target.value);
    const filteredProducts = data.filter((z) => z.category === e.target.value);
    console.log("filtered products", filteredProducts);
    setFilteredProducts(filteredProducts);
  };

  const handleSort = (e) => {
    // if (router.query.brand) {
    //   const { brand } = router.query;
    //   setBrand(brand);
    //   const productsx = products.filter((e) => e.attributes.brand === brand);
    //   setProducts(productsx);
    //   console.log("products", products);
    // }

    if (e.target.value === "lowest") {
      const sortedProducts = data.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      setSort("lowest");
      setData(sortedProducts);
    } else if (e.target.value === "highest") {
      const sortedProducts = data.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
      setSort("highest");
      setData(sortedProducts);
    }
  };

  return (
    <>
   {isLoading && <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
       <Dna 
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      
      />
      </div>}
     {!isLoading && <div className="flex items-center justify-center">
        <select
          className="form-select form-select-lg mb-3
            appearance-none
            block px-4
            py-2
            font-normal
            text-gray-700  bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mt-4 outline-none mr-6"
          name="brand"
          onChange={filterByCategory}
        >
          {categories.map((e, idx) => (
            <option key={idx} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select
          className="form-select form-select-lg mb-3
            appearance-none
            block px-4
            py-2
            font-normal
            text-gray-700  bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mt-4 outline-none"
          name="sort"
          onChange={handleSort}
        >
          <option value="lowest">Price: Lowest first</option>
          <option value="highest">Price: Highest first</option>
        </select>
      </div> }
      <div className="container mx-auto  grid grid-cols-3 gap-3 mt-8">
        {!filter
          ? data.map((e) => <ProductCard key={e?._id} product={e} />)
          : filteredProducts.map((z) => (
              <ProductCard key={z?._id} product={z} />
            ))}
      </div>
    </>
  );
};

export default Store;
