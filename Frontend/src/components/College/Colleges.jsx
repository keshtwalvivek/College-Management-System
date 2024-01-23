import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import CreateCollegeDetail from "./CreateCollegeDetailsForm";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import UpdateCollegeDetails from "./UpdateCollegeDetails";

function Colleges() {
  const [showCollegeDetailsForm, setShowCollegeDetailsForm] = useState(false);
  // const [showCollegeDetailsEditForm, setShowCollegeDetailsEditForm] = useState(false);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllDbData();
  }, []);

  const getAllDbData = () => {
    axios
      .get("http://localhost:9002/getCollegeData")
      .then((result) => {
        setUserData(result.data);
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
          .delete("http://localhost:9002/deletCollegeData/" + id)
          .then(() => {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            // Call the onDelete callback passed from the parent component
            getAllDbData();
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
  return (
    <div>
      <Sidebar />
      <div className="ml-9">
        <div className="text-4xl text-center mt-8 mb-9 bg-[#c8c2c8]">
          College Details
        </div>

        <button
          className="p-2 px-3 bg-green-700 mb-4 rounded-sm inline"
          onClick={() => setShowCollegeDetailsForm(true)}
        >
          {" "}
          Add +
        </button>
        {showCollegeDetailsForm && (
          <CreateCollegeDetail
            getAllDbData={getAllDbData}
            setShowCollegeDetailsForm={setShowCollegeDetailsForm}
          />
        )}

        {/* {showCollegeDetailsEditForm && (
          <UpdateCollegeDetails
          getAllDbData={getAllDbData}
          setShowCollegeDetailsEditForm={setShowCollegeDetailsEditForm}
          />
        )} */}

        <table className="w-full mt-3 border border-gray-300">
          <thead>
            <tr className="bg-[#e879f9]">
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">College</th>
              <th className="px-4 py-2">Courses</th>
              <th className="px-4 py-2">Departments</th>
              <th className="px-4 py-2">Teachers</th>
              <th className="px-4 py-2">Contact </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item) => (
              <tr key={item._id} className="border-t border-black bg-[#f5d0fe]">
                <td className="px-4 py-2">
                  <img
                    src={"http://localhost:9002/" + item.collegeImgPath}
                    className="w-12 h-12 rounded-full "
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.course}</td>
                <td className="px-4 py-2">{item.department}</td>
                <td className="px-4 py-2">{item.teacher}</td>
                <td className="px-4 py-2">{item.phone}</td>
                <td className="px-4 py-2 space-x-2">
                  {/* <button
                    className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => setShowCollegeDetailsEditForm(true)}
                  >
                    {" "}
                    Edit
                  </button> */}

                     <NavLink to={`/updateCollegeData/${item._id}`} className="py-2 px-3 bg-green-700 mb-4 rounded-sm">
                        Edit
                     </NavLink>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                    onClick={() => handleDelete(item._id)}
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

export default Colleges;
