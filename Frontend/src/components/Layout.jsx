import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Students from "./Students";
import Contact from "./Contact";
import { Routes, Route } from "react-router-dom";

const Elements = {
  1:<Dashboard/>,
  2:<Students/>,
  3:<Contact/>
}
 
function Layout() {
  const [ele,setElement] = useState(1);
  const Element = Elements[ele];
  console.log(ele);

  

  return (
    <>
      <Sidebar setElement={setElement}/>
      {Element}
      
    </>
  );
}



export default Layout;
