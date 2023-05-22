import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    usercategory: "",
    batch: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [showModal, navigate]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setShowModal(true);
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome to CampusWorks</h1>
          <Link to="/login">
            <button
              type="button"
              className={
                "border-none outline-none py-3 px-4 bg-white hover:shadow-xl hover:shadow-black-100 text-black rounded-md w-48 font-medium text-base cursor-pointer font-poppins shadow-md my-4"
              }
            >
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 font-medium mb-1 text-sm mt-2"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                name="name"
                onChange={handleChange}
                value={data.firstName}
                required
                className={
                  styles.input +
                  " border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                }
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium mb-1 text-sm mt-2"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={
                  styles.input +
                  " border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium mb-1 text-sm mt-2"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter a Strong Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={
                  styles.input +
                  " border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                }
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="batch"
                className="text-gray-700 font-medium mb-1 text-sm mt-2"
              >
                Batch
              </label>
              <input
                type="batch"
                placeholder="Enter Your Batch"
                name="batch"
                onChange={handleChange}
                value={data.batch}
                required
                className={
                  styles.input +
                  " border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="text-gray-700 font-medium mb-1 text-sm mt-2"
              >
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                placeholder="Department"
                value={data.department}
                required
                className={
                  styles.input +
                  " border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-600"
                }
              >
                <option value="chooseDept">Select Your Department</option>
                <option value="cse">
                  Computer Science & Engineering (CSE)
                </option>
                <option value="eee">
                  Electrical and Electronics Engineering (EEE)
                </option>
                <option value="me">
                  Mechanical and Production Engineering (MPE)
                </option>
                <option value="civil">
                  Civil and Environmental Engineering (CEE)
                </option>
                <option value="btm">
                  Business and Technology Management (BTM)
                </option>
                <option value="tve">
                  Technical and Vocational Education (TVE)
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="usercategory"
                className="text-gray-700 font-medium mb-1 text-sm mt-2"
              >
                User Category
              </label>
              <select
                name="usercategory"
                onChange={handleChange}
                placeholder="Choose User Category"
                value={data.usercategory}
                required
                className={
                  styles.input +
                  " border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-600"
                }
              >
                <option value="chooseUser">Select Your User Category</option>
                <option value="currentStudent">Current Student</option>
                <option value="alumni">Alumni</option>
                <option value="facultyMember">Faculty Member</option>
              </select>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 rounded-md">
                  <p className="text-lg font-semibold text-black text-center">
                    Registration successful!
                  </p>
                  <p className="text-center">Redirecting to login page...</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={
                "border-none outline-none py-3 px-4 hover:shadow-xl hover:shadow-black-100 " +
                "text-black rounded-md w-370 font-medium text-base cursor-pointer font-poppins " +
                "shadow-md my-4 bg-gradient-to-r from-green-500 to-cyan-500"
              }
              style={{
                width: "370px",
                backgroundImage: "linear-gradient(to right, #31D274, #79D4CF)",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right,#48BB78, #38B2AC)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right,#31D274, #79D4CF)")
              }
              onMouseDown={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseUp={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
