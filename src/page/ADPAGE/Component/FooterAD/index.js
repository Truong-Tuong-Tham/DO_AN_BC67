import React from 'react';

const FooterAD = () => {
  return (
    <footer className="bg-gray-100">
    <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="text-center lg:text-left">
          <div className="text-4xl font-semibold text-teal-800">Fiverr</div>
          <p className="mt-4 max-w-md mx-auto text-gray-700 leading-relaxed lg:mx-0">
            Manage and oversee the administration of your system efficiently with our tools and resources.
          </p>
        </div>
  
        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
          <li>
            <a className="text-teal-800 transition hover:text-teal-600" href="#">Dashboard</a>
          </li>
          <li>
            <a className="text-teal-800 transition hover:text-teal-600" href="#">User Management</a>
          </li>
          <li>
            <a className="text-teal-800 transition hover:text-teal-600" href="#">Settings</a>
          </li>
          <li>
            <a className="text-teal-800 transition hover:text-teal-600" href="#">Reports</a>
          </li>
          <li>
            <a className="text-teal-800 transition hover:text-teal-600" href="#">Help</a>
          </li>
        </ul>
      </div>
  
      <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
        Copyright &copy; 2024. All rights reserved.
      </p>
    </div>
  </footer>
  
  );
};

export default FooterAD;
