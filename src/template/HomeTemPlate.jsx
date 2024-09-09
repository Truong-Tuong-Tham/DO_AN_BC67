import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderPage from '../page/Component/HeaderPage';

const HomeTemPlate = () => {
  return (
    <div>
   
      <div className="sticky top-0 z-40">
        <HeaderPage />
      </div>
      <Outlet />
    </div>
  );
}

export default HomeTemPlate;
