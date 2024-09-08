import React from "react";
import Address from "./component/Adress";
import DesJobAndPay from "./component/DesJobAndPay";
import FooterDetailPage from "./component/Footer";

const DetailJobPage = () => {
  return (
    <div className="w-full ">
      <Address />
      <DesJobAndPay />
      <FooterDetailPage/>
    </div>
  );
};

export default DetailJobPage;
