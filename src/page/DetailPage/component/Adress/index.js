import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Importing Font Awesome home icon

const Address = () => {
  const { listJobs } = useSelector((state) => state.jobReducer);
  const { idtype,idjob } = useParams();

  // Find the job type by idtype
  const jobType = listJobs.find((job) => job.id === parseInt(idtype, 10));

  if (!jobType)
    return <div className="p-4 text-red-500 text-sm">Job type not found</div>;

  // Breadcrumb items
  const breadcrumbItems = [
    {
      name: jobType.tenLoaiCongViec,
      link: `/detail/jobs/${idtype}`,
    },
    {
      name: jobType.tenNhomChiTietLoai,
      link: `/detail/jobs/${idtype}/listjobs/${idjob }`,
    },
    {
      name: jobType.tenChiTietLoai,
      link:`/detail/jobs/${idtype}/listjobs/${idjob }`,
    },
  ];

  return (
    <div className="bottom-4 left-4  p-2 sm:p-3 rounded-md ">
      <nav className="text-xs sm:text-sm">
        <ol className="list-none p-0 inline-flex space-x-2 items-center">
          <li className="flex items-center">
            <FaHome
              className="cursor-pointer hover:text-green-500 transition-colors duration-300 text-lg text-gray-600"
              onClick={() => (window.location.href = "/")}
            />
            <span className="mx-1 text-gray-500">/</span>
          </li>
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.link ? (
                <Link
                  to={item.link}
                  className="text-gray-600 hover:text-green-500 transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-800 font-semibold">{item.name}</span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <span className="mx-1 text-gray-500">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Address;
