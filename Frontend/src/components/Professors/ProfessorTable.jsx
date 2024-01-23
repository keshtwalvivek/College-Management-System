import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import CreateProfessorList from "./CreateProfessorList"
import UpdateProfessorList from "./UpdateProfessorList"
function ProfessorTable() {
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [showStudentEditForm , setShowStudentEditForm] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  /// Get All data from the database

  const getAll = () => {
    axios
      .get("http://localhost:9002/getProfessorData")
      .then((result) => {
        setUserData(result.data);
        console.log("response->>>",result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicks "Yes, delete it!"
        axios
          .delete("http://localhost:9002/deleteProfessorData/" + id)
          .then(() => {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            // Call the onDelete callback passed from the parent component
            getAll();
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire(
              "Error",
              "There was an error deleting the data.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If user clicks "No, cancel!"
        Swal.fire("Cancelled", "Your data is safe :)", "info");
      }
    });
  };
 
  const editProfessorDetals = (id) =>{
    setShowStudentEditForm(true);
    
  }

  return (
    <div>
       <Sidebar/>
    <div className="ml-20">
      <div className="text-4xl text-center mt-8 mb-9 bg-[#c8c2c8]">
        Professor List
      </div>
      
      <button className="p-2 px-3 bg-green-700 mb-4 rounded-sm" onClick={()=>setShowDetailsForm(true)}> Add +</button>
 {
  showDetailsForm && <CreateProfessorList getAll={getAll}  setShowDetailsForm={setShowDetailsForm}/>
 }
    

      <table className="w-full mt-3 border border-gray-300">
        <thead>
          <tr className="bg-[#e879f9]">
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">College</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item) => (
            <tr key={item._id} className="border-t border-black bg-[#f5d0fe]">
              <td className="px-4 py-2">
                <img
                  src={"http://localhost:9002/" + item.imagePath}
                  className="w-12 h-12 rounded-full "
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.college}</td>
              <td className="px-4 py-2">{item.department}</td>

              <td className="px-4 py-2 space-x-2">

                 {/* <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => {
                    editProfessorDetals(item._id);
                  }} > Edit</button> */}
                     <NavLink to={`/update/${item._id}`} className="py-2 px-3 bg-green-700 mb-4 rounded-sm">
                        Edit
                     </NavLink>
                     
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ProfessorTable;
