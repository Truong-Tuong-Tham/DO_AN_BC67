import React from "react";
import BannerDetailJobs from "../DetailJob/Component/Banner";
import ListCardJobs from "./component/ListCardJobs";
import FAQListJobsPage from "./component/FAQ";
import FooterListJobs from "./component/Footer";

const ListJobsPage = () => {
  return (
  <div>
      <div className="w-full max-w-[80%] mx-auto overflow-hidden">
      <BannerDetailJobs />
      <ListCardJobs />
      <FAQListJobsPage/>
     
    </div>
     <FooterListJobs/>
  </div>
  );
};

export default ListJobsPage;
