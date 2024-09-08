import React from "react";
import { format } from "date-fns";
const Inf = ({ info }) => {
  // Ensure info and its properties are defined
  const safeInfo = info || {};

  return (
    <div className="my-3 flex flex-col w-full 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
  <div className="w-full flex flex-col 2xl:w-1/3">
    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
      <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex flex-col md:flex-row border-y py-2">
          <span className="font-bold w-full md:w-1/3 lg:w-1/4">Full name:</span>
          <span className="text-gray-700">{safeInfo.name || "N/A"}</span>
        </li>
        <li className="flex flex-col md:flex-row border-b py-2">
          <span className="font-bold w-full md:w-1/3 lg:w-1/4">Birthday:</span>
          <span className="text-gray-700">
            {safeInfo.birthday
              ? format(new Date(safeInfo.birthday), "dd-MM-yyyy")
              : "N/A"}
          </span>
        </li>
        <li className="flex flex-col md:flex-row border-b py-2">
          <span className="font-bold w-full md:w-1/3 lg:w-1/4">Mobile:</span>
          <span className="text-gray-700">{safeInfo.phone || "N/A"}</span>
        </li>
        <li className="flex flex-col md:flex-row border-b py-2">
          <span className="font-bold w-full md:w-1/3 lg:w-1/4">Email:</span>
          <span className="text-gray-700">{safeInfo.email || "N/A"}</span>
        </li>
        <li className="flex flex-col md:flex-row border-b py-2">
          <span className="font-bold w-full md:w-1/3 lg:w-1/4">Location:</span>
          <span className="text-gray-700">An giang, VN</span>
        </li>
        <li className="flex flex-col md:flex-row border-b py-2">
          <span className="font-bold w-full md:w-1/3 lg:w-1/4">Languages:</span>
          <span className="text-gray-700">Vietnamese, English</span>
        </li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default Inf;
