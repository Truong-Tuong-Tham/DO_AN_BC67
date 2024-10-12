import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { postLogOutAction } from "../../../../redux/userANDjob/userSlice";

const HeaderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idjob } = useParams();
  const { listTypeJobsDetail } = useSelector((state) => state.jobReducer);
  const { infoUser } = useSelector((state) => state.userReducer);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const idjobNumber = Number(idjob);
  const findName = listTypeJobsDetail.find((job) => job.id === idjobNumber);

  useEffect(() => {
    if (findName) {
      setInputValue(findName.tenLoaiCongViec || "");
    }
  }, [findName]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter suggestions based on input value
    if (value) {
      const filteredSuggestions = listTypeJobsDetail.filter((job) =>
        job.tenLoaiCongViec.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true); // Show suggestions when there is input
    } else {
      setShowSuggestions(false); // Hide suggestions when input is empty
    }
  };

  const handleSearch = () => {
    const foundJob = listTypeJobsDetail.find(
      (job) => job.tenLoaiCongViec === inputValue
    );
    if (foundJob) {
      navigate(`/detail/jobs/${foundJob.id}`);
    } else {
      navigate(`/detail/jobs/${inputValue}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.tenLoaiCongViec);
    setShowSuggestions(false); // Hide suggestions after clicking
    navigate(`/detail/jobs/${suggestion.id}`); // Navigate to the job detail
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSuggestions(false); // Hide suggestions when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userMenu = (
    <Menu className="p-4 bg-white shadow-lg rounded-lg">
      <Menu.Item key="1">
        <div className="flex items-center space-x-2">
          <UserOutlined />
          <span>{infoUser?.user?.name || "Guest"}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <NavLink
          to={`/`}
          className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          to={`/profile/${infoUser?.user?.id}`}
          className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          Profile
        </NavLink>
      </Menu.Item>
   

      {infoUser?.user?.role === "ADMIN" && (
        <Menu.Item>
          <NavLink
            to={`/admin/${infoUser?.user?.id}`}
            className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Admin Page
          </NavLink>
        </Menu.Item>
      )}

      <Menu.Item key="2" onClick={() => dispatch(postLogOutAction())}>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <span className="block p-2 text-red-500 hover:bg-gray-100 rounded-lg">
            Log Out
          </span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="h-full w-full p-5">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="font-extrabold tracking-widest text-2xl mb-4 md:mb-0">
          <a
            onClick={() => navigate("/")}
            className="transition duration-500 cursor-pointer text-green-900 text-3xl hover:text-green-800"
          >
            FIVERR
          </a>
        </div>
        
        <div className="flex-1 max-w-[350px] mx-auto md:mx-0 relative mb-4 md:mb-0" ref={inputRef}>
          <div className="flex h-[30px]">
            <div className="relative flex items-center w-full max-w-md rounded-lg border border-gray-200 bg-white overflow-hidden">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="absolute  left-0 w-8 h-5 text-gray-500 ml-3"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
              <input
                type="text"
                className="flex-1 pl-12 pr-16 py-2 border border-gray-200 rounded-lg outline-none"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
                placeholder="Search jobs..."
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 py-2 text-white bg-green-950 rounded-r-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.tenLoaiCongViec}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4">
          {infoUser ? (
            <>
              <Dropdown overlay={userMenu} trigger={["hover"]}>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                  src={infoUser.user.avatar}
                />
              </Dropdown>
            </>
          ) : (
            <>
              <NavLink to="/auth/login" className="btn text-gray-900">
                Join
                <div className="animation"></div>
              </NavLink>
              <NavLink to="/auth/register" className="btn text-gray-900">
                Register
                <div className="animation"></div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderDetail;
