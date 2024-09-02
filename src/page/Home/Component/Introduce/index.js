import React, { useRef } from "react";
import "./intro.css";

const Features = () => {
  // Create refs for each video element
  const videoRefs = useRef([]);

  // Handler to play video on hover
  const handleMouseEnter = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  // Handler to pause video on mouse leave
  const handleMouseLeave = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  // Video data
  const videoData = [
    {
      src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/648b6bdb802c1efb403e5be5_ZOOM2-transcode.mp4",
      title: "bodega x new balance",
      category: "fashion/retail",
      description: "the trail less taken",
    },
    {
      src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/640fe762f883d05b8f683c6d_HOKABODEGA-transcode.mp4",
      title: "bodega x hoka",
      category: "music video",
      description: "the world at large",
    },
    {
      src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/6363f65c00474db467bed81b_Screen%20Recording%202022-11-03%20at%2011018%20PM-transcode.mp4",
      title: "juno",
      category: "music video",
      description: "grandma cabbage",
    },
    {
      src: "https://assets-global.website-files.com/62d57921074baa1ce7275405/63c084f55da78823643adbc3_ThePerfectPants-transcode.mp4",
      title: "cala x public",
      category: "music video",
      description: "transportation the perfect pants",
    },
  ];

  return (
    <div className="relative flex w-[95%] min-h-screen flex-col mx-auto rounded-xl bg-green-950">
      <div className="min-h-28">
        <div className="mx-auto py-4">
          <h2 className="font-black text-9xl text-white uppercase">
            featured fiverr
          </h2>

          <div className="gap-6 mt-8 mx-4  md:flex">
            {videoData.slice(0, 2).map((video, index) => (
              <div
                key={index}
                className="md:w-1/2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="wrap-video ">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="object-cover rounded-3xl h-96 w-full bg-black"
                    loop
                    muted
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
                <span className="pt-4 grid grid-cols-6 gap-4">
                  <span className="col-start-1 col-end-3  font-bold text-lg text-white uppercase font-mono">
                    {video.title}
                  </span>
                  <span className="col-end-7 col-span-2 text-sm text-slate-500 uppercase font-mono flex justify-end">
                    {video.category}
                  </span>
                </span>
                <span className="block text-slate-400 text-xs uppercase font-mono">
                  {video.description}
                </span>
              </div>
            ))}
          </div>

          <div className="gap-6 mt-8 mx-4 md:flex">
            {videoData.slice(2).map((video, index) => (
              <div
                key={index + 2}
                className="md:w-1/2"
                onMouseEnter={() => handleMouseEnter(index + 2)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="wrap-video">
                  <video
                    ref={(el) => (videoRefs.current[index + 2] = el)}
                    className="object-cover h-96 w-full rounded-3xl bg-black"
                    loop
                    muted
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
                <span className="pt-4 grid grid-cols-6 gap-4">
                  <span className="col-start-1 col-end-3 font-bold text-lg text-white uppercase font-mono">
                    {video.title}
                  </span>
                  <span className="col-end-7 col-span-2 text-sm text-slate-500 uppercase font-mono flex justify-end">
                    {video.category}
                  </span>
                </span>
                <span className="block text-slate-400 text-xs uppercase font-mono">
                  {video.description}
                </span>
              </div>
            ))}
          </div>
          <h2 className="font-black text-7xl text-white text-center uppercase my-16 hover:bg-white hover:text-black hover:rounded-full hover:px-6">
            view select work
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Features;
