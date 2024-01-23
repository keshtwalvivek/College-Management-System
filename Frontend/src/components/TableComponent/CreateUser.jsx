import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";

import axios from "axios";

function CreateUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [collegeError, setErrorCollege] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");
  const [imageError, setImageError] = useState("");

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

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!college) {
      setErrorCollege("Email is required");
      valid = false;
    } else {
      setErrorCollege("");
    }
    if (!phone) {
      setPhoneError("Phone is required");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!dob) {
      setDobError("Date of birth is required");
      valid = false;
    } else {
      setDobError("");
    }
    if (!image) {
      setImageError("Image is required");
      valid = false;
    } else {
      setImageError("");
    }
    return valid;
  };
  ///////////////////////////////////////////////////
  // image section code


  useEffect((e)=>{
    findCollegeNameFromCollegeTable();

  },[])

  const findCollegeNameFromCollegeTable = () => {
    axios
      .get("http://localhost:9002/findCollegeBYName")
      .then((result) => {
        setAllCollegeName(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputChangeFile = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("college", college);
        formData.append("phone", phone);
        formData.append("dob", dob);
        formData.append("image", image);

        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        console.log("formdata : " + formData);
        // const response = await axios.post("http://localhost:9002/create-with-image", formData);

        const response = await axios.post(
          `http://localhost:9002/create-with-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        props.getAll();
        props.setShowDetailsForm(false);
      } catch (err) {
        console.log(err);
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

          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              className={`py-2 px-5 w-100 rounded-md border-1 border-black ${
                emailError && "border-red-500"
              }`}
              placeholder="Enter The Email..."
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label>College</label>
            <br />

            <select
              id="College"
              onChange={(e) => setCollege(e.target.value)}
              value={college}
              className="py-2 px-5 w-100 rounded-md border-1 border-black"
            >
              <option value="">Select College</option>
              {allCollegeName.map((college) => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))}
            </select>

            {collegeError && (
              <p className="text-red-500 text-xs mt-1">{collegeError}</p>
            )}
          </div>

          <div>
            <label>Phone</label>
            <br />
            <input
              type="tel"
              className={`py-2 px-5 w-100 rounded-md border-1 border-black ${
                phoneError && "border-red-500"
              }`}
              placeholder="Enter The Phone..."
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </div>

          <div>
            <label>Date of birth </label>
            <br />
            <input
              type="date"
              className={`py-2  px-5 w-100 rounded-md border-1 border-black ${
                dobError && "border-red-500"
              }`}
              placeholder="Enter The Dob..."
              onChange={(e) => {
                setDob(e.target.value);
                setDobError("");
              }}
            />
            {dobError && (
              <p className="text-red-500 text-xs mt-1">{dobError}</p>
            )}
          </div>

          <div>
            <input type="file" className="my-1" onChange={onInputChangeFile} />{" "}
            <br></br>
            {imageError && (
              <p className="text-red-500 text-xs mt-1">{imageError}</p>
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

export default CreateUser;
