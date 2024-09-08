import React from 'react';

const GuideArticles = () => {
  return (
    <section className="text-gray-200 body-font bg-green-900">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-green-800 rounded overflow-hidden">
            <div className="w-24 h-full bg-green-500" />
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-white font-medium title-font text-2xl mb-2 sm:mb-0">
              Freelancing Guides and Resources
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
              Explore our curated guides to help you succeed as a freelancer. From creating a strong profile to managing client relationships, we've got you covered with expert advice.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/25568845/pexels-photo-25568845/free-photo-of-dan-ong-c-p-v-ch-ng-dan-ba-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
            </div>
            <h2 className="text-xl font-medium title-font text-white mt-5">How to Build a Winning Freelancer Profile</h2>
            <p className="text-base leading-relaxed mt-2">
              Learn how to create a standout profile that attracts clients and showcases your skills in the best possible way.
            </p>
            <a className="text-green-400 inline-flex items-center mt-3">Read More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/4012966/pexels-photo-4012966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <h2 className="text-xl font-medium title-font text-white mt-5">Top Tips for Managing Freelance Projects</h2>
            <p className="text-base leading-relaxed mt-2">
              Discover effective strategies for managing your projects, meeting deadlines, and keeping your clients happy.
            </p>
            <a className="text-green-400 inline-flex items-center mt-3">Read More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img alt="content" className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/1463521/pexels-photo-1463521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <h2 className="text-xl font-medium title-font text-white mt-5">Pricing Your Freelance Services</h2>
            <p className="text-base leading-relaxed mt-2">
              Learn how to price your services competitively while ensuring that you're getting paid what you're worth.
            </p>
            <a className="text-green-400 inline-flex items-center mt-3">Read More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideArticles;
