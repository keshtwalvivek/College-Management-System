import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

function Login({ setLoginUser }) {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }; 

  // const login = () => {
  //   axios.post("http://localhost:9002/login", user).then((res) => {
  //     // alert(res.data.message);
  //     if (res.data.message === "password did'nt match ") {
  //       Swal.fire({
  //         title: "Password did'nt match ",
  //         text: "Please enter correct password",
  //         icon: "error",
  //       });
  //     } else if (res.data.message === "user not registered ") {
  //       Swal.fire({
  //         title: "User Not Registered!",
  //         text: "before login you have to register !",
  //         icon: "info",
  //       });
  //     }
  //     else{
  //       Swal.fire({
  //           title: "Login sucessfully !!",
  //           icon: "success",
  //         });
  //     setLoginUser(res.data.user);

  //     navigateTo("/");
  //     }
  //   });
  // };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      if (res.data.message === "password did'nt match ") {
        setErrorMessage("Password didn't match.");
      } else if (res.data.message === "user not registered ") {
        setErrorMessage("User not registered.");
      } else {
        Swal.fire({
          title: "Login sucessfully !!",
          icon: "success",
        });
        setLoginUser(res.data.user);
        navigateTo("/");
      }
    });
  };

  return (
    <div className="login">
      {console.log(user)}
      <h1>Login page</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handelChange}
        placeholder="Enter your Email"
      />
      <br></br>

      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handelChange}
        placeholder="Enter your Password"
      />
      {errorMessage && <p className="text-left text-red-500">{errorMessage}</p>}

      <div className="button" onClick={() => login()}>
        Login
      </div>
      <div>Or</div>
      <div className="button" onClick={() => navigateTo("/register")}>
        Register
      </div>
    </div>
  );
}

export default Login;
