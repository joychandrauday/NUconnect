import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import {
  Link,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "./../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const InstructorDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  console.log(user);
  const {
    data: instructor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["instructor", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/instructor/${id}`);
      return res.data;
    },
  });

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.post(`/instructor/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewText,
        studentName: user?.displayName,
        studentEmail: user?.email,
        studentImage: user?.photoURL,
      });
      toast("Review updated successfully !!");
      // Clear form fields after submission
      setReviewText("");
      setReviewRating(0);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching instructor data</div>;
  }

  const {
    bio,
    department,
    education,
    experience,
    hobby,
    name,
    rating,
    reviews,
    speciality,
    profilePicture,
  } = instructor;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="overflow-hidden">
        <div className="md:flex md:items-start px-6 py-8 md:p-8 ">
          <div className="md:w-1/3 bg-white p-5 rounded shadow-xl md:mr-8 mb-6 md:mb-0 text-center relative">
            <img
              src={profilePicture}
              alt={name}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mx-auto"
            />
            <p className="text-gray-700 mt-4">
              He really likes{" "}
              <span className="bg-yellow-400 px-1 text-black">{hobby}!!</span>
            </p>
            <span className="badge absolute font-semibold badge-primary top-5 right-5">
              {experience}+
            </span>
          </div>
          <div className="md:w-2/3 relative">
            <div className="bg-white p-5 shadow-xl">
              <h2 className="text-3xl font-bold text-primary mb-2">{name}</h2>
              <Link
                to={`/courses/${department}`}
                className="badge border-none bg-yellow-400 text-black py-1 px-3 hover:shadow-md font-semibold capitalize text-md rounded-none hover:shadow-black"
              >
                {department}
              </Link>
              <div className="flex items-center mb-4">
                <span className="text-sm text-primary mr-2">{rating} / 5</span>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 fill-current ${
                        i < rating ? "text-primary" : "text-gray-400"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 1l2.75 6.2L18 7.25l-5 4.75 1.5 6-5.75-3.75-5.75 3.75 1.5-6-5-4.75L2 7.25 7.25 7.2z" />
                    </svg>
                  ))}
                </div>
                <div className="divider lg:divider-horizontal divider-primary"></div>
                <span className="text-lg text-primary font-bold ml-2">
                  {reviews.length} Reviews
                </span>
              </div>
              <p className="text-gray-700">{bio}</p>
            </div>
            <div className="tabs bg-white p-5 mt-5 shadow-xl">
              <div className="px-6 py-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Specialities
                </h3>
                <div className="list-disc list-inside text-gray-700">
                  {speciality.map((spec, index) => (
                    <h1 key={index} className="flex gap-4 items-center">
                      <span className="indicator-item badge badge-warning"></span>
                      {spec}
                    </h1>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-primary mt-8 mb-4">
                  Education
                </h3>
                <div className="list-disc list-inside text-gray-700">
                  {education.map((edu, index) => (
                    <h1 key={index} className="items-center flex gap-4">
                      <span className="indicator-item badge badge-primary"></span>
                      {edu}
                    </h1>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 bg-white p-5 shadow-xl">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Reviews
              </h3>
              <ul className="space-y-4">
                {reviews.map((review, index) => (
                  <li
                    key={index}
                    className="border-b pb-4 cursor-pointer hover:shadow-lg p-4 border rounded hover:translate-y-[-4px] duration-200 transition-translate"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={review.studentImage}
                        alt={review.studentName}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="text-gray-700 mb-2 font-semibold">
                          {review.studentName}
                        </p>
                        <div className="flex items-center mb-1">
                          <span className="text-sm text-primary mr-2">
                            {review.rating} / 5
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 fill-current ${
                                  i < review.rating
                                    ? "text-primary"
                                    : "text-gray-400"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 1l2.75 6.2L18 7.25l-5 4.75 1.5 6-5.75-3.75-5.75 3.75 1.5-6-5-4.75L2 7.25 7.25 7.2z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <h1 className="text-gray-700 font-bold text-3xl mt-12">
                Add a review!
              </h1>
              <form onSubmit={handleReviewSubmit} className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                    className="block w-full p-2 border border-gray-300 rounded"
                    required // Add required attribute here
                  >
                    <option value="">Select a rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Review
                  </label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button disabled={!user} type="submit" className="btn btn-primary rounded-none">
                  {user? 'Submit Review': 'You need to log in first.'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/instructors")}
          className="btn btn-primary mt-4 mx-6 rounded-none"
        >
          Back to All Instructors.
        </button>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default InstructorDetails;
