import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobService } from "../../../../services/jobService";

const FAQListJobsPage = () => {
  const { idtype } = useParams();
  const [jobs, setJobs] = useState([]);

  const fetchDetailTypeJobById = async () => {
    try {
      const res = await jobService.getDetailTypeJobByID(idtype);
      setJobs(res.data.content);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchDetailTypeJobById();
  }, [idtype]);

  // Check if jobs and tenChiTiet are defined before rendering
  const tenChiTiet = jobs.tenChiTiet || "Loading...";

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-4xl text-green-900  font-bold mb-8 text-center">{tenChiTiet} FAQs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-green-900 font-semibold mb-2">
              What are the differences between Java, C++, and Python?
            </h3>
            <p>
              C++ is the oldest of the three languages. It's often the first
              language programmers pick up as it's easy to learn. Java is
              simpler to use than C++ and it's a popular language for mobile and{" "}
              {tenChiTiet}. Python is a newer, more modern programming language
              with clear syntax and high readability. It is popularly used in
              data analytics, artificial intelligence, and machine learning
              applications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-green-900 font-semibold mb-2">
              Which frameworks are best for {tenChiTiet}?
            </h3>
            <p>
              Popular desktop application frameworks vary according to the
              operating system that the app is for. Some of the best native
              frameworks for Windows are Windows Presentation Foundation (WPF)
              and Universal Windows Platform (UWP). The best framework for macOS{" "}
              {tenChiTiet} is Cocoa, and if you want to develop cross-platform{" "}
              {tenChiTiet}, the best frameworks are Electron and Swing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-green-900 font-semibold mb-2">
              What should I consider when hiring a desktop application
              developer?
            </h3>
            <p>
              If you're thinking of hiring a desktop application developer, the
              first consideration should be their portfolio, followed by their
              experience and expertise in the platform you wish to build your
              application in. Other considerations include your budget, whether
              their timeline matches with your requirements, and how reliable
              and trustworthy they are.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-green-900 font-semibold mb-2">
              What are the best programming languages to develop {tenChiTiet}?
            </h3>
            <p>
              The best programming languages for {tenChiTiet} depend mostly on
              the operating system. The best language to use for individual
              operating systems is their own native application programming
              interface (API). For cross-platform programming, the most popular
              languages are C++, JavaScript, QT, C#, and Delphi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-green-900 font-semibold mb-2">
              What are some of the most common issues new software programmers
              encounter?
            </h3>
            <p>
              Some of the most common issues faced by new software programmers
              include problems with compilation, issues with debugging, and
              security threats. New programmers also often underestimate the
              time it will take to develop a complete program or don't plan the
              code in advance. Facing problems with your code? Hire a software
              developer to help you out.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl  text-green-900 font-semibold mb-2">
              What are the highest costs associated with developing {tenChiTiet}
              ?
            </h3>
            <p>
              Developing {tenChiTiet} can cost anywhere between $50,000 and
              $250,000 for custom work. Some of the highest costs associated
              with desktop application development include the size of the app
              (the bigger the size, the more the cost), the software complexity,
              the sophistication of the design, and software integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQListJobsPage;
