import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import {
  Card,
  Typography,
  Pagination,
  Modal,
  Input,
  Button,
  Select,
} from "antd";
import "antd/dist/reset.css";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const JobTypeManagement = () => {
  const { iduser } = useParams();
  const [detailTypes, setDetailTypes] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  // State for pagination
  const [currentDetailPage, setCurrentDetailPage] = useState(1);
  const detailPageSize = 6;

  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const categoryPageSize = 6;

  // State for modals
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [newJobCategory, setNewJobCategory] = useState("");
  const [newDetailTypeName, setNewDetailTypeName] = useState("");
  const [newDetailTypeTitle, setNewDetailTypeTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedDetailTypeId, setSelectedDetailTypeId] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  useEffect(() => {
    const fetchDetailTypes = async () => {
      try {
        const response = await jobService.getDetailTypeJob();
        setDetailTypes(response.data?.content || []);
      } catch (error) {
        console.error("Error fetching detail types:", error);
      }
    };
    console.log("aa",detailTypes);

    const fetchJobCategories = async () => {
      try {
        const response = await jobService.getTypeJob();
        setJobCategories(response.data?.content || []);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchDetailTypes();
    fetchJobCategories();
  }, []);

  const currentDetailTypes = detailTypes.slice(
    (currentDetailPage - 1) * detailPageSize,
    currentDetailPage * detailPageSize
  );

  const currentJobCategories = jobCategories.slice(
    (currentCategoryPage - 1) * categoryPageSize,
    currentCategoryPage * categoryPageSize
  );

  const handleDetailPageChange = (page) => {
    setCurrentDetailPage(page);
  };

  const handleCategoryPageChange = (page) => {
    setCurrentCategoryPage(page);
  };

  const handleAddCategoryClick = () => {
    setIsCategoryModalVisible(true);
  };

  const handleAddDetailClick = () => {
    setIsDetailModalVisible(true);
  };

  const handleCategoryModalOk = async () => {
    if (newJobCategory.trim()) {
      try {
        await jobService.postTypeJob({
          tenLoaiCongViec: newJobCategory,
        });
        const response = await jobService.getTypeJob();
        setJobCategories(response.data?.content || []);
        setIsCategoryModalVisible(false);
        setNewJobCategory("");
      } catch (error) {
        console.error("Error adding job category:", error);
      }
    }
  };

  const handleDetailModalOk = async () => {
    if (newDetailTypeName.trim() && selectedCategoryId) {
      try {
        const payload = {
          id: 0,
          tenChiTiet: newDetailTypeName,
          maLoaiCongViec: parseInt(selectedCategoryId, 10),
          danhSachChiTiet: [],
        };

        await jobService.postDetailTypeJobByGroup(payload);
        const response = await jobService.getDetailTypeJob();
        console.log(response);
        setDetailTypes(response.data?.content || []);
        setIsDetailModalVisible(false);
        setNewDetailTypeName("");
        setSelectedCategoryId(null);
      } catch (error) {
        console.error("Error adding detail type:", error);
      }
    }
  };

  const handleImageModalOk = async () => {
    if (selectedDetailTypeId && newImageFile) {
      try {
        const formData = new FormData();
        formData.append("Formfile", newImageFile, newImageFile.name);
        console.log(newImageFile);
        await jobService.uploadPictureDetailType(
          selectedDetailTypeId,
          formData
        );

        const response = await jobService.getDetailTypeJob();
        setDetailTypes(response.data?.content || []);

        setIsImageModalVisible(false);
        setNewImageFile(null);
        setSelectedDetailTypeId(null);
      } catch (error) {
        console.error("Error uploading image:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        }
      }
    } else {
      console.error("No file selected or no detail type ID provided");
    }
  };
  const handleEditModalOke = async () => {
    if (selectedDetailTypeId && newDetailTypeTitle.trim()) {
      try {
        // Create the object to match the expected format
        const detailTypeToUpdate = {
          id: selectedDetailTypeId,
          tenChiTiet: newDetailTypeTitle,
          maLoaiCongViec:
          
            detailTypes.find((type) => type.id == selectedDetailTypeId)
              ?.maLoaiCongviec || null,
          danhSachChiTiet: [], // You can modify this if needed
        };

        await jobService.putDetailTypeJob(
          detailTypeToUpdate,
          selectedDetailTypeId
        );

        // Fetch the updated list of detail types
        const response = await jobService.getDetailTypeJob();
        setDetailTypes(response.data?.content || []);

        // Close the modal and reset the state
        setIsEditModalVisible(false);
        setNewDetailTypeTitle("");
        setSelectedDetailTypeId(null);
      } catch (error) {
        console.error("Error updating detail type:", error);
      }
    }
  };

  const handleDeleteDetailType = (detailTypeId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this detail type?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await jobService.deleteDetailType(detailTypeId);
          const response = await jobService.getDetailTypeJob();
          setDetailTypes(response.data?.content || []);
        } catch (error) {
          console.error("Error deleting detail type:", error);
        }
      },
    });
  };

  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setIsCategoryModalVisible(false);
    setIsDetailModalVisible(false);
    setIsImageModalVisible(false);
    setNewDetailTypeTitle(""); // Reset title state
    setSelectedDetailTypeId(null); // Reset selected ID state
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };
  const handleEditClick = (detailTypeId, detailTypeTitle) => {
    setSelectedDetailTypeId(detailTypeId);
    setNewDetailTypeTitle(detailTypeTitle);
    setIsEditModalVisible(true);
  };

  const showUpdateImageModal = (detailTypeId) => {
    setSelectedDetailTypeId(detailTypeId);
    setIsImageModalVisible(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Job Type Details Section */}
      <div className="mb-12">
        <h1 className="text-teal-600 text-3xl text-center mb-6">
          Job Type Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentDetailTypes.map((type) => (
            <Card
              key={type.id}
              className="shadow-lg rounded-lg flex flex-col relative"
            >
              <div
                className="absolute top-2 right-2 bg-teal-600 hover:bg-teal-700 p-2 rounded-full cursor-pointer"
                onClick={() => showUpdateImageModal(type.id)}
              >
                <PlusOutlined className="text-white " />
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-full h-40 bg-cover bg-center border border-teal-600 border-2 rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      type.hinhAnh || "placeholder-image-url"
                    })`,
                  }}
                ></div>
                <div className="mt-4 text-center px-4">
                  <Title level={4} className="text-blue-600">
                    {type.tenNhom}{" "}
                    <span
                      onClick={() => handleEditClick(type.id, type.tenNhom)}
                      className="ml-1 cursor-pointer text-gray-600 text-sm"
                    >
                      <EditOutlined />
                    </span>
                  </Title>
                  <Text className="text-green-600">
                    <strong>Details:</strong>
                  </Text>
                  {type.dsChiTietLoai.map((detail) => (
                    <Text key={detail.id} className="block text-gray-600">
                      - {detail.tenChiTiet}
                    </Text>
                  ))}
                </div>
                <div
                  className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full cursor-pointer"
                  onClick={() => handleDeleteDetailType(type.id)}
                >
                  <DeleteOutlined className="text-white" />
                </div>
              </div>
            </Card>
          ))}
          {/* Add New Detail Button */}
          <div
            className="relative flex items-center justify-center bg-gray-200 shadow-lg rounded-lg cursor-pointer transform transition-transform hover:scale-105"
            style={{ aspectRatio: "1 / 1" }}
            onClick={handleAddDetailClick}
          >
            <span className="text-4xl text-gray-600 font-semibold">+</span>
          </div>
        </div>
        <Pagination
          current={currentDetailPage}
          pageSize={detailPageSize}
          total={detailTypes.length}
          onChange={handleDetailPageChange}
          className="mt-6"
        />
      </div>

      {/* Job Categories Section */}
      <div>
        <h2 className="text-teal-600 text-3xl text-center mb-6">
          Job Categories
        </h2>
        <div className="flex flex-col min-h-screen p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {currentJobCategories.map((category) => (
              <div
                key={category.id}
                className="relative flex items-center justify-center bg-cover bg-center text-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                style={{
                  aspectRatio: "1 / 1",
                  backgroundImage: `url('https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')`,
                }}
              >
                <div className="text-center">
                  <Title level={4}>{category.tenLoaiCongViec}</Title>
                </div>
              </div>
            ))}
            <div
              className="relative flex items-center justify-center bg-gray-200 shadow-lg rounded-lg cursor-pointer transform transition-transform hover:scale-105"
              style={{ aspectRatio: "1 / 1" }}
              onClick={handleAddCategoryClick}
            >
              <span className="text-4xl text-gray-600 font-semibold">+</span>
            </div>
          </div>
          <Pagination
            current={currentCategoryPage}
            pageSize={categoryPageSize}
            total={jobCategories.length}
            onChange={handleCategoryPageChange}
            className="mt-6"
          />
        </div>
      </div>

      {/* Add Job Category Modal */}
      <Modal
        title="Add Job Category"
        visible={isCategoryModalVisible}
        onOk={handleCategoryModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          value={newJobCategory}
          onChange={(e) => setNewJobCategory(e.target.value)}
          placeholder="Enter job category name"
        />
      </Modal>

      {/* Add Detail Type Modal */}
      <Modal
        title="Add Detail Type"
        visible={isDetailModalVisible}
        onOk={handleDetailModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          value={newDetailTypeName}
          onChange={(e) => setNewDetailTypeName(e.target.value)}
          placeholder="Enter detail type name"
        />
        <Select
          value={selectedCategoryId}
          onChange={(value) => setSelectedCategoryId(value)}
          placeholder="Select job category"
          className="mt-4 w-full"
        >
          {jobCategories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.tenLoaiCongViec}
            </Option>
          ))}
        </Select>
      </Modal>

      {/* Upload Image Modal */}
      <Modal
        title="Upload Image for Detail Type"
        visible={isImageModalVisible}
        onOk={handleImageModalOk}
        onCancel={handleModalCancel}
      >
        <input type="file" onChange={handleImageChange} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Detail Type"
        visible={isEditModalVisible}
        onOk={handleEditModalOke}
        onCancel={handleModalCancel}
      >
        <Input
          value={newDetailTypeTitle}
          onChange={(e) => setNewDetailTypeTitle(e.target.value)}
          placeholder="Enter detail type title"
        />
      </Modal>
    </div>
  );
};

export default JobTypeManagement;
