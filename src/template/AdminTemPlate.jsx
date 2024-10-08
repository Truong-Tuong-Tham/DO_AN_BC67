import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import FooterAD from "../page/ADPAGE/Component/FooterAD";

const AdminTemPlate = () => {
  const { infoUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { iduser } = useParams();
  console.log("iduser", iduser);

  useEffect(() => {
    if (infoUser === null) {
      navigate('/');
    }
    if (infoUser?.user?.role !== 'ADMIN') {
      navigate('/');
    }
    if (infoUser?.user?.id != iduser) {
      navigate('/');
    }
  }, [infoUser, navigate]);

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div
          className="bg-white shadow-xl w-full md:w-60 lg:w-60 h-auto md:h-screen p-3 md:overflow-x-hidden transition-transform duration-300 ease-in-out"
        >
          <div className="space-y-6 cursor-pointer md:space-y-10 mt-10">
            <h1 className="font-bold text-4xl text-center md:hidden">
              D<span className="text-teal-600">.</span>
            </h1>
            <h1 onClick={() => navigate("/")} className="hidden md:block font-bold text-sm md:text-xl hover:text-teal-600 duration-300 text-center">
              Hello admin<span className="text-teal-600">.</span>
            </h1>
            <div id="profile" className="space-y-3 text-center">
              <img
                src={infoUser?.user.avatar}
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 onClick={() => navigate(`/profile/${infoUser?.user.id}`)} className="font-medium cursor-pointer text-xs md:text-sm text-teal-500">
                  {infoUser?.user.name}
                </h2>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <div id="menu" className="flex flex-col space-y-2">
              <NavLink
                to="UserManagement"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                    : "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                }
              >
                <svg
                  className="w-6 h-6 fill-current mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
                UserManagement
              </NavLink>
              <NavLink
                to="JobManagement"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                    : "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                }
              >
                <svg
                  className="w-6 h-6 fill-current mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                JobManagement
              </NavLink>
              <NavLink
                to="JobTypeManagement"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                    : "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                }
              >
                <svg
                  className="w-6 h-6 fill-current mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                JobTypeManagement
              </NavLink>
              <NavLink
                to="ServiceManagement"
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                    : "text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white rounded-md transition duration-150 ease-in-out flex items-center"
                }
              >
                <svg
                  className="w-6 h-6 fill-current mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zM4 7a1 1 0 100 2h12a1 1 0 100-2H4zM4 11a1 1 0 100 2h12a1 1 0 100-2H4zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z" />
                </svg>
                ServiceManagement
              </NavLink>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
      <FooterAD />
    </>
  );
};

export default AdminTemPlate;
