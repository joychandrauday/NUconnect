import React from "react";
import useInstructor from "../../hooks/useInstructor";

const TeacherComponent = ({ instructor }) => {

  const { teacher } = useInstructor(instructor);
  return (
    <div>
      <div className="card-body">
        <div className="flex items-center gap-6">
          <img
            src={teacher?.profilePicture}
            alt={teacher?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="card-title">{teacher?.name}</h2>
            <p className="text-sm text-gray-800">{
                teacher?.speciality.map((special)=>(
                    <span key={special} className="badge text-white py-1 bg-primary hover:scale-105 hover:border-none duration-150 transition-translate rounded-none">{special}</span>
                ))
            }</p>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default TeacherComponent;
