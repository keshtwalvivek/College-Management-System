

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";


import axios from "axios";

function UpdateProfessorList(props) {
//   const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [college, setCollege] = useState();
  const [department, setdepartment] = useState("");
  const [image, setImage] = useState();

  const [allCollegeName, setAllCollegeName] = useState([]);

  const nevigateTo = useNavigate();
  const { id, getAll, setShowStudentEditForm } = props;

  useEffect(() => {
    findCollegeNameFromCollegeTable();
    axios
      .get("http://localhost:9002/getUser/" + id)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setCollege(result.data.college);
        setdepartment(result.data.department);

        setImage(result.data.imagePath);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const onInputChangeFile = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };



  const Update = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("department", department);
    formData.append("image", image); 
    console.log("output ",formData)
    try {
      const response = await axios.put(`http://localhost:9002/update/${id}`, formData);
      console.log("update user", response);
       nevigateTo("/student");
      // props.setShowDetailsForm(false);
      // props.getAll();
    } catch (err) {
      console.log("error updating user", err);
    }
  };
  


  
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

  
  return (
    <div className="flex flex-col">
      
      <div className="border-2 border-black py-7 px-5  rounded-md">
        {/* <FaUserCircle className="w-24 h-24 ml-24 bg-gray shadow-lg  ... rounded-full" /> */}
        {/* <img src={"http://localhost:9002/"+image} className="w-24 h-24 ml-28 bg-gray shadow-lg border-4 border-gray rounded-full"/> */}
        <div className="text-4xl text-center mb-1 ">Update Details</div>
        <form onSubmit={Update}>
          <div>
            <label>Name</label>
            <br />
            <input
              type="type"
              className="py-2 px-5 rounded-md w-100 border-1 border-black "
              placeholder="Enter The Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              className="py-2 px-5 rounded-md w-100  border-1 border-black"
              placeholder="Enter The Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          </div>

          <div>
            <label>Phone</label>
            <br />
            <input
              type="tel"
              p
              className="py-2 px-5 rounded-md w-100 border-1 border-black "
              placeholder="Enter The Phone..."
              value={department}
              onChange={(e) => setdepartment(e.target.value)}
            />
          </div>

          

          <div>
            <input type="file" className="my-1 w-100" onChange={onInputChangeFile} />{" "}
            <br></br>
            
          </div>

          <button className="mt-4 bg-green-700 ml-4 py-2 px-12 rounded-md">
            {" "}
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfessorList;
