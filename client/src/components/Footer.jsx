import React from "react";



const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
       Send money accrosss many addressess
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">Fast</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Reliable</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Secure</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">scalability</p>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Come and make transactions with few gas</p>
     
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    
  </div>
);

export default Footer;
