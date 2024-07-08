import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddAcademicCourses = () => {
  const [modules, setModules] = useState([{ title: "", description: "" }]);
  const [reviews, setReviews] = useState([
    { studentName: "", studentEmail: "", rating: "", comment: "" },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [instructors, setInstructors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axiosPublic.get("/instructors");
        setInstructors(response.data);
      } catch (error) {
        toast(error);
      }
    };

    fetchInstructors();
  }, [axiosPublic]);

  useEffect(() => {
    setValue("modules", modules);
  }, [modules, setValue]);

  useEffect(() => {
    setValue("reviews", reviews);
  }, [reviews, setValue]);

  useEffect(() => {
    setValue("faqs", faqs);
  }, [faqs, setValue]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching subjects data</div>;
  }

  const onSubmit =async (data) => {
    const result = await axiosSecure.post("/courses", data);
    if (result.data.insertedId) {
      toast.success('The Course has been successfully inserted.')
    } else {
      toast.success('something went wrong.')
    }
    console.log(result);
    // You can use axios or fetch to send data to your backend API
  };

  const addModule = () => {
    setModules([...modules, { title: "", description: "" }]);
  };

  const addReview = () => {
    setReviews([
      ...reviews,
      { studentName: "", studentEmail: "", rating: "", comment: "" },
    ]);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Academic Course</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <div className="flex gap-4">
            <div className="basis-1/2">
              <div className="mb-4">
                <label
                  htmlFor="courseId"
                  className="block text-primary font-semibold mb-2"
                >
                  Course ID
                </label>
                <input
                  type="text"
                  id="courseId"
                  {...register("id", { required: true })}
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                {errors.id && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="courseTitle"
                  className="block text-primary font-semibold mb-2"
                >
                  Course Title
                </label>
                <input
                  type="text"
                  id="courseTitle"
                  {...register("title", { required: true })}
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                {errors.title && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="courseDescription"
                  className="block text-primary font-semibold mb-2"
                >
                  Course Description
                </label>
                <textarea
                  id="courseDescription"
                  {...register("description", { required: true })}
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-primary font-semibold mb-2"
                >
                  Department
                </label>
                <select
                  id="department"
                  {...register("department", { required: true })}
                  className="block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a department</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject.slug}>
                      {subject.subjectName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="level"
                  className="block text-primary font-semibold mb-2"
                >
                  Level
                </label>
                <select
                  id="level"
                  {...register("level", { required: true })}
                  className="block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.level && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-primary font-semibold mb-2"
                >
                  Select Instructor
                </label>
                <select
                  id="instructor"
                  {...register("instructor", { required: true })}
                  className="block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select an Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
                {errors.instructor && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="basis-1/2">
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="duration"
                    className="block text-primary font-semibold mb-2"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    {...register("duration", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.duration && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-primary font-semibold mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register("price", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.price && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-primary font-semibold mb-2"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    id="rating"
                    {...register("rating", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.rating && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="totalEnrolled"
                    className="block text-primary font-semibold mb-2"
                  >
                    Total Enrolled
                  </label>
                  <input
                    type="number"
                    id="totalEnrolled"
                    {...register("totalEnrolled", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.totalEnrolled && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="enrollDeadline"
                    className="block text-primary font-semibold mb-2"
                  >
                    Enrollment Deadline
                  </label>
                  <input
                    type="date"
                    id="enrollDeadline"
                    {...register("enrollDeadline", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.enrollDeadline && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="active"
                    className="block text-primary font-semibold mb-2"
                  >
                    Active
                  </label>
                  <select
                    id="active"
                    {...register("active", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select a status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                  {errors.active && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="notes"
                    className="block text-primary font-semibold mb-2"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    {...register("notes")}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="seatsLeft"
                    className="block text-primary font-semibold mb-2"
                  >
                    Seats Left
                  </label>
                  <input
                    type="number"
                    id="seatsLeft"
                    {...register("seatsLeft", { required: true })}
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.seatsLeft && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="featuredImage"
              className="block text-primary font-semibold mb-2"
            >
              Featured Image URL
            </label>
            <input
              type="text"
              id="featuredImage"
              {...register("featuredImage")}
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-primary font-semibold mb-2">Modules</h3>
          {modules.map((module, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <div className="mb-2">
                <label
                  htmlFor={`moduleTitle${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Module Title
                </label>
                <input
                  type="text"
                  id={`moduleTitle${index}`}
                  value={module.title}
                  onChange={(e) =>
                    setModules(
                      modules.map((m, i) =>
                        i === index ? { ...m, title: e.target.value } : m
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`moduleDescription${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Module Description
                </label>
                <textarea
                  id={`moduleDescription${index}`}
                  value={module.description}
                  onChange={(e) =>
                    setModules(
                      modules.map((m, i) =>
                        i === index ? { ...m, description: e.target.value } : m
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addModule}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add Module
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-primary font-semibold mb-2">Reviews</h3>
          {reviews.map((review, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <div className="mb-2">
                <label
                  htmlFor={`reviewStudentName${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Student Name
                </label>
                <input
                  type="text"
                  id={`reviewStudentName${index}`}
                  value={review.studentName}
                  onChange={(e) =>
                    setReviews(
                      reviews.map((r, i) =>
                        i === index ? { ...r, studentName: e.target.value } : r
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`reviewStudentEmail${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Student Email
                </label>
                <input
                  type="email"
                  id={`reviewStudentEmail${index}`}
                  value={review.studentEmail}
                  onChange={(e) =>
                    setReviews(
                      reviews.map((r, i) =>
                        i === index ? { ...r, studentEmail: e.target.value } : r
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`reviewRating${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  id={`reviewRating${index}`}
                  value={review.rating}
                  onChange={(e) =>
                    setReviews(
                      reviews.map((r, i) =>
                        i === index ? { ...r, rating: e.target.value } : r
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`reviewComment${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Comment
                </label>
                <textarea
                  id={`reviewComment${index}`}
                  value={review.comment}
                  onChange={(e) =>
                    setReviews(
                      reviews.map((r, i) =>
                        i === index ? { ...r, comment: e.target.value } : r
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addReview}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add Review
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-primary font-semibold mb-2">FAQs</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <div className="mb-2">
                <label
                  htmlFor={`faqQuestion${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Question
                </label>
                <input
                  type="text"
                  id={`faqQuestion${index}`}
                  value={faq.question}
                  onChange={(e) =>
                    setFaqs(
                      faqs.map((f, i) =>
                        i === index ? { ...f, question: e.target.value } : f
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`faqAnswer${index}`}
                  className="block text-primary font-semibold mb-1"
                >
                  Answer
                </label>
                <textarea
                  id={`faqAnswer${index}`}
                  value={faq.answer}
                  onChange={(e) =>
                    setFaqs(
                      faqs.map((f, i) =>
                        i === index ? { ...f, answer: e.target.value } : f
                      )
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add FAQ
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAcademicCourses;
