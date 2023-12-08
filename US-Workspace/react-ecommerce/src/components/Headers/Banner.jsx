import React from "react";
import styles from "../../css/productList.module.css";
import { useNavigate } from 'react-router-dom';


const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className={styles["banner-container"]}>
      <h1 className="text-5xl">Winter Sale Now Up To 50% Off!</h1>
      <h2 className="text-2xl mt-4">The best sale just got even better.</h2>
      <button onClick={() => navigate("/store")} style={{width: "fit-content", fontFamily: "math"}} className="btn bg-white  text-black font-bold py-2 px-4 rounded mx-auto mt-6">Shop the sale</button>
    </div>
  );
};

export default Banner;
