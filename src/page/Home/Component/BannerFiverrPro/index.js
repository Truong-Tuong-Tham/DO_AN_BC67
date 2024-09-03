import React from "react";
import "./BannerFiverrPro.css";

const BannerFiverrPro = () => {
  return (
    <div className="relative h-[750px] bg-green-950 mt-10 w-[90%] lg:w-[1400px] m-auto overflow-hidden p-8 lg:p-16 rounded-3xl">
      <div className="max-width-container h-auto lg:h-[530px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <i>
              <div className="kjKdXDB">
                <svg
                  width={139}
                  height={34}
                  viewBox="0 0 139 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#fff">
                    {/* SVG paths here */}
                  </g>
                </svg>
              </div>
            </i>
            <h2 className="text-banner-title text-2xl lg:text-4xl">
              New e-Commerce
              <br />
              project management service
              <strong> made for your business</strong>
            </h2>
            <p className="text-banner-description mt-4 text-sm lg:text-base">
              An experienced e-Commerce project manager will plan, coordinate,
              and execute your project. Overseeing a team of e-Commerce experts,
              they'll handle everything from site building, design and content
              to optimization, marketing strategies, and UGC videos.
            </p>
            <p className="text-banner-highlight mt-4 text-sm lg:text-base">
              <strong>To get started, you should have:</strong>
            </p>
            <ul className="list-disc list-inside text-white mt-4 text-sm lg:text-base">
              <li>
                An e-Commerce project requiring expertise in various fields
              </li>
              <li>A budget exceeding $1000</li>
              <li>A desire to get things done, without the hassle</li>
            </ul>
            <div className="mt-4">
              <a
                className="text-white bg-orange-700 px-6 py-3 rounded hover:bg-orange-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href="https://pro.fiverr.com/cp/ecommerce-partner-lohp?source=LOHP_business_banner"
              >
                Get started
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d85c8f7113e7f18d6fca144840de5afa-1718619183018/X1.png"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              alt="eCommerce project management"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFiverrPro;
