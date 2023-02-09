import {
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import './Blog.css'
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <div >
  <div className="card">
  {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
    <div className="card__header">
      <img src={imageURL} alt="card__image" className="card__image" width="600"/>
    </div>
    <div className="card__body">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
    <div className="card__footer">
      <div className="user">
        <div className="user__info">
          <h5>{userName}</h5>
        </div>
      </div>
    </div>
  </div>
     </div>
  );
};

export default Blog;
