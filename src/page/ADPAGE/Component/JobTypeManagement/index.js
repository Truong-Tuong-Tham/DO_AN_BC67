import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";
import { Card, Typography, Pagination, List } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are applied

const { Title, Text } = Typography;

const JobTypeManagement = () => {
  const { iduser } = useParams();
  const [detailTypes, setDetailTypes] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);

  // State for pagination
  const [currentDetailPage, setCurrentDetailPage] = useState(1);
  const detailPageSize = 6;

  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const categoryPageSize = 6;

  useEffect(() => {
    const fetchDetailTypes = async () => {
      try {
        const response = await jobService.getDetailTypeJob();
        setDetailTypes(response.data?.content || []);
      } catch (error) {
        console.error("Error fetching detail types:", error);
      }
    };

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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-12">
        <Title level={2} className="text-blue-600 mb-6">
          Job Type Details
        </Title>
        <div className="flex flex-col min-h-screen">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              current: currentDetailPage,
              pageSize: detailPageSize,
              total: detailTypes.length,
              onChange: handleDetailPageChange,
            }}
            dataSource={currentDetailTypes}
            renderItem={(type) => (
              <List.Item>
                <Card className="shadow-lg rounded-lg flex flex-col">
                  <div className="flex items-center">
                    <div
                      className="h-24 w-24 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${type.hinhAnh})` }}
                    ></div>
                    <div className="ml-4">
                      <Title level={4} className="text-blue-600">
                        {type.tenNhom}
                      </Title>
                      <Text className="text-gray-600">
                        <strong>Details:</strong>
                      </Text>
                      {type.dsChiTietLoai.map((detail) => (
                        <Text key={detail.id} className="block text-gray-600">
                          - {detail.tenChiTiet}
                        </Text>
                      ))}
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>

      <div>
        <Title level={2} className="text-blue-600 mb-6">
          Job Categories
        </Title>
        <div className="flex flex-col min-h-screen">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              current: currentCategoryPage,
              pageSize: categoryPageSize,
              total: jobCategories.length,
              onChange: handleCategoryPageChange,
            }}
            dataSource={currentJobCategories}
            renderItem={(category) => (
              <List.Item>
                <Card className="shadow-lg rounded-lg flex flex-col bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 p-4">
                  <Title level={4} className="text-white">
                    {category.tenLoaiCongViec}
                  </Title>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default JobTypeManagement;
