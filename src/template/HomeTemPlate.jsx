import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderPage from '../page/Component/HeaderPage';
import BackToTop from '../page/Component/BackToTop';
import ListTypeJobsDetail from '../page/DetailJob/Component/ListType';


const HomeTemPlate = () => {
  return (
    <div>
   
      <div className="sticky top-0 bg-white z-40">
  
        <HeaderPage />
        <ListTypeJobsDetail className="w-full sticky top-0 z bg-white" />
        <BackToTop/>
      </div>
      
      <Outlet />
    </div>
  );
}

export default HomeTemPlate; 
