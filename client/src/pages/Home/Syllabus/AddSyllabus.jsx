import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddSyllabus = () => {
  const axiosSecure=useAxiosSecure()
  const { slug } = useParams();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      slug: slug || "",
      details: {
        firstYear: { courses: [] },
        secondYear: { courses: [] },
        thirdYear: { courses: [] },
        fourthYear: { courses: [] },
      },
    },
  });

  const { fields: firstYearCourses, append: appendFirstYearCourse } =
    useFieldArray({
      control,
      name: "details.firstYear.courses",
    });

  const { fields: secondYearCourses, append: appendSecondYearCourse } =
    useFieldArray({
      control,
      name: "details.secondYear.courses",
    });

  const { fields: thirdYearCourses, append: appendThirdYearCourse } =
    useFieldArray({
      control,
      name: "details.thirdYear.courses",
    });

  const { fields: fourthYearCourses, append: appendFourthYearCourse } =
    useFieldArray({
      control,
      name: "details.fourthYear.courses",
    });

    const onSubmit = async (data) => {
      try {
        // Check if a syllabus with the same slug already exists
        const existingSyllabus = await axiosSecure.get(`/detailed-syllabus/${data.slug}`);
    
        if (existingSyllabus.data) {
          // Syllabus with the same slug already exists
          toast.error('A syllabus with the same slug already exists! edit to add more.');
        } else {
          // Insert the new syllabus
          const response = await axiosSecure.post("/detailed-syllabus", data);
          if (response.data.insertedId) {
            toast.success('Your syllabus has been added!');
          } else {
            toast.error('Something went wrong with adding your syllabus!');
          }
        }
      } catch (error) {
        console.error("Error adding syllabus", error);
        toast.error('Failed to add syllabus!');
      }
    };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-primary font-bold mb-2">Slug</label>
        <input
          {...register("slug", { required: true })}
          className="block w-full p-2 border border-gray-300 rounded"
          value={slug}
          readOnly
        />
        {errors.slug && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <h3 className="text-xl font-bold mb-2">First Year Courses</h3>
          </Tab>
          <Tab>
            <h3 className="text-xl font-bold mb-2">Second Year Courses</h3>
          </Tab>
          <Tab>
            <h3 className="text-xl font-bold mb-2">Third Year Courses</h3>
          </Tab>
          <Tab>
            <h3 className="text-xl font-bold mb-2">Fourth Year Courses</h3>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-2 gap-4">
            {firstYearCourses.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <label className="block text-primary font-semibold mb-2">
                  Course Code
                </label>
                <input
                  {...register(
                    `details.firstYear.courses.${index}.courseCode`,
                    { required: true }
                  )}
                  type="number"
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Course Title
                </label>
                <input
                  {...register(
                    `details.firstYear.courses.${index}.courseTitle`,
                    { required: true }
                  )}
                  type="text"
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Credits
                </label>
                <input
                  {...register(
                    `details.firstYear.courses.${index}.credits`,
                    { required: true }
                  )}
                  type="number"
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Marks
                </label>
                <input
                  {...register(
                    `details.firstYear.courses.${index}.marks`,
                    { required: true }
                  )}
                  type="number"
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Topics
                  </label>
                  {item.topics.map((_, tIndex) => (
                    <input
                      key={tIndex}
                      {...register(
                        `details.firstYear.courses.${index}.topics.${tIndex}`
                      )}
                      type="text"
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendFirstYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Topic
                  </button> */}
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Books
                  </label>
                  {item.books.map((_, bIndex) => (
                    <input
                      key={bIndex}
                      {...register(
                        `details.firstYear.courses.${index}.books.${bIndex}`
                      )}
                      type="text"
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendFirstYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Book
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              appendFirstYearCourse({
                courseCode: "",
                courseTitle: "",
                credits: 4,
                marks: 100,
                topics: ["", "", "", ""],
                books: ["", ""],
              })
            }
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add First Year Course
          </button>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-2 gap-4">
            {secondYearCourses.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <label className="block text-primary font-semibold mb-2">
                  Course Code
                </label>
                <input
                  type="number"
                  {...register(
                    `details.secondYear.courses.${index}.courseCode`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  {...register(
                    `details.secondYear.courses.${index}.courseTitle`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  {...register(
                    `details.secondYear.courses.${index}.credits`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Marks
                </label>
                <input
                  type="number"
                  {...register(
                    `details.secondYear.courses.${index}.marks`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Topics
                  </label>
                  {item.topics.map((_, tIndex) => (
                    <input
                      key={tIndex}
                      type="text"
                      {...register(
                        `details.secondYear.courses.${index}.topics.${tIndex}`
                      )}
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendSecondYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Topic
                  </button> */}
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Books
                  </label>
                  {item.books.map((_, bIndex) => (
                    <input
                      key={bIndex}
                      type="text"
                      {...register(
                        `details.secondYear.courses.${index}.books.${bIndex}`
                      )}
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendSecondYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Book
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              appendSecondYearCourse({
                courseCode: "",
                courseTitle: "",
                credits: 4,
                marks: 100,
                topics: ["", "", "", ""],
                books: ["", ""],
              })
            }
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add Second Year Course
          </button>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-2 gap-4">
            {thirdYearCourses.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <label className="block text-primary font-semibold mb-2">
                  Course Code
                </label>
                <input
                  type="number"
                  {...register(
                    `details.thirdYear.courses.${index}.courseCode`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  {...register(
                    `details.thirdYear.courses.${index}.courseTitle`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  {...register(
                    `details.thirdYear.courses.${index}.credits`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Marks
                </label>
                <input
                  type="number"
                  {...register(
                    `details.thirdYear.courses.${index}.marks`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Topics
                  </label>
                  {item.topics.map((_, tIndex) => (
                    <input
                      key={tIndex}
                      type="text"
                      {...register(
                        `details.thirdYear.courses.${index}.topics.${tIndex}`
                      )}
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendThirdYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Topic
                  </button> */}
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Books
                  </label>
                  {item.books.map((_, bIndex) => (
                    <input
                      key={bIndex}
                      type="text"
                      {...register(
                        `details.thirdYear.courses.${index}.books.${bIndex}`
                      )}
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendThirdYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Book
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              appendThirdYearCourse({
                courseCode: "",
                courseTitle: "",
                credits: 4,
                marks: 100,
                topics: ["", "", "", ""],
                books: ["", ""],
              })
            }
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add Third Year Course
          </button>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-2 gap-4">
            {fourthYearCourses.map((item, index) => (
              <div
                key={item.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <label className="block text-primary font-semibold mb-2">
                  Course Code
                </label>
                <input
                  type="number"
                  {...register(
                    `details.fourthYear.courses.${index}.courseCode`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  {...register(
                    `details.fourthYear.courses.${index}.courseTitle`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  {...register(
                    `details.fourthYear.courses.${index}.credits`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <label className="block text-primary font-semibold mb-2">
                  Marks
                </label>
                <input
                  type="number"
                  {...register(
                    `details.fourthYear.courses.${index}.marks`,
                    { required: true }
                  )}
                  className="block w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Topics
                  </label>
                  {item.topics.map((_, tIndex) => (
                    <input
                      key={tIndex}
                      type="text"
                      {...register(
                        `details.fourthYear.courses.${index}.topics.${tIndex}`
                      )}
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendFourthYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Topic
                  </button> */}
                </div>
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Books
                  </label>
                  {item.books.map((_, bIndex) => (
                    <input
                      key={bIndex}
                      type="text"
                      {...register(
                        `details.fourthYear.courses.${index}.books.${bIndex}`
                      )}
                      className="block w-full p-2 border border-gray-300 rounded mb-2"
                    />
                  ))}
                  {/* <button
                    type="button"
                    onClick={() =>
                      appendFourthYearCourse({
                        courseCode: "",
                        courseTitle: "",
                        credits: 4,
                        marks: 100,
                        topics: ["", "", "", ""],
                        books: ["", ""],
                      })
                    }
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Add Book
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              appendFourthYearCourse({
                courseCode: "",
                courseTitle: "",
                credits: 4,
                marks: 100,
                topics: ["", "", "", ""],
                books: ["", ""],
              })
            }
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Add Fourth Year Course
          </button>
        </TabPanel>
      </Tabs>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
      >
        Save Syllabus
      </button>
    </form>
  );
};

export default AddSyllabus;
