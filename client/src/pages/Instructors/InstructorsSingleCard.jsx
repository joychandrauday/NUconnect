import React from "react";
import { Link } from "react-router-dom";

const InstructorsSingleCard = ({ instructor }) => {
  const { name, profilePicture, rating, department, experience, bio, id } =
    instructor;

  return (
    <div className="bg-primary text-white rounded shadow-md overflow-hidden relative">
      <Link to={`/instructor/${id}`}>
        <img
          src={profilePicture}
          alt={name}
          className="w-full h-64 object-cover object-center"
        />
        <span className="badge absolute top-2 right-0 badge-primary font-bold capitalize text-white rounded-none shadow-sm text-md">
          {department}
        </span>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
          <div className="flex items-center gap-2 mb-4 ">
            <span className="text-sm text-accent">{rating} / 5</span>
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 fill-current ${
                    i < rating ? "text-accent" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1l2.6 6.7H18l-5 3.9 1.9 7-5.5-4.3-5.5 4.3L5.4 12 0 8.6h5.4L10 1z" />
                </svg>
              ))}
            </div>
          </div>

          <p className="text-gray-300 mb-4">
            {bio.slice(0, 100)}{" "}
            <Link className="link" to={`/instructor/${id}`}>
              read more
            </Link>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default InstructorsSingleCard;
