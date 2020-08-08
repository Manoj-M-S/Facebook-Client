import React, { useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import { API } from "../backend";

const CreatePost = () => {
  const history = useHistory();
  const { user, token } = isAuthenticated();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const postedBy = user.name;
  const userId = user._id;


  const CreateaPost = (details) =>{
    fetch(`${API}/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.error) {
          M.toast({
            html: "Post Created Successful",
            classes: "#43a047 green darken-1",
          });
        } else {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-2",
          });
        }
      })
      .catch((error) => console.log(error))
    .then(() =>
    setTimeout(() => {
      history.push("/");
    }, 2500)
  ).catch((error) => console.log(error))}


  return (
    <App>
      <div className="card field">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #ff1744 blue accent-3"
          onClick={() =>  CreateaPost({postedBy, token, title, body, userId})}
        >
          Submit Post
        </button>
      </div>
    </App>
  );
};

export default CreatePost;
