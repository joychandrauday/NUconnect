import React from "react";

const SingleDetailSyllabus = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table table-zebra w-3/5 mx-auto">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>index</th>
              <th>Course Title</th>
              <th>Marks</th>
              <th>Credit</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.courseCode} className="text-center">
                
                <th>{index + 1}</th>
                <td>{course.courseTitle}</td>
                <td>{course.marks}</td>
                <td>{course.credits}</td>
                <div className="collapse justify-center">
                  <input type="checkbox" />
                  <div className="collapse-title font-medium capitalize">
                    course details
                  </div>
                  <div className="collapse-content w-full">
                    {
                        course.topics.map((desc, index) => (
                          <p key={index} className="bg-accent p-2 mb-1 text-white">{index+1}. {desc}</p>
                        ))
                    }
                  </div>
                </div>
              </tr>
            ))}
            {/* row 1 */}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleDetailSyllabus;
