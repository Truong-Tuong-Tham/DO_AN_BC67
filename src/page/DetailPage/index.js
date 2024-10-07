import React, { useEffect } from "react";
import Address from "./component/Adress";
import DesJobAndPay from "./component/DesJobAndPay";
import FooterDetailPage from "./component/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailJobPage = () => {
const {infoUser} = useSelector((state) => state.userReducer);
const navigate = useNavigate();

useEffect(() => {
  if (!infoUser) {
    navigate("/auth/login");
  }
},[])
  return (

    <div className="w-full ">
      <Address />
      <DesJobAndPay />
      <FooterDetailPage/>
    </div>
  );
};

export default DetailJobPage;
