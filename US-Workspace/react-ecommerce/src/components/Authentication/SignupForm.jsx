import React from "react";
import styles from  "../../css/login.module.css"


const SignupForm = () => {
  return (
    <div className={`${styles["signin-form"]} mt-10`}>
      <div className={styles["signin-form-container"]}>
        <div className={styles["signin-form-header"]}>
          <h2>Please Signup!</h2>
        </div>
        <form>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Firstname" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Lastname" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Email" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Password" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Confirm Password" />
          </div>
          <button> Sign me up! </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
