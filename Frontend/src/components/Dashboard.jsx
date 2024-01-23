import React from "react";
import axios from "axios";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [userData, setUserData] = useState();

  const countAll = () => {
    axios
      .get("http://localhost:9002/count")
      .then((result) => {
        setUserData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  countAll();
  return (
    <div>
      <Sidebar/>
      <div className=" min-h-screen bg-gray-100 w-full">
        <div className="flex justify-center items-center h-screen bg-[#e9d5ff]">
          <div className="max-w-3xl p-8  rounded-lg shadow-lg bg-[#c084fc] ">
            <div className="text-4xl font-bold text-gray-800 mb-4 text-center">
              Welcome to the Dashboard
            </div>
            <div className="text-lg text-gray-600 mb-8 text-center">
              Get ready to embark on an exciting journey of learning and
              self-improvement.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-500 p-4 rounded-lg text-white text-center">
                <img
                  src="./left-img.jpg"
                  alt="Study Image 1"
                  className="mb-4 min-w-full rounded-md "
                />
                <h2 className="text-xl font-bold">Study Material 1</h2>
                <p>
                  Access a vast library of study resources to aid your learning.
                </p>
              </div>

              <div className="bg-green-500 p-4 rounded-lg text-white text-center ">
                <img
                  src="./right-img.avif"
                  alt="Study Image 2"
                  className="mb-4 min-w-full rounded-md "
                />
                <h2 className="text-xl font-bold">Study Material 2</h2>
                <p>
                  Explore interactive courses and tutorials to enhance your
                  knowledge.
                </p>
              </div>
            </div>
            <div className=" m-3 w-94 h-24 py-3 px-3 bg-blue-500 rounded-md">
              <div className="bg-green-700 border-2 border-white w-94 h-16 rounded-md text-center  text-white">
                 <h2 className="text-xl font-semibold">Students</h2>
                 <h2 className="text-3xl font-bold">{userData}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
