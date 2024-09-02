import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const NotFound = () => (
  <div className="text-center mt-10">
    <h2 className="text-3xl font-bold">404 Not Found</h2>
    <p className="text-gray-600">The job you are looking for does not exist.</p>
  </div>
);

const ListJobs = () => {
  const { idjob } = useParams();
  const { menuJobs } = useSelector((state) => state.jobReducer);

  const idjobNumber = Number(idjob);
  const items = menuJobs.find((item) => item.id === idjobNumber);
  const navigate = useNavigate();
 const defaultimg="https://img.freepik.com/free-photo/3d-illustration-businessman-with-glasses-city-street-background_1142-51028.jpg?t=st=1725209969~exp=1725213569~hmac=b3c1cf30df1137796b36361c797f6be8ec1c6186681328d05e6d64867b8f32c9&w=740";
  const renderMenuJobs = () => {
    if (!items || !items.dsNhomChiTietLoai) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.dsNhomChiTietLoai.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-4"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover"
                src={group.hinhAnh || defaultimg}
                alt={group.tenNhom}
              />
            </div>
            <h2 className="text-lg text-pink-400 font-semibold text-center">{group.tenNhom}</h2>
            <ul className="list-disc pl-5 space-y-1">
              {group.dsChiTietLoai.map((detail) => (
                <li
                  onClick={() =>
                    navigate(`/detail/jobs/${items.id}/listjobs/${detail.id}`)
                  }
                  key={detail.id}
                  className="text-gray-700 cursor-pointer hover:text-green-600 transition-colors"
                >
                  {detail.tenChiTiet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  if (!items) {
    return <NotFound />;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">{items.tenLoaiCongViec}</h1>
        {renderMenuJobs()}
      </div>
    </div>
  );
};

export default ListJobs;
