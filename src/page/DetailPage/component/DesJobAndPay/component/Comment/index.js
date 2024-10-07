import React, { useEffect, useState, useCallback } from "react";
import { jobService } from "../../../../../../services/jobService";
import { Button,Avatar, message } from "antd";
import { useSelector } from "react-redux";

const Comment = ({ idtype }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { infoUser } = useSelector((state) => state.userReducer);

  const fetchListComment = useCallback(async () => {
    setLoading(true);
    try {
      const res = await jobService.getListComment(idtype);
      setComments(res.data.content || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [idtype]);

  const handleCommentSubmit = useCallback(async () => {
    if (newComment.trim() === "") {
      message.warning("Please enter a comment before submitting.");
      return;
    }

    if (!infoUser || !infoUser.user) {
      message.error("You need to be logged in to submit a comment.");
      return;
    }

    const newCommentData = {
      id: 0,
      maCongViec: idtype,
      maNguoiBinhLuan: infoUser.user.id,
      ngayBinhLuan: new Date().toISOString(),
      noiDung: newComment,
      saoBinhLuan: getRandomRating(),
    };

    try {
      await jobService.postComment(newCommentData);
      setComments((prevComments) => [
        ...prevComments,
        {
          ...newCommentData,
          id: Date.now(),
          tenNguoiBinhLuan: infoUser.user.name,
          avatar: infoUser.user.avatar || "https://i.pravatar.cc/300",
          likes: 0,
        },
      ]);
      setNewComment("");
      message.success("Comment submitted successfully!");
      fetchListComment();
    } catch (error) {
      console.error("Error submitting comment:", error);
      message.error("Failed to submit comment.");
    }
  }, [newComment, idtype, infoUser, fetchListComment]);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

  const handleEdit = (commentId) => {
    // Handle edit comment logic
    console.log("Edit comment with ID:", commentId);
  };

  useEffect(() => {
    fetchListComment();
  }, [fetchListComment]);

  const renderComments = () => {
    if (loading) return <p className="text-gray-500">Loading comments...</p>;

    if (comments.length === 0)
      return <p className="text-gray-500">No comments available</p>;

    return comments.map((item) => (
      <div
        key={item.id}
        className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
      >
        <div className="flex items-start">
          <Avatar
            src={item.avatar}
            alt={item.tenNguoiBinhLuan}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-700">
                {item.tenNguoiBinhLuan}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(item.ngayBinhLuan).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{item.noiDung}</p>
            <div className="text-yellow-500 text-sm">
              {"⭐".repeat(item.saoBinhLuan)}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <button className="text-blue-500 text-xs">
                Like {item.likes || 0}
              </button>
              {infoUser && infoUser.user && item.tenNguoiBinhLuan === infoUser.user.name ? (
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-green-500 text-xs"
                >
                  Edit
                </button>
              ) : (
                <button className="text-green-800 text-xs">Reply</button>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
      {renderComments()}
      {infoUser && infoUser.user ? (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Add a Comment</h4>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            rows={4}
            placeholder="Write your comment here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button
            type="primary"
            onClick={handleCommentSubmit}
            className="mt-4 bg-green-500 text-white hover:bg-green-600"
          >
            Submit Comment
          </Button>
        </div>
      ) : (
        <div className="mt-6 text-gray-500">
          <p>You need to be logged in to add a comment.</p>
        </div>
      )}
    </div>
  );
};

export default Comment;
