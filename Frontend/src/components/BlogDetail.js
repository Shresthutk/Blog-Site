import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL:data.blog.imageURL
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        imageURL:inputs.imageURL
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };

  return (
    <div>
      {inputs && (
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
      )}
    </div>
  );
};

export default BlogDetail;
