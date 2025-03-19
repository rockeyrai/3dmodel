import { Effects } from "@react-three/drei";
import React from "react";
import CubeModle from "../hero/page";

const PortfolioHome = () => {
  return (
    <div className="">
      <div
        id="main"
        className=" relative w-screen h-screen overflow-hidden bg-black"
      >
      {/* <video
          className="max-h-screen max-w-screen bg-red-500 object-contain filter brightness-75 sepia-50 contrast-140 saturate-90"
          loop
          autoPlay
          muted
          playsInline
          src="/hero.mp4"
        /> */}
  
         <img className=" absolute bottom-10 right-15 w-[650px] h-[450px]" src="/herobull.png" /> 
        <CubeModle/>
      </div>
      <div id="about" className="w-screen h-screen bg-re"></div>
      <div id="features" className="w-screen h-screen"></div>
      <div id="offer" className="w-screen h-screen"></div>
      <div id="footer" className="w-screen h-screen"></div>
    </div>
  );
};

export default PortfolioHome;


//aceternity component :
// world map
// wavy background
// vortex
// typewriter Effects
// text hover Effect
// svg mark Effect
