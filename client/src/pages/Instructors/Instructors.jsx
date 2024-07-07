import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InstructorsSingleCard from './InstructorsSingleCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Instructors = () => {
  const axiosPublic = useAxiosPublic();
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axiosPublic.get('/instructors');
        setInstructors(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, [axiosPublic]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching instructors: {error.message}</div>;
  }

  // Custom Previous Arrow Component
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        className={`${className} bg-primary text-white rounded-full focus:outline-none z-10`}
        style={{ left: '-30px' }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-2 my-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    );
  };

  // Custom Next Arrow Component
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        className={`${className} bg-primary text-white rounded-full focus:outline-none z-10`}
        style={{ right: '-30px' }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-2 my-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToPrev = () => {
    slider.slickPrev();
  };

  const goToNext = () => {
    slider.slickNext();
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">All Instructors</h1>
      <div className="relative">
        <Slider ref={(slider) => setSlider(slider)} {...settings}>
          {instructors.map((instructor) => (
            <div key={instructor.id} className='p-6'>
              <InstructorsSingleCard instructor={instructor} />
            </div>
          ))}
        </Slider>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-primary text-white rounded-full p-2 shadow-md focus:outline-none"
          onClick={goToPrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-primary text-white rounded-full p-2 shadow-md focus:outline-none"
          onClick={goToNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Instructors;
