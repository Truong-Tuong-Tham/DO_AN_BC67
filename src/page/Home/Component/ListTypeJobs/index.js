import React, { useEffect, useState } from "react";
import Card from "./component/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { jobService } from "../../../../services/jobService";
import { postListTypeJobsAction } from "../../../../redux/userANDjob/jobSlice";

// Custom Arrow Components
const CustomLeftArrow = ({ ...props }) => (
  <button
    {...props}
    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-green-950 text-white rounded-full p-2 shadow-lg hover:bg-green-700 focus:outline-none transition duration-300"
  >
    <LeftOutlined className="text-base" />
  </button>
);

const CustomRightArrow = ({ ...props }) => (
  <button
    {...props}
    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-green-950 text-white rounded-full p-2 shadow-lg hover:bg-green-700 focus:outline-none transition duration-300"
  >
    <RightOutlined className="text-base" />
  </button>
);

const ListTypeJobs = () => {
  const [listTypeJobs, setListTypeJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchListTypeJobs = async () => {
    try {
      const res = await jobService.getTypeJob();
      setListTypeJobs(res.data.content);
      dispatch(postListTypeJobsAction(res.data.content));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchListTypeJobs();
  }, []);

  return (
    <div className="px-6 py-12 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-900 mb-4">
          Explore Job Types
        </h2>
        <p className="text-lg text-gray-600">
          Discover various job types to find the one that suits you best.
        </p>
      </div>

      <div className="relative">
        <Carousel
          arrows
          slidesToShow={4}
          dots={false}
          prevArrow={<CustomLeftArrow />}
          nextArrow={<CustomRightArrow />}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {listTypeJobs?.map((jobType) => (
            <Card
              key={jobType.id}
              title={jobType.tenLoaiCongViec}
              description={
                "Please choose the specific job or position you are interested in searching for, to help us tailor the results to your needs."
              }
              onClick={() => navigate(`/detail/jobs/${jobType.id}`)}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ListTypeJobs;
