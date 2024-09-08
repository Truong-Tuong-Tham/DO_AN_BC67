import React from "react";

import Banner from "./Component/Banner";
import ListTypeJobs from "./Component/ListTypeJobs";

import Video from "./Component/Video";
import BannerFiverrPro from "./Component/BannerFiverrPro";

import BannerLogoMaker from "./Component/BannerLogoMaker";
import ProductGallery from "./Component/ProductGallery";

import Features from "./Component/Introduce";
import TestimonialCarousel from "./Component/CarouselVideo";
import Footer from "../Component/Footer";

const HomePage = () => {
  return (
    <div className="w-full mx-auto" >
      <Banner />
      <ListTypeJobs  />
      <Features/>
      <Video/>
      <BannerFiverrPro/>
      <TestimonialCarousel/>
       <BannerLogoMaker/>
      <ProductGallery/>
      <Footer/>
    </div>
  );
};

export default HomePage;
