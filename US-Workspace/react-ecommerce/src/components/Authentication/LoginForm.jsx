import React from "react";
import styles from  "../../css/login.module.css"
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className={`${styles["signin-form"]}`}>
      <div className={styles["signin-form-container"]}>
        <div className={styles["signin-form-header"]}>
          <h2>Please Log In</h2>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <form>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Enter Email" />
          </div>
          <div className={styles["input-box"]}>
            <input type="text" placeholder="Enter Password" />
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
