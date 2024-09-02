import React from "react";

import Banner from "./Component/Banner";
import ListTypeJobs from "./Component/ListTypeJobs";

import Video from "./Component/Video";
import BannerFiverrPro from "./Component/BannerFiverrPro";
import CarouselVideo from "./Component/CarouselVideo";
import BannerLogoMaker from "./Component/BannerLogoMaker";
import ProductGallery from "./Component/ProductGallery";
import BannerStartUp from "./Component/BannerStartUp";
import Features from "./Component/Introduce";

const HomePage = () => {
  return (
    <div className="w-full" >
      <Banner />
      <ListTypeJobs  />
      <Features/>
      <Video/>
      <BannerFiverrPro/>
     
      <CarouselVideo/>
      <BannerStartUp/>
      <BannerLogoMaker/>
      <ProductGallery/>
    </div>
  );
};

export default HomePage;
