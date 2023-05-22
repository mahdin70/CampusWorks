import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Dropdown3() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium ${
          isOpen ? "text-blue-700" : "text-gray-700"
        } bg-white border border-gray-300 rounded-lg hover:bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500`}
        id="menu-button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        Learn &amp; Grow
        <svg
          className={`-mr-1 ml-2 h-5 w-5 text-gray-500 transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 6.707a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <Link
            to="/resources"
            className={`block px-4 py-2 text-sm font-semibold ${
              location.pathname === "/resources" ? "text-blue-700" : "text-gray-700"
            } hover:bg-emerald-600 hover:text-white`}
            onClick={handleClick}
          >
            View Resources
          </Link>
          <Link
            to="/post_resources"
            className={`block px-4 py-2 text-sm font-semibold ${
              location.pathname === "/post_resources" ? "text-blue-700" : "text-gray-700"
            } hover:bg-emerald-600 hover:text-white`}
            onClick={handleClick}
          >
            Post Resources
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dropdown3;
