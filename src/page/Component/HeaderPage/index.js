import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu, Avatar } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { postLogOutAction } from "../../../redux/userANDjob/userSlice";


const HeaderPage = () => {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.userReducer);

  // Menu items for "Fiverr Pro" dropdown


  // Menu for avatar dropdown when user is logged in
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
          to={`/profile/${infoUser?.user?.id || ""}`}
          className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          Profile
        </NavLink>
      </Menu.Item>

      {infoUser?.user?.role === "ADMIN" && (
        <Menu.Item>
          <NavLink
            to={`/admin/${infoUser?.user?.id || ""}`}
            className="block p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Admin Page
          </NavLink>
        </Menu.Item>
      )}

      <Menu.Item key="2" onClick={() => dispatch(postLogOutAction())}>
        <div className="flex items-center space-x-2">
          <LogoutOutlined />
          <span>Log Out</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white text-gray-900 py-4 px-6 lg:px-8 w-full flex items-center justify-between shadow-md border-b border-gray-300">
      <div className="flex items-center">
        <NavLink
          to="/"
          className="text-gray-900 text-3xl font-extrabold flex items-center space-x-3 hover:text-gray-600 transition duration-300 ease-in-out"
        >
          <span>Fiverr</span>
        </NavLink>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">


        {infoUser ? (
          <Dropdown overlay={userMenu} trigger={["hover"]}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="cursor-pointer"
              src={
                infoUser?.user?.avatar ||
                "https://th.bing.com/th/id/OIG3.UPRrZRmg69BkGs4yhKtj?w=1024&h=1024&rs=1&pid=ImgDetMain"
              }
            />
          </Dropdown>
        ) : (
          <>
            <NavLink
              to="/auth/login"
              className="btn text-gray-900 text-sm sm:text-base lg:text-lg"
            >
              Join
            </NavLink>
            <NavLink
              to="/auth/register"
              className="text-gray-900 text-sm sm:text-base lg:text-lg"
            >
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderPage;
