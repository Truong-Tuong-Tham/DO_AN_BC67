import React, { useEffect } from "react";
import CardInF from "./ComponentProFile/CardProF";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Inf from "./ComponentProFile/ProfileDetail";

const PFDetail = ({ iduser }) => {
  const { infoUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!infoUser) {
      navigate("/");
    }
  }, [infoUser, navigate]);

  return (
    <div className="w-full  min-h-screen p-6  space-y-6 md:space-y-0 md:space-x-6">
      <div className=" w-full ">
        <CardInF idUser={iduser} />
      </div>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
  {infoUser ? (
    <Inf info={infoUser.user} />
  ) : (
    <p className="text-gray-600 text-center">Loading...</p>
  )}
</div>

    </div>
  );
};

export default PFDetail;
