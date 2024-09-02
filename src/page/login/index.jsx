import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { postLoginAction } from "../../redux/user/userSlice";
import { message } from "antd";
import { userService } from "../../services/userService";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      password: yup.string().required("Mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      userService.postLogin(values)
        .then((res) => {
          navigate("/");
          message.success("Đăng nhập thành công");
          dispatch(postLoginAction(res.data.content));
        })
        .catch((err) => {
          message.error("Đăng nhập thất bại");
        });
    },
  });

  return (
    <div className="h-screen w-screen flex">
      <div
        className="relative w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/837267/pexels-photo-837267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-green-400 opacity-75 z-0"></div>
        <div className="flex items-center justify-center h-full relative z-10">
          <div className="hidden lg:flex flex-col text-white p-10 max-w-lg">
            <h1 className="mb-3 font-bold text-white text-5xl">Hi! Welcome Back  To Fiverr</h1>
            <p className="pr-3">"Welcome back! Discover new job opportunities, connect with clients, and enhance your skills on Fiverr. Start exploring new projects today and continue advancing your career!"</p>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="p-12 bg-white mx-auto rounded-2xl shadow-lg w-full max-w-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-green-800">Sign In</h3>
            <p className="text-gray-500">Please sign in to your account.</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                placeholder="mail@gmail.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 tracking-wide">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">Remember</label>
              </div>
              <div className="text-sm">
                <NavLink to="#" className="text-green-400 hover:text-green-500">Forgot?</NavLink>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
            >
              Sign in
            </button>
          </form>
          <div className="pt-5 text-center text-gray-400 text-xs">
            <span>
              Register  
              <a onClick={() => navigate('/auth/register')} rel="noopener noreferrer" target="_blank" className="text-green-500 hover:text-green-600"> FIVERR</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
