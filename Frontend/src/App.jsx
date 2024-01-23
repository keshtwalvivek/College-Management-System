import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import PageNotFound from "./components/PageNotFound";
import "./App.css";
import Layout from "./components/Layout";
import CreateUser from "./components/TableComponent/CreateUser";
import UpdateUser from "./components/TableComponent/UpdateUser";
import Users from "./components/TableComponent/Users";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Contect from "./components/Contact";
import Colleges from "./components/College/Colleges";
import CreateCollegeDetailsForm from "./components/College/CreateCollegeDetailsForm";
import UpdateCollegeDetails from "./components/College/UpdateCollegeDetails";
import Department from "./components/Department/Department";
import ProfessorTable from "./components/Professors/ProfessorTable";

function App() { 
  const[user ,setLoginUser] = useState({})
  return (
    <div className="App">

      <Routes>

       <Route exact path="/" element={
          user && user._id ? <Layout /> : <Login setLoginUser={setLoginUser}/>  
        }></Route>

        <Route path="/register" element={<Register />}></Route>
        
        <Route path="/login" element={
         <Login setLoginUser ={setLoginUser} />
        }>
        </Route>

        <Route path="/dashboard" element={<Dashboard/>}></Route>

        <Route path="/student" element={<Students/>}></Route>
        <Route path="/contact" element={<Contect/>}></Route>
        <Route path="/layout" element={<Layout/>}></Route>
        <Route path="/user" element={<Users/>}></Route>
        {/* <Route path="/create" element={<CreateUser/>}></Route> */}
        <Route path="/update/:id" element={<UpdateUser/>}></Route>

        <Route path="/college" element={<Colleges/>}></Route>
        <Route path="/addColleges" element={<CreateCollegeDetailsForm/>}></Route>
        <Route path="/updateCollegeData/:id" element={<UpdateCollegeDetails/>}></Route>

        <Route path="/department" element={<Department/>}></Route>

        <Route path="/professor" element={<ProfessorTable/>}></Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
