import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {console.log("something went wrong")
      naviagte('/error')
      return;
    });
      
    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="form">
      <div className="title"> {isSignup ? "Signup" : "Login"}</div>
      <div className="input-container ic1">
        <input id="name" className="input" type="text" placeholder="Name"  name="name" required onChange={handleChange}  value={inputs.name}  />
      </div >
      <div className="input-container ic2 textarea">
        <input id="email" className="input" type="email" placeholder="Email"  name="email" required onChange={handleChange}   value={inputs.email}/>
      </div>
      <div className="input-container ic2">
        <input id="password" className="input" type="text" placeholder="Password" name="password" required onChange={handleChange} value={inputs.password}
/>
      </div>
      <button type="text" className="submit">Submit</button>
      <button type="text" className="submit"  onClick={() => setIsSignup(!isSignup)}> {isSignup ? "Login" : "Signup"}</button>
    </div>
      </form>
    </div>
  );
};

export default Auth;
