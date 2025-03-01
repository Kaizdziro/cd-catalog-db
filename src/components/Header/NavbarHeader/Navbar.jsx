import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearchMoviesQuery } from "../../../services/movieApi";
import burgerIcon from "../../../assets/burger.png";
import lineIcon from "../../../assets/line.png";
import logoIcon from "../../../assets/logo.png";

export default function Navbar() {
  const [textInSearch, setTextInSearch] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBurger, setIsBurger] = useState(false);

  const burgerRef = useRef(null);
  const timer = useRef(null);
  const dropdownRef = useRef(null);

  const { data } = useSearchMoviesQuery(debouncedQuery, {
    skip: !debouncedQuery,
  });

  const navigate = useNavigate();
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (textInSearch.length <= 0) {
        setDebouncedQuery("");
        setIsDropdownOpen(false);
      } else {
        setDebouncedQuery(textInSearch);
        setIsDropdownOpen(true);
      }
      // console.log(data?.results);
    }, 1000);

    return () => clearTimeout(timer.current);
  }, [textInSearch]); //Search field timer

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (burgerRef.current && !burgerRef.current.contains(e.target)) {
        setIsBurger(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); //Checking if User tapping outside the field of search, or burger menu

  return (
    <div className="flex lg:gap-30 md:gap-15 justify-center items-center p-4 bg-black font-google text-xl font-semibold gap-5">
      {/*Icon of website */}

      <NavLink to="/">
        <img className="w-30 h-10" src={logoIcon} alt="CineDB" />
      </NavLink>

      {/*Favorite */}

      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `md:block hidden py-2  hover:text-indigo-500 transition-colors ease-in-out delay-75 duration-300 ${
            isActive ? "text-indigo-500" : "text-white"
          }`
        }
      >
        Favorites
      </NavLink>

      {/*Burger menu */}

      <div
        className="sm:hidden block bg-amber-50 rounded-xs"
        onClick={() => setIsBurger((prev) => !prev)}
      >
        <img className="w-10 h-10 " src={burgerIcon} alt="" />
      </div>
      {isBurger && (
        <div
          ref={burgerRef}
          className="w-64 h-screen bg-gray-800 shadow-lg z-50 transition-transform duration-300 ease-in-out fixed top-0 left-0"
        >
          <div className="flex flex-col items-center p-6">
            <button
              onClick={() => setIsBurger(false)}
              className="mb-6 p-2 focus:outline-none text-white hover:text-indigo-300"
            >
              Close
            </button>
            <img className="fixed top-11.5 w-50 h-15" src={lineIcon} alt="" />
            <h1 className="text-3xl text-indigo-400">Navigation</h1>
            <NavLink
              className={({ isActive }) =>
                `block py-2  hover:text-indigo-500 transition-colors ease-in-out delay-75 duration-300 ${
                  isActive ? "text-indigo-500" : "text-white"
                }`
              }
              to="/favorites"
              onClick={() => setIsBurger(false)}
            >
              Favorites
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block py-2  hover:text-indigo-500 transition ease-in-out delay-75 duration-300 ${
                  isActive ? "text-indigo-500" : "text-white"
                }`
              }
              to="/faq"
              onClick={() => setIsBurger(false)}
            >
              FAQ
            </NavLink>
          </div>
        </div>
      )}

      {/*Input field and DropdownList*/}

      <div className="relative">
        <input
          className="bg-white rounded-2xl w-45 md:w-60 text-xs md:text-xl p-3 outline-none"
          value={textInSearch}
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          onChange={(e) => setTextInSearch(e.target.value)}
        />

        {isDropdownOpen && data?.results?.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute left-0 mt-2 w-full max-w-sm bg-white shadow-lg rounded-md z-50
                 max-h-60 overflow-y-auto border border-gray-200 p-2"
          >
            {data.results.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition hover:scale-105"
                onClick={() => {
                  navigate(`/movie/${movie.id}`, {
                    state: { movieInfo: movie },
                  });
                  setIsDropdownOpen(false);
                  setTextInSearch("");
                }}
              >
                <img
                  src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded-md mr-3"
                />
                <div>
                  <h1 className="text-sm font-medium">{movie.title}</h1>
                  <p className="text-xs text-gray-500">
                    {movie.vote_average} ★
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*FAQ */}

      <NavLink
        className={({ isActive }) =>
          `md:block hidden py-2  hover:text-indigo-500 transition ease-in-out delay-75 duration-300 ${
            isActive ? "text-indigo-500" : "text-white"
          }`
        }
        to="/faq"
        onClick={() => setIsBurger(false)}
      >
        FAQ
      </NavLink>
    </div>
  );
}
