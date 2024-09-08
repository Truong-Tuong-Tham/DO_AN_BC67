import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HeaderDetail from "../DetailJob/Component/Header";
import ListTypeJobsDetail from "../DetailJob/Component/ListType";
import ProfileDetail from "./component/ProFileDetail";
import ListHireJobs from "./component/InfJob/ComponentInf/ListHireJob";
import ActivityLog from "./component/Activity";
import Statistics from "./component/Statistics";
import Conected from "./component/Conected";
import ProfileX from "./component/ProFileXUser";
import FooterProFile from "./component/footerProFile";

const ProFilePage = () => {
  const navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.userReducer);
  const { iduser } = useParams();

  useEffect(() => {
    // Redirect to home page if infoUser does not exist
    if (!infoUser || !infoUser.user) {
      navigate("/");
    }
  }, [infoUser, navigate]);

  if (!infoUser || !infoUser.user) {
    // Render nothing while redirecting
    return null;
  }

  return (
    <div>
      <HeaderDetail />
      <ListTypeJobsDetail />

      <div className="flex flex-col lg:flex-row w-full mx-auto p-4 border-r border-gray-200">
        {infoUser.user.id == iduser ? (
          <>
            {/* ProfileDetail takes up full width on small screens and half width on large screens */}
            <div className="w-full lg:w-2/5 lg:pr-4  mb-4 lg:mb-0">
              <ProfileDetail iduser={iduser} />
            </div>
            {/* Combined block of components takes up full width on small screens and half width on large screens */}
            <div className="w-full lg:w-3/5 space-y-4">
              <ListHireJobs />
              <ActivityLog />
              <Statistics />
              <Conected />
            </div>
          </>
        ) : (
          // ProfileX takes up full width
          <div className="w-full mx-auto p-4 border-r border-gray-200">
            <ProfileX iduser={iduser} />
            <FooterProFile iduser={iduser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProFilePage;
