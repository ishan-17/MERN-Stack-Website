import React from "react";
import styles from "../../css/login.module.css"

const CreateProductForm = () => {
  return (
    <div className={styles["signin-form"]}>
      <div className={styles["signin-form-container"]}>
        <div className={styles["signin-form-header"]}>
          <h2>Create new product</h2>
          <p>Create a product of your choice and save it in your library.</p>
        </div>
        <form>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Name of product" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Price (In USD)" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Description of product" />
          </div>

          <div className={styles["input-box"]}>
            <input type="text" placeholder="Category" />
          </div>
          <div className={styles["input-box"]}>
            <input type="file" />
          </div>

          
          <a className={styles["create_button"]} href="https://www.google.com">
            Submit
          </a>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
