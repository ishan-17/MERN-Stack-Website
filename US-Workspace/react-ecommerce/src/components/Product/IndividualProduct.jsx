import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";
import { Dna } from "react-loader-spinner";


const IndividualProduct = () => {
  const { id } = useParams();
  const [isLoading, setLoader] = useState(false);


  const [productData, setData] = useState(null);
  useEffect(() => {
    (async () => {
      setLoader(true)
      let res = await fetch(`http://localhost:3001/products/${id}`);
      console.log("ressss", res)
      res = await res.json();
      setData(res);
      setLoader(false)
    })();
  }, []);

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
   {!isLoading && <div className=" py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            {/* <div className="h-[460px] rounded-lg bg-gray-300  mb-4">
              <img
                className="w-full h-full object-cover"
                src={productData?.thumbnail}
                alt="Product Image"
              />
            </div> */}
            <Carousel>
              {productData?.images.map((e) => (
                <div>
                  <img style={{ maxHeight: 460 }} src={e} />
                </div>
              ))}
            </Carousel>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900  text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 ">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200  text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300 ">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800  mb-2">
              {productData?.title}
            </h2>
            {/* <p className="text-gray-600  text-sm mb-4">
              {productData?.description}
            </p> */}
            <div className="mb-4">
            <StarRatings
            starRatedColor="orange"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            rating={productData?.rating}
          />
          </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 ">Price:</span>
                <span className="text-gray-600 ">${productData?.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 ">Availability:</span>
                <span className="text-gray-600 ">In Stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2" />
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2" />
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2" />
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2" />
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">Select Size:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  S
                </button>
                <button className="bg-gray-300  text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  M
                </button>
                <button className="bg-gray-300  text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  L
                </button>
                <button className="bg-gray-300  text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  XL
                </button>
                <button className="bg-gray-300  text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  XXL
                </button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 ">
                Product Description:
              </span>
              <p className="text-gray-600  text-sm mt-2">
                {productData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> }
    </>
  );
};

export default IndividualProduct;
