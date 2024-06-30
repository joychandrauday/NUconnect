import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import icon from "../../../assets/images/connections.png"

const SyllabusHomeSlider = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: subjects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subjects");
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <img src={icon} className=" w-1/5 " alt="" />
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching packages data</div>;
  }
  console.log(subjects);
  return (
    <div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {
          subjects.map((subject) =>{
            return (
              <div key={subject._id}>
                <img src={subject.icon} alt={subject.subjectName} />
                <h3>{subject.subjectName}</h3>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  );
};

export default SyllabusHomeSlider;
