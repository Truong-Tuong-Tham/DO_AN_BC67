import React from 'react';

const ActivityLog = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-xl mt-2 p-3">
      <h4 className="text-lg text-gray-900 font-bold">Activity Log</h4>
      <div className="relative px-2">
        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">Profile updated with new skills.</p>
            <p className="text-[10px] text-gray-500">5 minutes ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              New review received from <a href="#" className="text-teal-600 font-bold">Alex Johnson</a>.
            </p>
            <p className="text-[10px] text-gray-500">10 minutes ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              Order <a href="#" className="text-teal-600 font-bold">#7890</a> completed successfully.
            </p>
            <p className="text-[10px] text-gray-500">30 minutes ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              New message received from <a href="#" className="text-teal-600 font-bold">Samantha Lee</a>.
            </p>
            <p className="text-[10px] text-gray-500">1 hour ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              New gig posted: <a href="#" className="text-teal-600 font-bold">Design a Logo</a>.
            </p>
            <p className="text-[10px] text-gray-500">2 hours ago</p>
          </div>
        </div>
        {/* End::Timeline item */}

        {/* Start::Timeline item */}
        <div className="flex items-center w-full my-2 -ml-1">
          <div className="w-1/12 z-10">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-11/12">
            <p className="text-xs">
              Proposal sent for <a href="#" className="text-teal-600 font-bold">Website Redesign</a>.
            </p>
            <p className="text-[10px] text-gray-500">3 hours ago</p>
          </div>
        </div>
        {/* End::Timeline item */}
      </div>
    </div>
  );
};

export default ActivityLog;
