import React, { useEffect, useState } from "react";
import styles from "../../css/login.module.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../../utilities/db";
import StarRatings from "react-star-ratings";

const EditProductForm = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleRating = (newRating, name) => {
    console.log("new Rating", newRating);
    setRating(newRating);
  };

  useEffect(() => {
    (async () => {
      const productData = await getProductById(id);
      setState(productData);
      console.log(productData);
    })();
  }, [id]);
  return (
    <div className={`${styles["signin-form"]} mt-[120px]`}>
      <div className={styles["signin-form-container"]}>
        <div className={styles["signin-form-header"]}>
          <h2>Edit your product</h2>
          <p>Edit your product and save it in your library.</p>
        </div>
        <form>
          <div className={styles["input-box"]}>
            <input
              value={state?.title}
              type="text"
              placeholder="Name of product"
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </div>
          <div className={styles["input-box"]}>
            <input
              value={`$${state?.price}`}
              type="text"
              placeholder="Price (In USD)"
              onChange={(e) => setState({ ...state, price: e.target.value })}
            />
          </div>
          <div className={styles["input-box"]}>
            <textarea
              value={state?.description}
              type="text"
              placeholder="Description of product"
              className="w-[calc(100%-30px)] rounded-md border-[1px] border-solid border-[#787878] p-2"
              rows={4}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
            />
          </div>
          <div className="mb-10">
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              starDimension="40px"
              starSpacing="4px"
              changeRating={handleRating}
              name="rating"
            />
          </div>

          <div>
            <img
              style={{ width: "100px", height: "100px" }}
              src={state?.image}
              alt="Broken"
              className="mb-4"
            />
          </div>
          <button disabled className={`${styles["create_button"]} opacity-50`}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
