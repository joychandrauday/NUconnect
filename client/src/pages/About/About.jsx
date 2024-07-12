import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Welcome to our website dedicated to the National University of
            Bangladesh. We have created this platform to help students easily
            access the information they need and make their academic journey
            smoother. On our site, you will find:
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              Syllabus
            </h2>
            <p className="text-gray-400">
              Detailed syllabuses for all departments to aid in your academic
              preparation.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              Suggestions
            </h2>
            <p className="text-gray-400">
              Various subject suggestions to help you prepare for exams.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              Notices
            </h2>
            <p className="text-gray-400">
              The latest notices and updates to keep you informed at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
