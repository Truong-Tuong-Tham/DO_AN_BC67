import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMenujobsAction } from "../../../../redux/userANDjob/jobSlice";

import { Dropdown, Menu, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";

const ListTypeJobsDetail = () => {
  const { idjob } = useParams();
  const dispatch = useDispatch();
  const { menuJobs } = useSelector((state) => state.jobReducer);
  const navigate = useNavigate();

  // Local state to manage loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference for horizontal scrolling container
  const scrollContainerRef = useRef(null);

  // Fetch menu jobs from the server
  const fetchMenuJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobService.getMenuJob();
      dispatch(postMenujobsAction(res.data.content));
    } catch (err) {
      setError("Failed to fetch menu jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Render menu for each job type
  const renderMenu = (dsNhomChiTietLoai, itemId) => (
    <Menu>
      {dsNhomChiTietLoai.map((nhom) => (
        <React.Fragment key={nhom.id}>
          <Menu.Item>
            <span className="font-semibold text-gray-700 hover:text-green-700 text-sm sm:text-base">
              {nhom.tenNhom}
            </span>
          </Menu.Item>
          {nhom.dsChiTietLoai.map((chiTiet) => (
            <Menu.Item key={chiTiet.id}>
              <span
                onClick={() =>
                  navigate(`/detail/jobs/${itemId}/listjobs/${chiTiet.id}`)
                }
                className="pl-4 cursor-pointer text-gray-600 hover:text-green-700 text-xs sm:text-sm"
              >
                {chiTiet.tenChiTiet}
              </span>
            </Menu.Item>
          ))}
          <Menu.Divider />
        </React.Fragment>
      ))}
    </Menu>
  );

  // Render list of menu jobs
  const renderMenuJobs = () => {
    if (menuJobs && menuJobs.length > 0) {
      return menuJobs.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-center p-2 m-1 rounded-lg bg-white shadow-sm  transition-shadow duration-300 whitespace-nowrap"
        >
          <Dropdown
            overlay={renderMenu(item.dsNhomChiTietLoai, item.id)}
            placement="bottomCenter"
          >
            <div className="text-center cursor-pointer">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200" />
                <span className="relative group hover:text-green-700">
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-green-700 transition-all duration-300 group-hover:w-full w-0 " />
                  {item.tenLoaiCongViec}
                </span>

                <div className="flex-grow border-t border-gray-200" />
              </div>
            </div>
          </Dropdown>
        </li>
      ));
    }
    return <p className="text-gray-600 text-sm">No jobs available</p>;
  };

  // Fetch menu jobs when the component mounts
  useEffect(() => {
    fetchMenuJobs();
  }, []);

  // Show loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center py-8 bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  // Show error message if there is an error
  if (error) {
    return (
      <div className="flex justify-center py-8 bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Handle scroll left
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Handle scroll right
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Full-width lines above and below the content */}
      <hr className="absolute top-0 left-0 w-full h-[1px] bg-green-600 border-none" />
      <hr className="absolute bottom-0 left-0 w-full h-[1px] bg-green-600 border-none" />

      <div className="flex items-center justify-center relative z-10">
        {/* Scroll left button */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 transform -translate-y-1/2  text-gray-600 p-2 hover:bg-green-700 hover:text-white rounded-full shadow-md  focus:outline-none"
        >
          &lt;
        </button>

        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-hidden scroll-smooth w-full max-w-6xl mx-auto  whitespace-nowrap"
        >
          {renderMenuJobs()}
        </div>

        {/* Scroll right button */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2  text-gray-600 p-2 hover:bg-green-700 hover:text-white rounded-full shadow-md  focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ListTypeJobsDetail;
