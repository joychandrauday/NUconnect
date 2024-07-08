import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SingleDetailSyllabus = ({ courses }) => {
  const axiosSecure =useAxiosSecure()
  const [editCourse, setEditCourse] = useState(null); // State to track which course is being edited

  const handleEditClick = (course) => {
    setEditCourse(course); // Set the course to edit when edit button is clicked
  };

  const handleCancelEdit = () => {
    setEditCourse(null); // Clear the edit state when canceling edit
  };

  const handleUpdateCourse = async (updatedCourse) => {
    try {
      const response = await axiosSecure.put(`detailed-syllabus/courses/${editCourse.courseCode}`, editCourse);
      toast("Updated course:", response.data);

      // Assuming successful update, you would update the state or reload data
      console.log("Updated course:", updatedCourse);

      // Clear edit state after successful update
      setEditCourse(null);
    } catch (error) {
      toast("Error updating course:", error);
      console.error("Error updating course:", error);
      // Handle error updating course
    }
  };

  const handleTopicChange = (index, newValue) => {
    const updatedTopics = [...editCourse.topics];
    updatedTopics[index] = newValue;
    setEditCourse({
      ...editCourse,
      topics: updatedTopics,
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-3/5 mx-auto">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Marks</th>
              <th>Credit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseCode} className="text-center">
                <td>{course.courseCode}</td>
                <td>{course.courseTitle}</td>
                <td>{course.marks}</td>
                <td>{course.credits}</td>
                <td>
                  <div className="collapse justify-center">
                    <input type="checkbox" />
                    <div className="collapse-title font-medium capitalize">
                      course details
                    </div>
                    <div className="collapse-content w-full">
                      {course.topics?.map((desc, index) => (
                        <p
                          key={index}
                          className="bg-accent p-2 mb-1 text-white"
                        >
                          {index + 1}. {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  {editCourse && editCourse.courseCode === course.courseCode ? (
                    <div>
                      {/* Form to edit course details */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdateCourse(editCourse);
                        }}
                      >
                        <input
                          type="text"
                          defaultValue={editCourse.courseCode}
                          onChange={(e) =>
                            setEditCourse({
                              ...editCourse,
                              courseCode: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                          type="text"
                          defaultValue={editCourse.courseTitle}
                          onChange={(e) =>
                            setEditCourse({
                              ...editCourse,
                              courseTitle: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                          type="number"
                          defaultValue={editCourse.marks}
                          onChange={(e) =>
                            setEditCourse({
                              ...editCourse,
                              marks: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                          type="number"
                          defaultValue={editCourse.credits}
                          onChange={(e) =>
                            setEditCourse({
                              ...editCourse,
                              credits: e.target.value,
                            })
                          }
                          required
                        />
                        {/* Editable topics */}
                        {editCourse.topics.map((topic, index) => (
                          <input
                            key={index}
                            type="text"
                            defaultValue={topic}
                            onChange={(e) =>
                              handleTopicChange(index, e.target.value)
                            }
                            required
                          />
                        ))}
                        <button
                          className="btn rounded-none btn-warning"
                          type="submit"
                        >
                          Update
                        </button>
                        <button
                          className="btn rounded-none btn-warning"
                          type="button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  ) : (
                    <button onClick={() => handleEditClick(course)}>
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleDetailSyllabus;
