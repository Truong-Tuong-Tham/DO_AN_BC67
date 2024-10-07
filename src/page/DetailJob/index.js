import React, { useEffect } from "react";

import { postListTypeJobsDetailAction } from "../../redux/userANDjob/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BannerDetailJobs from "./Component/Banner";
import ListJobs from "./Component/ListJobs";
import FooterDetailJob from "./Component/FooterDetailJob";
import FAQDetailJob from "./Component/FAQ";
import GuideArticles from "./Component/GuideArticles";
import { jobService } from "../../services/jobService";

const DetailJob = () => {
  const dispatch = useDispatch();

  const fetchListTypeJobsDetail = async () => {
    try {
      const res = await jobService.getTypeJob();
      console.log("res.data.content", res.data.content);
      dispatch(postListTypeJobsDetailAction(res.data.content));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchListTypeJobsDetail();
  }, []);

  return (
    <div className="w-full max-w-[80%] mx-auto overflow-hidden">
      <BannerDetailJobs />
      <ListJobs />
      <GuideArticles />
      <FAQDetailJob />
      <FooterDetailJob />
    </div>
  );
};

export default DetailJob;
