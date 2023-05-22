import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      setTimeout(() => {
        setMsg("");
        window.location = "/login";
      }, 1500);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 class="text-xl font-bold font-poppins p-4">Add New Password</h1>
            <input
              type="password"
              placeholder="Enter Your New Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
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
              Set As New Password
            </button>
          </form>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;
