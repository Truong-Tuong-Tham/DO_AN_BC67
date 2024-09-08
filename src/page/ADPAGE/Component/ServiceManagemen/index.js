import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import { userService } from "../../../../services/userService";
import HireJobsManager from "./Component/ListHireJobsManager";

const ServiceManagement = () => {
  // State variables
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [listJobs, setListJobs] = useState([]);
  const [selectedJobCode, setSelectedJobCode] = useState(""); // State for selected job code
  const [filteredComments, setFilteredComments] = useState([]);
  const { iduser } = useParams();
  const usersList =listUsers;
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentRes, userRes, jobRes] = await Promise.all([
          jobService.getlistCMT(),
          userService.getListUser(),
          jobService.getListJobs(),
        ]);
        setComments(commentRes.data.content);
        setListUsers(userRes.data.content || []);
        setListJobs(jobRes.data.content || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter comments based on selected job code
  useEffect(() => {
    const filtered = selectedJobCode
      ? comments.filter((comment) => comment.maCongViec === selectedJobCode)
      : comments;
    setFilteredComments(filtered);
  }, [selectedJobCode, comments]);

  // Handlers for CRUD operations
  const handleDeleteCMT = (id) => {
    setCommentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (commentToDelete) {
      try {
        await jobService.deleteCMT(commentToDelete);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentToDelete)
        );
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setIsDeleteModalOpen(false);
        setCommentToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCommentToDelete(null);
  };

  const handleEditCMT = (comment) => {
    setCommentToEdit(comment);
    setIsEditModalOpen(true);
  };

  const handleUpdateCMT = async () => {
    if (commentToEdit) {
      try {
        await jobService.putCMT(commentToEdit, commentToEdit.id);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentToEdit.id ? commentToEdit : comment
          )
        );
      } catch (error) {
        console.error("Error updating comment:", error);
      } finally {
        setIsEditModalOpen(false);
        setCommentToEdit(null);
      }
    }
  };

  const handleEditChange = (e) => {
    setCommentToEdit({ ...commentToEdit, [e.target.name]: e.target.value });
  };

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get user details for avatar and name
  const getUserDetails = (userId) => {
    const user = listUsers.find((user) => user.id === userId);
    return user
      ? { avatar: user.avatar, name: user.name }
      : {
          avatar: "https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png",
          name: "Unknown",
        };
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl text-center text-teal-600 font-bold mb-6">Comments</div>
      {/* Job Filter Dropdown */}
      <div className="mb-4 w-[340px]">
        <select
          value={selectedJobCode}
          onChange={(e) => setSelectedJobCode(e.target.value)}
          className="p-2 border rounded-lg w-full"
        >
          <option value="">All jobs (show all comments)</option>
          {listJobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.tenCongViec}
            </option>
          ))}
        </select>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-6">
        {currentComments.length > 0 ? (
          currentComments.map((comment) => {
            const { avatar, name } = getUserDetails(comment.maNguoiBinhLuan);
            return (
              <div
                key={comment.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="flex items-center p-4 border-b border-gray-200">
                  <img
                    src={avatar}
                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                    alt="Commentor Avatar"
                    loading="lazy"
                  />
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        {name}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCMT(comment)}
                          className="text-yellow-500 hover:text-yellow-700 transition"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteCMT(comment.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.ngayBinhLuan).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{comment.noiDung}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments for this job.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-3 py-1 rounded-lg`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this comment?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && commentToEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Comment Content
              </label>
              <textarea
                name="noiDung"
                value={commentToEdit.noiDung}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleUpdateCMT}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hire Jobs Manager */}
      <HireJobsManager  listJobs= { listJobs }  usersList={usersList} />
    </div>
  );
};

export default ServiceManagement;
