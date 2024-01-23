import React,{useState,} from "react";
import './Register.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";


function Register(){
    const navigateTo = useNavigate(); 

    const[user ,setUser] = useState({
        name : "",
        email :"",
        password : "",
        reEnterPassword : ""
     });

    const handelChange = (e)=>{
      const{ name ,value} = e.target;
      setUser({
        ...user,
        [name] : value
      })
    }

    const register =()=>{

      const{name,email,password,reEnterPassword} = user
      if(name && email && password && (password === reEnterPassword))
      {
         axios.post("http://localhost:9002/register",user)
         .then(res => {
          // alert(res.data.message);
           if(res.data.message === "user already registerd")
             {
              Swal.fire({
                title: "User Already Registerd",             
                icon: "warning"	
    
              });
             }

             else if(res.data.message === "Succsessfully Registerd , Please login now ")
             {
              Swal.fire({
                title: "Succsessfully Registerd !",
                text: "Please login now",
                icon: "success"
              });
             }
          navigateTo("/login")
        });
      }
      else{
        alert("invalid input")
      }
    }
    return(
        <div className="register">
           <h1>Register page</h1>
           <input type="text" name="name" value={user.name} onChange={handelChange} placeholder="Ente your Name"/><br></br>
           <input type="text" name="email" value={user.email} onChange={handelChange} placeholder="Enter your Email"/><br></br>
           <input type="password" name="password" value={user.password} onChange={handelChange} placeholder="Enter your Password"/>
           <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handelChange} placeholder="Re-enter  Password"/>
           
           <div className="button" onClick={register} >Register</div>
           <div>Or</div>
        
           <div className="button" onClick={()=> navigateTo("/login")}>Login</div>
        </div>
    );
}

export default Register;