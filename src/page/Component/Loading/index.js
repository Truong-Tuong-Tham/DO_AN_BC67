import React from "react";
import { useSelector } from "react-redux";

const LoadingPage = () => {
  let { isLoading } = useSelector((state) => state.loadingReducer);
  return (
    <div
      className={`bg-black w-screen h-screen fixed z-50 ${
        isLoading ? "" : "hidden"
      } `}
    >
      <div
        className="inset-0 bg-teal-600 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity"
        style={{ zIndex: 6000 }}
      >
        <div class="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
          <span class="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
