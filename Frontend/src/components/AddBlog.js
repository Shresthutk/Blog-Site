import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import './AddBlog.css'

const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(inputs.title ==""|| inputs.description=="" || inputs.imageURL==""){
      return;
    }
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <>
    <div id="errordiv"></div>
      <form onSubmit={handleSubmit}>
         <div className="form">
      <div className="title" id="title">Post a blog</div>
      <div className="input-container ic1">
        <input id="title" className="input" type="text" placeholder="Title"  name="title" required onChange={handleChange}  value={inputs.title}  />
      </div >
      <div className="input-container ic2 textarea">
        <textarea id="description" className="input" type="text" placeholder="Description" required name="description" onChange={handleChange}   value={inputs.description}/>
      </div>
      <div className="input-container ic2">
        <input id="imageUrl" className="input" type="text" placeholder="Image URL" name="imageURL" required onChange={handleChange} value={inputs.imageURL}
/>
      </div>
      <button type="text" className="submit">Submit</button>
    </div>
    </form>
    </>
  );
};

export default AddBlog;
