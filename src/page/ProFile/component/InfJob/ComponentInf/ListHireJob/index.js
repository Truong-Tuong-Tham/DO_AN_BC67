import React, { useState, useEffect } from "react";
import { jobService } from "../../../../../../services/jobService";
import { Carousel, Modal, Button } from "antd";

import "antd/dist/reset.css"; // Ensure Ant Design styles are imported
import { FaStar } from "react-icons/fa";

const ListHireJobs = () => {
  const [listHire, setListHire] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const fetchListHire = async () => {
    try {
      const res = await jobService.getListHireJobs();
      console.log(res.data.content);
      setListHire(res.data.content);
      if (res.data.content.length > 0) {
        setActiveJob(res.data.content[0]); // Set initial active job
      }
    } catch (error) {
      console.error("Error fetching list of hire jobs:", error);
    }
  };

  useEffect(() => {
    fetchListHire();
  }, []);

  const handleAfterChange = (current) => {
    const job = listHire[current];
    if (job && job.congViec) {
      const saoCongViec = Math.max(0, Math.min(job.congViec.saoCongViec, 5)); // Ensure saoCongViec is between 0 and 5
      setActiveJob({
        ...job,
        congViec: {
          ...job.congViec,
          saoCongViec,
        },
      });
    }
  };

  const handleViewClick = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
    setShowFullDescription(false); // Reset description view when opening modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formatDescription = (text) => {
    return text.replace(/\r\n/g, "<br/>");
  };

  const showDeleteConfirmation = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await jobService.deleteHireJob(selectedJob.id);
      setListHire(listHire.filter((job) => job.id !== selectedJob.id));
      handleCloseModal(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    setIsConfirmationModalVisible(false); // Close confirmation modal after deletion
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalVisible(false); // Close confirmation modal if deletion is canceled
  };


  
  return (
    <section className="pt-10 lg:pt-20 pb-10 lg:pb-20 bg-white relative">
      <div className="container mx-auto px-4">
        <h4 className="text-lg text-teal-700 font-bold">ListHireJobs</h4>
        <div className="relative flex">
          {/* Carousel Section */}
          <div className="w-1/5 h-[200px]">
            <Carousel
              dots={false}
              autoplay={true}
              slidesToShow={1}
              slidesToScroll={1}
              afterChange={handleAfterChange}
           
              className="carousel bg-neutral rounded-box"
              style={{ height: "200px" }} // Set fixed height
            >
              {listHire.length > 0 ? (
                listHire.map((job) => (
                  <div
                    key={job.id}
                    className="carousel-item flex justify-center"
                  >
                    <div className="bg-white rounded-tl-lg rounded-bl-lg overflow-hidden h-full w-full">
                      <img
                        src={job.congViec.hinhAnh}
                        alt={job.congViec.tenCongViec}
                        className="w-full h-[200px] object-cover rounded-tl-lg rounded-bl-lg"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  No jobs available for hire.
                </p>
              )}
            </Carousel>
          </div>
          {/* Details Section */}
          <div className="w-4/5 h-[200px] bg-white p-6 rounded-tr-lg rounded-br-lg shadow-md flex flex-col overflow-hidden">
            {activeJob ? (
              <>
                <h3 className="text-xl font-semibold mb-2 text-teal-900 truncate">
                  {activeJob.congViec.tenCongViec}
                </h3>
                <p className="text-sm text-gray-700 mb-2 truncate">
                  <span className="font-bold">Description:</span>{" "}
                  {activeJob.congViec.moTaNgan}
                </p>
                <p className="text-sm text-gray-700 mb-2 flex items-center">
                  {/* Filled stars */}
                  {Array(Math.min(activeJob.congViec.saoCongViec, 5))
                    .fill(0)
                    .map((_, index) => (
                      <FaStar key={index} className="text-teal-500" />
                    ))}
                  {/* Empty stars */}
                  {Array(
                    Math.max(0, 5 - Math.min(activeJob.congViec.saoCongViec, 5))
                  )
                    .fill(0)
                    .map((_, index) => (
                      <FaStar
                        key={
                          index + Math.min(activeJob.congViec.saoCongViec, 5)
                        }
                        className="text-gray-300"
                      />
                    ))}
                </p>
                <p className="text-sm text-gray-700 mb-2 truncate">
                  <span className="font-bold">Hire Date:</span>{" "}
                  {new Date(activeJob.ngayThue).toLocaleDateString("en-GB")}
                  <span
                    className={`ml-2 font-bold ${
                      activeJob.hoanThanh ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {activeJob.hoanThanh ? "Complete" : "Incomplete"}
                  </span>
                </p>
                <button
                  className="mt-auto w-[100px] bg-white text-teal-500 font-semibold py-1 px-3 border border-2 border-teal-500 rounded hover:bg-teal-500 transition-colors duration-200 text-teal-500 hover:text-white"
                  onClick={() => handleViewClick(activeJob)}
                >
                  View
                </button>
              </>
            ) : (
              <p className="text-gray-500">No job selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for displaying job details */}
      {selectedJob && (
        <Modal
          title="Job Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button
              className="bg-red-500 text-white hover:bg-red-800"
              key="delete"
              type="danger"
              onClick={showDeleteConfirmation}
            >
              Delete
            </Button>,
            <Button key="cancel" onClick={handleCloseModal}>
              Cancel
            </Button>,
          ]}
          width={600} // Adjusted width for a compact view
        >
          <div className="flex flex-col">
            <img
              src={selectedJob.congViec.hinhAnh}
              alt={selectedJob.congViec.tenCongViec}
              className="w-full h-[200px] object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              <span className="font-bold">Title:</span>{" "}
              {selectedJob.congViec.tenCongViec}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">Description:</span>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: showFullDescription
                    ? formatDescription(selectedJob.congViec.moTa)
                    : formatDescription(selectedJob.congViec.moTa).slice(
                        0,
                        100
                      ) + "...",
                }}
              />
              {selectedJob.congViec.moTa.length > 100 && (
                <button
                  onClick={toggleDescription}
                  className="text-teal-500 hover:underline ml-1"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Hire Date:</span>{" "}
              {new Date(selectedJob.ngayThue).toLocaleDateString("en-GB")}
              <span
                className={`ml-2 font-bold ${
                  selectedJob.hoanThanh ? "text-green-500" : "text-red-500"
                }`}
              >
                {selectedJob.hoanThanh ? "Complete" : "Incomplete"}
              </span>
            </p>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isConfirmationModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Confirm"
        cancelText="Cancel"
        closable={true}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>
    </section>
  );
};

export default ListHireJobs;
