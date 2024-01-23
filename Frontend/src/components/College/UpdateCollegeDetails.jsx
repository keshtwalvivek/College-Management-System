import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";



function UpdateCollegeDetails(props) {
const navigateTo = useNavigate();
    const {id} = useParams();

    const[name,setName] = useState("");
    const[course,setCourse] = useState("");
    const [department , setDepartment] = useState("");
    const[teacher,setTeacher] = useState("");
    const[phone,setPhone] = useState("");
    const [image, setImage] = useState();

    useEffect(()=>{
         axios.get("http://localhost:9002/getCollegeDataForUpdate/"+ id)
         .then((result)=>{
            console.log(result);
            setName(result.data.name);
            setCourse(result.data.course);
            setDepartment(result.data.department);
            setTeacher(result.data.teacher);
            setPhone(result.data.phone);
            setImage(result.data.collegeImgPath)
         })
         .catch((err)=>{
            console.log(err);
         })
    },[]);


    // const update =(e)=>{
    //   e.preventDefault();
    //   axios.put("http://localhost:9002/upateCollegeData/"+id,{name,course,department,teacher,phone} )
    //   .then((result)=>{
    //       console.log("client side ->>>",result);
    //       navigateTo("/college");
    //   })
    //   .catch((err)=>{
    //       console.log(err);
    //   })
    // }

    const onInputChangeFile = (e) => {
      e.preventDefault();
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    };

    const Update = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("course", course);
      formData.append("department", department);
      formData.append("teacher", teacher);
      formData.append("phone", phone);
      formData.append("image", image); // Include filename for image
    
      console.log([...formData.entries()])

      try {
        const response = await axios.put(
          `http://localhost:9002/updateCollegeData/${id}`, // Corrected endpoint URL
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data" // Set content type for FormData
            }
          }
        );
    
        console.log("Update successful:", response);
        navigateTo("/college");
        // props.setShowCollegeDetailsEditForm(false);
        props.getAllDbData();
      } catch (err) {
        console.error("Error updating user:", err);
        // Handle error gracefully, e.g., display an error message to the user
      }
    };
    
  
  
    
  return (
    <div className="flex flex-col">

      <div className="border-2 bg-slate-50 border-black  py-9 px-5  rounded-md">
        {/* <FaUserCircle className="w-24 h-24 ml-28 bg-gray shadow-lg  ... rounded-full" /> */}
        <div className="text-4xl text-center  ">Update Details</div>

        <form onSubmit={Update}>
          <div>
            <label>College</label>
            <br />
            <input
              type="type"
              className="py-2 px-5 rounded-md w-100 border-1 border-black "
              placeholder="Enter The College Name..."
              onChange={(e)=> setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label>Course</label>
            <br />
            <input
              type="text"
              className="py-2 px-5 rounded-md w-100 border-1 border-black"
              placeholder="Enter The Course Name..."
              onChange={(e)=> setCourse(e.target.value)}
              value={course}
            />
          </div>

          <div>
            <label>Department</label>
            <br />
            <input
              type="text"
              className="py-2 px-5 rounded-md w-100 border-1 border-black"
              placeholder="Enter The Course Name..."
              onChange={(e)=> setDepartment(e.target.value)}
              value={department}
            />
          </div>

          <div>
            <label>Teacher</label>
            <br />
            <input
              type="text"
              className="py-2 px-5 rounded-md w-100 border-1 border-black"
              placeholder="Enter The College..."
              onChange={(e)=> setTeacher(e.target.value)}
              value={teacher}
            />
          </div>

          <div>
            <label>Phone</label> 
            <br />
            <input
              type="tel"
              p
              className="py-2 px-5 rounded-md border-1 w-100 border-black "
              placeholder="Enter The Phone..."
              onChange={(e)=> setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div>
            <input type="file" className="my-1 w-100" onChange={onInputChangeFile} />{" "}
            <br></br>
            
          </div>

          {/* <button className="mt-4 bg-[#06b6df] ml-24 py-2 px-8 rounded-md"  onClick={()=>props.setShowCollegeDetailsEditForm(false)}><IoMdArrowRoundBack className="inline mr-2"/>Close</button> */}

          <button className="mt-4 bg-green-700 ml-24 py-2 px-8 rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCollegeDetails;
