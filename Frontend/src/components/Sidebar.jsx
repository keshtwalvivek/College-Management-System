import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";
import { IoMdContact } from "react-icons/io";
import { VscSignIn } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import {GiHamburgerMenu} from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ setElement }) {
  const nevigateTo = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col bg-[#8b5cf6] text-white h-screen w-56 fixed top-0 left-0  ${`sidebar ${isOpen ? 'open' : 'closed'}`}`}>
      <div className="bg-black  space-x-8" >
      
        <GiHamburgerMenu className=" float-right w-12 h-16"
         onClick={toggleSidebar}/>
          
         </div>
     

      <ul className="flex-col  items-center py-16 pl-4 ">
        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/dashboard")}
        >
          <RxDashboard className="inline w-9 h-9  " />
          <a className=" py-2 px-4  text-xl font-semibold">Dashboard</a>
        </li>

        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/student")}
        >
          <PiStudentFill className="inline w-10 h-10 my-1  " />
          <a className=" py-2 px-4  text-xl font-semibold">Students</a>
        </li>

        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/college")}
        >
          <IoMdContact className="inline w-10 h-10 " />
          <a className=" py-2 px-4  text-xl font-semibold">Colleges</a>
        </li>

        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/department")}
        >
          <IoMdContact className="inline w-10 h-10 " />
          <a className=" py-2 px-4  text-xl font-semibold">Department</a>
        </li>

        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/professor")}
        >
          <IoMdContact className="inline w-10 h-10 " />
          <a className=" py-2 px-4  text-xl font-semibold">Professor</a>
        </li>
        
        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/contact")}
        >
          <IoMdContact className="inline w-10 h-10 " />
          <a className=" py-2 px-4  text-xl font-semibold">Contact</a>
        </li>
        

        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/register")}
        >
          <VscSignIn className="inline w-9 pl-1 h-9 my-1 " />
          <a href="#" className=" py-2 px-4  text-xl font-semibold">
            SignUp
          </a>
        </li>
        <li
          className="cursor-pointer hover:bg-[#7e22ce] active:bg-[#7e22ce] mb-4 rounded"
          onClick={() => nevigateTo("/login")}
        >
          <TbLogout className="inline w-10 h-10" />
          <a href="#" className=" py-2 px-4    text-xl font-semibold">
            LogOut
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
