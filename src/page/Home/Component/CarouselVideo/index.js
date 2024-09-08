import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const videoData = [
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi",
    title: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder",
    quote:
      "We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world. The level of service and professionalism we received exceeded our expectations. Fiverr's platform allowed us to connect with talented freelancers who understood our vision and executed it flawlessly. We couldn’t have achieved our goals without their support.",
  },
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw",
    title: "Sarah Michaels, Project Manager",
    quote:
      "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working. This global reach allows us to operate round-the-clock and stay ahead of the competition. The quality of work and the diversity of skills available are unparalleled, making it a go-to platform for all our project needs.",
  },
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun",
    title: "Duke De Laet, Founder & CEO",
    quote:
      "Fiverr provided us with exceptional support and top-notch services to enhance our business growth. The ability to find specialized skills on demand was a game-changer for us. From creative design to technical expertise, the freelancers we worked with delivered high-quality results that significantly impacted our brand's success. The flexibility and efficiency of Fiverr’s platform have become integral to our operations.",
  },
  {
    src: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg",
    videoSrc:
      "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl",
    title: "Caitlin Tormey, Chief Commercial Officer",
    quote:
      "Fiverr has been instrumental in our growth. Their diverse talent pool has allowed us to scale quickly and efficiently, without compromising on quality. The platform has been a vital resource for our marketing campaigns, providing us with creative professionals who bring fresh ideas and innovative strategies. Thanks to Fiverr, we’ve been able to execute our projects with precision and achieve remarkable results.",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videoData.length) % videoData.length
    );
  };

  return (
    <div className="relative font-inter  antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Carousel Body */}
            <div className="relative flex flex-col md:flex-row bg-green-950 shadow-lg rounded-lg overflow-hidden w-full">
              <div className="relative w-full md:w-2/5 flex items-center justify-center">
                <img
                  src={videoData[currentIndex].src}
                  alt={`Thumbnail ${currentIndex}`}
                  className="w-full h-48 md:h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => setModalOpen(true)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-white text-3xl md:text-4xl bg-green-950 p-4 rounded-full shadow-lg"
                    aria-label="Play video"
                  >
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 md:w-3/5 h-full">
                <div>
                  <h2 className="text-4xl text-white font-semibold mb-4">
                    {videoData[currentIndex].title}
                  </h2>
                  <p className="text-white">{videoData[currentIndex].quote}</p>
                </div>
                <div className="flex mt-4">
                  <button
                    onClick={prevSlide}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Next
                  </button> 
                </div>
              </div>
            </div>

            {/* Modal Video */}
            {modalOpen && (
              <>
                <div
                  className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity"
                  onClick={() => setModalOpen(false)}
                  aria-hidden="true"
                ></div>
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                >
                  <div
                    className="relative bg-black rounded-lg overflow-hidden"
                    style={{
                      width: "80%",
                      maxWidth: "960px",
                      height: "80%",
                      maxHeight: "540px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 text-white text-2xl"
                      onClick={() => setModalOpen(false)}
                      aria-label="Close modal"
                    >
                      &times;
                    </button>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      onClick={() => setModalOpen(false)}
                    >
                      <source
                        src={videoData[currentIndex].videoSrc}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestimonialCarousel;
