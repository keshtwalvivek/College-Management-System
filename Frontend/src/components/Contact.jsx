import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaUserCircle } from "react-icons/fa";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaRegCalendar,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();


  };

  const inputField = (label, icon, name, placeholder, value) => (
    <div className="mb-4">
      <label className="text-gray-600 text-sm font-semibold mb-2 flex items-center">
        {icon} {label}
      </label>
      <input
        type="text"
        name={name}
        className="w-full px-6 py-2 border-1 border-black rounded-md focus:outline-none focus:border-purple-500"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className=" flex-col items-center justify-center border-16  rounded-lg ">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <FaUserCircle className="w-20 h-20 ml-20 mb-2 bg-gray shadow-lg  ... rounded-full" />

          <form onSubmit={handleSubmit}>
            {inputField(
              "Your Name",
              <FaUser className="mr-2" />,
              "name",
              "Enter your name",
              formData.name
            )}

            {inputField(
              "Your Email",
              <FaEnvelope className="mr-2" />,
              "email",
              "Enter your email",
              formData.email
            )}

            {inputField(
              "Your Phone",
              <FaPhone className="mr-2" />,
              "phone",
              "Enter your phone number",
              formData.phone
            )}

            {inputField(
              "Your Message",
              <FaRegCalendar className="mr-2" />,
              "message",
              "Type your message here",
              formData.message
            )}

            <button
              type="submit"
              className="w-full bg-green-700  text-white text-2xl py-2 rounded-md focus:outline-none focus:ring focus:border-purple-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
