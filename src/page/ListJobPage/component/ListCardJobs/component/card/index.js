import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobService } from "../../../../../../services/jobService";



const CardJobs = ({ id, idtype }) => {
  const [jobs, setJobs] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/jobs/detailjob/${idtype}/${id}`);
  };

  const fetchDetailJob = async () => {
    try {
      const res = await jobService.getJobWithID(id);
      setJobs(res.data.content);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchDetailJob();
  }, [id]);

  if (!jobs) return null;

  // Ensure saoCongViec is a valid number between 0 and 5
  const saoCongViec = Math.max(0, Math.min(5, Math.floor(jobs.saoCongViec)));

  return (
    <div
  className="bg-blue-300 max-h-72 rounded-lg hover:shadow-lg overflow-hidden relative cursor-pointer"
  onClick={handleClick}
>
  <div className="absolute p-3 z-20 h-full w-full justify-between flex flex-col">
    <button className="p-1.5 backdrop-blur-sm bg-gray-800/30 w-7 h-7 justify-center items-center flex self-end rounded-lg border-gray-400/50 border hover:shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
    </button>
    <div className="p-3 rounded-lg w-full hover:shadow-lg backdrop-blur-sm bg-gray-800/30 self-end border-gray-400/50 border">
      <h1 className="text-white font-bold text-md mb-6">
        {jobs.tenCongViec}
      </h1>
      <div className="flex justify-between">
        <h3 className="text-white font-bold text-md capitalize">
          ${jobs.giaTien}
        </h3>
        <h3 className="text-white font-bold text-md">
          {Array(saoCongViec).fill("★").join("")}
          {Array(5 - saoCongViec)
            .fill("☆")
            .join("")}
        </h3>
      </div>
    </div>
  </div>
  <img
    src={jobs.hinhAnh}
    alt={jobs.tenCongViec}
    className="w-full h-72 object-cover"
  />
</div>

  );
};

export default CardJobs;
