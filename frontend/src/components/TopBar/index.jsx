import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import campusWorks from "../../assets/campusWorks.png";
import logout from "../../assets/logout.png";
import Dropdown from "../Dropdown";
import Dropdown2 from "../Dropdown2";
import Dropdown3 from "../Dropdown3";

const TopBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white flex flex-row max-h-40 px-2 shadow-lg sm:px-4 py-2.5 0 fixed w-full z-20 top-0 left-0 right-0 border-b border-gray-200">
      <div className="container flex flex-row w-full">
        <div className="flex align-items-center">
          <a href="/" className="flex items-center">
            <img
              src={campusWorks}
              className=""
              width="200"
              height="100"
              alt="Logo"
            />
          </a>
        </div>
        <div className="container flex flex-wrap items-center justify-center">
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-inherit md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pl-3 pr-4 rounded text-sm ${
                    location.pathname === "/"
                      ? "text-blue-700"
                      : "text-gray-700"
                  } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`block py-2 pl-3 pr-4 rounded ${
                    location.pathname === "/profile"
                      ? "text-blue-700"
                      : "text-gray-700"
                  } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/Chat"
                  className={`block py-2 pl-3 pr-4 rounded ${
                    location.pathname === "/Chat"
                      ? "text-blue-700"
                      : "text-gray-700"
                  } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                >
                  Inbox
                </Link>
              </li>
              <li>
                <Link
                  to="/myjobs"
                  className={`block py-2 pl-3 pr-4 rounded ${
                    location.pathname === "/myjobs"
                      ? "text-blue-700"
                      : "text-gray-700"
                  } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                >
                  My Jobs
                </Link>
              </li>
            </ul>
            <div className="mx-1">
              <Dropdown />
            </div>
            <div className="mx-1">
              <Dropdown2 />
            </div>

            <div className="mx-1">
              <Dropdown3 />
            </div>
          </div>
        </div>

        <div className="flex align-items-center p-2">
          <button
            onClick={handleLogout}
            className="relative inline-flex items-center justify-center px-10  overflow-hidden text-sm  transition duration-300 ease-out border-2 border-green-500 rounded-3xl shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-15 text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
              <img
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                src={logout}
                alt="Logout"
              ></img>
            </span>
            <span className="absolute flex items-center justify-center w-full h-15 text-grey-700 transition-all duration-300 transform group-hover:translate-x-full ease">
              Log Out
            </span>
            <span className="relative invisible">Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
