import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { userService } from "../../services/userService";
import { message } from "antd";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const formRegister = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      birthday: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Tên không được để trống"),
      phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ"),
      email: yup
        .string()
        .required("Tài khoản không được để trống")
        .email("Tài khoản phải là email"),
      password: yup.string().required("Mật khẩu không được để trống"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp")
        .required("Xác nhận mật khẩu không được để trống"),
      birthday: yup.date().required("Ngày sinh không được để trống"),
    }),
    onSubmit: (values) => {
      userService
        .postRegister(values)
        .then(() => {
          navigate("/auth/login");
          message.success("Đăng ký thành công");
        })
        .catch((err) => {
          message.error("Đăng ký thất bại");
          console.error("Registration error: ", err);
        });
    },
  });

  return (
    <div className="h-screen w-screen flex overflow-hidden font-body">
      {/* Left side with image */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Register Page"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side with registration form */}
      <div className="flex flex-col justify-center items-center w-1/2 h-full ">
        <form
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4 sm:mx-8 border border-gray-200"
          onSubmit={formRegister.handleSubmit}
        >
    
          <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
          Register
          </h2>
          {["name", "phone", "email", "password", "confirmPassword", "birthday"].map((field, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-green-600 text-sm font-medium mb-1"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type={field === "birthday" ? "date" : field === "email" ? "email" : "text"}
                name={field}
                id={field}
                placeholder={`Nhập ${field}`}
                onChange={formRegister.handleChange}
                onBlur={formRegister.handleBlur}
                value={formRegister.values[field]}
              />
              {formRegister.touched[field] && formRegister.errors[field] && (
                <div className="text-red-500 text-xs mt-1">
                  {formRegister.errors[field]}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-between items-center space-y-4">
            <button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
             Submit
            </button>
            <NavLink
              to="/auth/login"
              className="text-green-500  hover:text-green-700 font-medium"
            >
             Already have an account?


            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
