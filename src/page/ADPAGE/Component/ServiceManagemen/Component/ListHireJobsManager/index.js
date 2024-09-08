import React, { useEffect, useState } from "react";
import { jobService } from "../../../../../../services/jobService";

// Number of items per page for the job list
const ITEMS_PER_PAGE = 5;

// Number of items per page for the user table
const ITEMS_PER_PAGE_TABLE = 10;

const HireJobsManager = ({ listJobs, usersList }) => {
  const [listHire, setListHire] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserPage, setCurrentUserPage] = useState(1);

  const fetchListHire = async () => {
    try {
      const response = await jobService.getHireJobs();
      setIsModalVisible(response.data.content);
      const hires = response.data.content || [];

      const groupedHires = hires.reduce((acc, job) => {
        const { maCongViec, maNguoiThue } = job;
        if (!acc[maCongViec]) {
          acc[maCongViec] = { uniqueUsers: new Set() };
        }
        acc[maCongViec].uniqueUsers.add(maNguoiThue); // Add unique users to the set
        return acc;
      }, {});

      const hireCounts = Object.keys(groupedHires).reduce((acc, key) => {
        acc[key] = { hireCount: groupedHires[key].uniqueUsers.size };
        return acc;
      }, {});

      setListHire(hireCounts);
    } catch (error) {
      console.error("Error fetching list of hire jobs:", error);
    }
  };

  const fetchJobDetails = async (jobId) => {
    try {
      const jobDetail = await jobService.getJobWithID(jobId);
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        [jobId]: jobDetail,
      }));
    } catch (error) {
      console.error(`Error fetching job details for job ID ${jobId}:`, error);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid Date");
      }
      return new Intl.DateTimeFormat("en-US").format(date);
    } catch (error) {
      return "---------";
    }
  };

  useEffect(() => {
    fetchListHire();
  }, []);

  useEffect(() => {
    const jobIds = listJobs
      .filter((job) => listHire[job.id])
      .map((job) => job.id);

    jobIds.forEach((jobId) => {
      if (!jobDetails[jobId]) {
        fetchJobDetails(jobId);
      }
    });
  }, [listJobs, listHire, currentPage]);

  const filteredJobs = listJobs.filter((job) => listHire[job.id]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const pageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleJobClick = (jobId) => {
    const usersForJob = isModalVisible.filter(
      (item) => item.maCongViec === jobId
    );

    const uniqueUsers = Array.from(
      new Map(usersForJob.map((user) => [user.maNguoiThue, user])).values()
    );

    setFilteredUsers(uniqueUsers);
    setSelectedJob(jobId);
    setCurrentUserPage(1); // Reset user pagination when changing job
  };

  // Pagination for the user table
  const indexOfLastUserItem = currentUserPage * ITEMS_PER_PAGE_TABLE;
  const indexOfFirstUserItem = indexOfLastUserItem - ITEMS_PER_PAGE_TABLE;
  const currentUserItems = filteredUsers.slice(indexOfFirstUserItem, indexOfLastUserItem);

  const userTotalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE_TABLE);

  const handleUserPageChange = (pageNumber) => {
    setCurrentUserPage(pageNumber);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-teal-600">
        Hired Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {currentItems.map((job) => {
          const jobDetail = jobDetails[job.id];
          return (
            <div
              key={job.id}
              onClick={() => handleJobClick(job.id)}
              className="group border rounded-lg p-4 shadow-lg bg-white cursor-pointer hover:bg-teal-400 hover:shadow-xl transition-shadow duration-300"
            >
              {jobDetail ? (
                <div>
                  <img
                    src={jobDetail.data.content.hinhAnh}
                    alt={`Job ${job.id}`}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <p className="text-gray-600 mb-2 group-hover:text-white">
                    <strong>Number of Unique Hires:</strong>{" "}
                    {listHire[job.id].hireCount}
                  </p>
                </div>
              ) : (
                <p>Loading job details...</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 mx-1 rounded-md text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-300"
          >
            &laquo; Prev
          </button>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
              currentPage === startPage + index
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-teal-700 hover:text-white transition-colors duration-300`}
          >
            {startPage + index}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 mx-1 rounded-md text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-300"
          >
            Next &raquo;
          </button>
        )}
      </div>

      {/* Table for users who hired the selected job */}
      {selectedJob && filteredUsers.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-teal-600">
            Users for Job {selectedJob}
          </h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">User</th>
                <th className="px-4 py-2 border-b text-left">Date Hired</th>
              </tr>
            </thead>
            <tbody>
              {currentUserItems.map((user) => {
                const matchingUser = usersList.find(
                  (u) => u.id == user.maNguoiThue
                );

                return (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border-b flex items-center">
                      {matchingUser ? (
                        <>
                          <img
                            src={
                              matchingUser.avatar ||
                              "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611731.jpg?t=st=1725791833~exp=1725795433~hmac=8e216d050e4ee51a6c29cc431a2d8856015f6491"
                            }
                            alt={matchingUser.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          {matchingUser.name}
                        </>
                      ) : (
                        "Loading..."
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {formatDate(user.ngayThue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* User Table Pagination */}
          <div className="flex justify-center mt-4">
            {currentUserPage > 1 && (
              <button
                onClick={() => handleUserPageChange(currentUserPage - 1)}
                className="px-4 py-2 mx-1 rounded-md text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-300"
              >
                &laquo; Prev
              </button>
            )}
            {Array.from(
              { length: userTotalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => handleUserPageChange(page)}
                className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
                  currentUserPage === page
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } hover:bg-teal-700 hover:text-white transition-colors duration-300`}
              >
                {page}
              </button>
            ))}
            {currentUserPage < userTotalPages && (
              <button
                onClick={() => handleUserPageChange(currentUserPage + 1)}
                className="px-4 py-2 mx-1 rounded-md text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-300"
              >
                Next &raquo;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HireJobsManager;
