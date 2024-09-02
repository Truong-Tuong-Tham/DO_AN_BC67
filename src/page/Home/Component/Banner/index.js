import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const { listTypeJobs } = useSelector((state) => state.jobReducer);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter job titles based on the search text
    if (searchText) {
      const filteredSuggestions = listTypeJobs
        .filter((job) =>
          job.tenLoaiCongViec.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((job) => ({ name: job.tenLoaiCongViec, id: job.id }));
      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [searchText, listTypeJobs]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (id) => {
    if (id) {
      navigate(`/detail/jobs/${id}`);
    } else {
      // Optional: handle the case where no ID is provided
      navigate(`/detail/jobs/${searchText}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name); // Set the search text to the selected suggestion
    setSuggestions([]);
    setIsDropdownOpen(false);
    handleSearch(suggestion.id); // Navigate using the selected suggestion's ID
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-[80%] mx-auto my-10 rounded-2xl overflow-hidden">
      <img
        className="object-cover w-full h-[400px] rounded-2xl"
        src="https://images.pexels.com/photos/1048033/pexels-photo-1048033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Banner"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-5 rounded-2xl">
        <h1 className="text-4xl text-white font-bold mb-5 text-center">
          Find Your Perfect Job
        </h1>
        <div className="relative w-full max-w-md flex bg-white rounded-lg shadow-md h-14 sm:h-12" ref={inputRef}>
          <div className="flex items-center justify-center w-12 sm:w-10 rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="w-6 sm:w-5 fill-gray-500"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="bg-white pl-4 text-lg font-semibold outline-0 flex-1"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsDropdownOpen(suggestions.length > 0)}
          />
          <input
            type="button"
            value="Search"
            className="bg-green-600 text-white font-semibold hover:bg-green-800 transition-colors text-lg rounded-tr-lg rounded-br-lg flex items-center justify-center px-4 sm:px-2 sm:text-sm"
            onClick={() => handleSearch()} // No ID to pass here
          />
          {/* Suggestions Dropdown */}
          {isDropdownOpen && suggestions.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg"
              style={{ top: '100%', left: 0 }}
            >
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
