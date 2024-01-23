import React, { useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

function CreateCollegeDetailsForm(props) {

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [department , setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [nameError, setNameError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [imageError, setImageError] = useState("");

  const [colleges, setColleges] = useState([]);

  ////////////////////////  VALIDATION /////////////////////
  const validationForm = () => {
    let valid = true;
    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!course) {
      setCourseError("Course is required");
      valid = false;
    } else {
      setCourseError("");
    }

    if (!teacher) {
      setTeacherError("College name is required");
      valid = false;
    } else {
      setTeacherError("");
    }

    if (!phone) {
      setPhoneError("Phone is required");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!image) {
      setImageError("Image is required");
      valid = false;
    } else {
      setImageError("");
    }

    return valid;
  };

  ////////////////////////  IMAGE ON CHANGE  /////////////////////

  const onInputChangeFile = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  ////////////////////////  ON SUBMIT CLICK /////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationForm()) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("course", course);
        formData.append("department", department);        
        formData.append("teacher", teacher);
        formData.append("phone", phone);
        formData.append("image", image);

        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        console.log(formData);
        axios
          .post("http://localhost:9002/addCollegeDetails", formData)
          .then((result) => {
            console.log(result);
          });

        
        props.getAllDbData();
        props.setShowCollegeDetailsForm(false);
      
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className=" border-2 border-black py-6 px-5 bg-[#faf9fa] rounded-md">
        <div className="text-5xl text-center  mb-4 ">College Details</div>
        <button className="p-2 px-3 bg-[#06b6df] rounded-sm" onClick={()=>props.setShowCollegeDetailsForm(false)}> <IoMdArrowRoundBack className="inline mr-2"/>Close</button>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label>College</label>
            <br />
            <input
              type="text"
              className=" py-2 px-5 w-100 rounded-md border-1 border-black "
              placeholder="Enter The College Name..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {nameError && (
              <p className="text-red-500 text-xs mt-1">{nameError}</p>
            )}
          </div>

          <div>
            <label>Course</label>
            <br />
            <input
              type="text"
              className="py-2 px-5 w-100 rounded-md border-1 border-black "
              placeholder="Enter The Course Name..."
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            />
            {courseError && (
              <p className="text-red-500 text-xs mt-1">{courseError}</p>
            )}
          </div>

          <div>
            <label>Department</label>
            <br />
            <input
              type="text"
              className="py-2 px-5 w-100 rounded-md border-1 border-black "
              placeholder="Enter The Department Name..."
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
            {courseError && (
              <p className="text-red-500 text-xs mt-1">{courseError}</p>
            )}
          </div>

          <div>
            <label>Teacher</label>
            <br />
            <input
              type="text"
              className="py-2 px-5 w-100 rounded-md border-1 border-black "
              placeholder="Enter The College..."
              onChange={(e) => {
                setTeacher(e.target.value);
              }}
            />
            {teacherError && (
              <p className="text-red-500 text-xs mt-1">{teacherError}</p>
            )}
          </div>
          <div>
            <label>Phone No.</label>
            <br />
            <input
              type="tel"
              className="py-2 px-5 w-100 rounded-md border-1 border-black "
              placeholder="Enter The Phone..."
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </div>
          <div>
            <input type="file" className="my-2" onChange={onInputChangeFile} />
          </div>
          {imageError && (
            <p className="text-red-500 text-xs mt-1">{imageError}</p>
          )}
          <button className="mt-4 bg-green-700 ml-24 py-2 px-8 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCollegeDetailsForm;
