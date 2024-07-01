import React from "react";
import logoImg from "../../../assets/images/logo.png";
import nulogo from "../../../assets/images/download.png";
import icon from "../../../assets/images/connections.png";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
const HomeBanner = () => {
  return (
    <div>
      <div className="min-h-[90vh] bg-primary flex justify-center items-center gap-6"
      >
        <img src={icon} className="absolute right-0 opacity-10 z-[0] w-1/5 top-10" alt="" />
        <img src={nulogo} className="z-10" alt="" />
        <div className="text-left">
          <h1 className="text-5xl font-bold flex items-center text-white">
            Welcome to
            <span className="font-bold text-primary px-2 bg-white ml-2">
              NU<span className="span text-neutralop">.connect</span>
            </span>
          </h1>
          <h1 className="text-2xl mt-3 text-secondary">
            One stop sollution for{" "}
            <span className="ml-2 text-[#fff000]">
              <Typewriter
                words={["Full Syllabus", "Online Course", "Exam Notice", "Suggestions"]}
                loop={5}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <div className="flex items-center justify-between mt-5 w-3/5">
                <Link to={'/syllabus'} className="btn border-none rounded-none hover:bg-accent hover:text-black bg-[#0058b1] shadow-md mr-3 shadow-black text-white">
                    NU All Syllabus
                </Link>
                <Link to={'/courses'} className="btn border-none rounded-none hover:bg-accent hover:text-black bg-[#0058b1] shadow-md mr-3 shadow-black text-white">
                    Academic Courses
                </Link>
                <Link to={'/notice'} className="btn border-none rounded-none hover:bg-accent hover:text-black bg-[#0058b1] shadow-md mr-3 shadow-black text-white">
                    All Notice
                </Link>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
