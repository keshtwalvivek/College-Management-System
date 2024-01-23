import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";

import axios from "axios";

function CreateDepartment(props) {
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState("");

  const [allCollegeName, setAllCollegeName] = useState([]);

  const navigateTo = useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    return valid;
  };
  ///////////////////////////////////////////////////

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         const formData = new FormData();
//         formData.append("name", name);

//         console.log("formdata : " +[...formData.entries()]);
//         const response = await axios.post("http://localhost:9002/create-departmentTable", formData);
//         console.log(response);
//         props.getAll();
//         props.setShowDetailsForm(false);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:9002/create-departmentTable", {
          name, 
        });
        console.log(response);
        props.getAll();
        props.setShowDetailsForm(false);
      } catch (err) {
        console.error(err);
        // Handle error, e.g., display an error message to the user
      }
    }
  };
  
  

  return (
    <div className="flex flex-col ml-4">
      <div className=" border-2 border-black py-2 px-5  bg-[#faf9fa] rounded-md">
        <div className="text-5xl text-center  mb-2 ">User Details</div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label>Name</label>
            <br />
            <input
              type="text"
              className={` py-2 px-5 w-100 rounded-md border-1 border-black ${
                nameError && "border-red-500"
              }`}
              placeholder="Enter The Name..."
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
            />
            {nameError && (
              <p className="text-red-500 text-xs mt-1">{nameError}</p>
            )}
          </div>

          

          <button className="mt-4 bg-[#06b6df] ml-24 py-2 px-8 rounded-md"  onClick={()=>props.setShowDetailsForm(false)}><IoMdArrowRoundBack className="inline mr-2"/>Close</button>
          <button className="mt-4 bg-green-700 ml-4 py-2 px-12 rounded-md">
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDepartment;
