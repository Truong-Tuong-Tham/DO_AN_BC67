import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import { userService } from "../../../../services/userService";
const ServiceManagement = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { iduser } = useParams();
 const [listusers, setListUsers] = useState("");
  useEffect(() => {
    const fetchListComment = async () => {
      try {
        const res = await jobService.getlistCMT();
        setComments(res.data.content);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    const fetchListUser = async () => {
      try {
        const res = await userService.getListUser();
        setListUsers(res.data.content);
        console.log(res.data.content);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchListUser();
    fetchListComment();
  }, []);

  const handleDeleteCMT = (id) => {
    setCommentToDelete(id);
    setIsModalOpen(true);
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
        setIsModalOpen(false);
        setCommentToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setCommentToDelete(null);
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        {currentComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="flex items-center p-4 border-b border-gray-200">
              <img
                src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                className="w-16 h-16 rounded-full border-2 border-gray-300"
                alt="Commentor Avatar"
                loading="lazy"
              />
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Commentor {comment.maNguoiBinhLuan}
                  </p>
                  <button
                    onClick={() => handleDeleteCMT(comment.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <p className="text-gray-500 text-sm">{comment.ngayBinhLuan}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{comment.noiDung}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4 text-blue-800">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-blue-600">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
