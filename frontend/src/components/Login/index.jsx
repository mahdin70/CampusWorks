import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000); // Clear error after 3 seconds
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 className="mb-5 font-bold text-3xl">Log In to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <div className="flex items-center mt-2">
                <div className="flex items-start">
                  <label className="relative flex items-center ml-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={showPassword}
                      onChange={toggleShowPassword}
                    />
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      Show Password
                    </span>
                  </label>
                </div>
                <div className="flex items-end ml-auto">
                  <Link
                    to="/forgot-password"
                    className="text-red-500 text-sm font-bold mr-2 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              className={
                "border-none outline-none my-5 py-3 px-4 hover:shadow-xl hover:shadow-black-100 " +
                "text-black rounded-md w-370 font-medium text-base cursor-pointer font-poppins " +
                "shadow-md mt-5 bg-gradient-to-r from-green-500 to-cyan-500"
              }
              style={{
                width: "370px",
                backgroundImage: "linear-gradient(to right, #31D274, #79D4CF)",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #48BB78, #38B2AC)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #31D274, #79D4CF)")
              }
              onMouseDown={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseUp={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New to</h1>
          <h1>CampusWorks?</h1>
          <Link to="/signup">
            <button
              type="button"
              className={
                "border-none outline-none py-3 px-4 hover:shadow-xl hover:shadow-black-100 " +
                "bg-white text-black rounded-md w-48 font-medium text-base cursor-pointer font-poppins " +
                "shadow-md my-4"
              }
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
