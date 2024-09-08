import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Collapse } from "antd";
import { jobService } from "../../../../services/jobService";
import Comment from "./component/Comment";

const { Panel } = Collapse;

const DesJobAndPay = () => {
  const [ListHireJob, setListHireJob] = useState();
  console.log("ListHireJob", ListHireJob);
  const { listJobs } = useSelector((state) => state.jobReducer);
  console.log("listJobs", listJobs);
  const { idtype, idjob } = useParams();
  console.log("idtype, idjob", idtype, idjob);
  const { infoUser } = useSelector((state) => state.userReducer);
  console.log("infoUser", infoUser);
  const navigate = useNavigate();
  const fetchListHireJobs = async () => {
    try {
      const res = await jobService.getListHireJobs(idtype);
      setListHireJob(res.data.content);
      console.log("jobs", res.data.content);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchListHireJobs();
  }, []);
  const handleHireClick = async () => {
    if (!infoUser) {
      navigate("/auth/login");
      return;
    }

    if (!ListHireJob) {
      console.error("ListHireJob is empty or undefined");
      return;
    }

    const jobAlreadyHired = ListHireJob.some(
      (job) => job.congViec.id === jobType.id
    );

    if (jobAlreadyHired) {
      alert("This job has already been hired.");
      return;
    }

    const currentDate = new Date().toISOString(); // Getting the current date in ISO format
    const hireJobData = {
      maCongViec: jobType.id,
      maNguoiThue: infoUser.user.id,
      ngayThue: currentDate,
      hoanThanh: false,
    };

    try {
      const response = await jobService.postHireJob(hireJobData);
      console.log("Hire action successful:", response);
      // Optionally, you might want to update the list or show a success message to the user
      fetchListHireJobs();
    } catch (error) {
      console.error("Hire action failed:", error);
    }
  };

  // Find the job type by idtype
  const jobType = listJobs.find((job) => job.id === parseInt(idtype, 10));

  if (!jobType) return <div className="p-4 text-red-500">Job not found</div>;
  console.log("jobtype", jobType);
  const { congViec, tenNguoiTao, avatar } = jobType;
  const {
    saoCongViec,
    danhGia,
    hinhAnh,
    moTa,
    tenCongViec,
    moTaNgan,
    giaTien,
  } = congViec;

  // Split the short description at line breaks and add a bullet point at the start of each line

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white w-full md:w-3/5 shadow-lg rounded-lg overflow-hidden flex flex-col">
        {/* Card Content */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
          <img
            src={hinhAnh}
            alt="Sustainable Practices for a Greener Future"
            className="w-full h-64 object-cover rounded-t-lg"
            loading="lazy"
          />
          <h2 className="text-2xl font-semibold text-green-900 mt-4 mb-2">
            {tenCongViec}
          </h2>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-green-600 mb-4">
              Description
            </h4>
            <p className="text-gray-700">{moTa}</p>
            <div className="flex flex-col space-y-4  animated fadeIn faster   flex justify-center items-center inset-0 outline-none focus:outline-none ">

</div>

          </div>
      

        </div>

    {/* Container for both sections */}
<div className="flex flex-col md:flex-row gap-6 mx-auto p-4 max-w-7xl">
  {/* Profile Info */}
  <div className="flex-1 max-w-xs md:max-w-sm mt-10 mb-4">
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      {/* Centering the avatar */}
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={avatar}
            alt={tenNguoiTao}
            className="shadow-md rounded-full border-none max-w-[80px] mt-[-3rem]"
          />
        </div>
      </div>
      <div className="text-center mt-12">
        <div className="flex justify-center space-x-3">
          <div className="p-1 text-center">
            <span className="text-sm font-semibold block uppercase tracking-wide text-slate-700">
              3,360
            </span>
            <span className="text-xs text-slate-400">Jobs</span>
          </div>
          <div className="p-1 text-center">
            <span className="text-sm font-semibold block uppercase tracking-wide text-slate-700">
              2,454
            </span>
            <span className="text-xs text-slate-400">Followers</span>
          </div>
          <div className="p-1 text-center">
            <span className="text-sm font-semibold block uppercase tracking-wide text-slate-700">
              564
            </span>
            <span className="text-xs text-slate-400">Following</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <h3 className="text-lg text-green-600 cursor-pointer font-bold leading-tight mb-1">
          {tenNguoiTao}
        </h3>
        <div className="text-xs mt-0 mb-1 text-slate-400 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-1 text-slate-400 opacity-75"></i>
          City, VN
        </div>
      </div>
      <div className="mt-6 py-3 border-t border-slate-200 text-center">
        <p className="font-light leading-relaxed text-slate-600 mb-2 text-sm">
          A versatile and talented individual with a broad range of skills, this person has made a significant impact in their field. With a dedication to their craft, they continue to inspire and engage through their work, showcasing a unique blend of creativity and expertise.
        </p>
        <a
          href="javascript:;"
          className="font-normal text-green-600 hover:text-slate-400 text-sm"
        >
          Follow Account
        </a>
      </div>
    </div>
  </div>

  {/* FAQ Section */}
  <div className="flex-1 container mx-auto p-6 max-w-2xl">
  <h1 className="text-3xl text-green-600 font-bold mb-6 border-b-2 border-green-200 pb-2">
    Frequently Asked Questions (FAQ)
  </h1>
  <Collapse defaultActiveKey={["1"]} className="space-y-4">
    <Panel
      header="Question 1: How do I apply for a job?"
      key="1"
      className="bg-gray-100 rounded-lg shadow-md"
    >
      <p className="text-gray-700 text-base p-4">
        To apply for a job, click on the job listing and select the "Apply Now" button. You will be prompted to submit your resume and cover letter or fill out the application form provided.
      </p>
    </Panel>
    <Panel
      header="Question 2: How can I create a job listing?"
      key="2"
      className="bg-gray-100 rounded-lg shadow-md"
    >
      <p className="text-gray-700 text-base p-4">
        To create a job listing, log in to your employer account and navigate to the "Post a Job" section. Fill out the required details about the job position and submit the listing for review.
      </p>
    </Panel>
    <Panel
      header="Question 3: How do I track my job application status?"
      key="3"
      className="bg-gray-100 rounded-lg shadow-md"
    >
      <p className="text-gray-700 text-base p-4">
        You can track your job application status by logging into your account and visiting the "My Applications" section. Here, you can see updates on the progress of your applications.
      </p>
    </Panel>
    <Panel
      header="Question 4: What should I do if I forget my password?"
      key="4"
      className="bg-gray-100 rounded-lg shadow-md"
    >
      <p className="text-gray-700 text-base p-4">
        If you forget your password, click on the "Forgot Password" link on the login page. Follow the instructions to reset your password using the email address associated with your account.
      </p>
    </Panel>
    <Panel
      header="Question 5: How can I update my profile information?"
      key="5"
      className="bg-gray-100 rounded-lg shadow-md"
    >
      <p className="text-gray-700 text-base p-4">
        To update your profile information, log in to your account and go to the "Profile" section. Here, you can edit your personal details, upload new documents, and make other changes as needed.
      </p>
    </Panel>
    <Panel
      header="Question 6: How can I contact support if I have more questions?"
      key="6"
      className="bg-gray-100 rounded-lg shadow-md"
    >
      <p className="text-gray-700 text-base p-4">
        If you have additional questions or need further assistance, you can contact our support team through the "Contact Us" page or email us at support@example.com. We’re here to help!
      </p>
    </Panel>
  </Collapse>
</div>


</div>


        <Comment idtype={idtype} />
      </div>

      <div className="w-full md:w-2/5 p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center sticky z-10 top-0 items-center min-h-screen bg-cover bg-center bg-[url('https://images.pexels.com/photos/2215534/pexels-photo-2215534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
          <div className="max-w-lg mx-auto p-6">
            <div className="relative flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-xl shadow-lg p-8">
              <div className="relative pb-6 mb-6 border-b border-gray-600">
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Cum Laude
                </p>
                <h1 className="mt-3 text-3xl font-bold text-white flex flex-col items-center">
                  <span className="text-6xl">${giaTien}</span>
                  <span className="text-xl text-gray-300">per job</span>
                </h1>
              </div>
              <div className="p-0">
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  {moTaNgan
                    .split(".")
                    .filter((item) => item.trim() !== "")
                    .map((item, index) => (
                      <li key={index} className="text-base">
                        {item.trim()}.
                      </li>
                    ))}
                </ul>
              </div>
              <div className="p-0 mt-8">
                {ListHireJob &&
                ListHireJob.some((job) => job.congViec.id === jobType.id) ? (
                  <button
                    disabled
                    className="w-full py-3 text-lg text-gray-500 bg-gray-300 rounded-lg shadow-md cursor-not-allowed"
                    type="button"
                  >
                    <i className="fas fa-check mr-2"></i> Already Hired
                  </button>
                ) : (
                  <button
                    onClick={handleHireClick}
                    className="w-full py-3 text-lg text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 transition-transform transform hover:scale-105"
                    type="button"
                  >
                    <i className="fas fa-arrow-right mr-2"></i> Continue ($
                    {giaTien})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesJobAndPay;