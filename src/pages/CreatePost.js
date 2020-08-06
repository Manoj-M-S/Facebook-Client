import React, { useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { CreateaPost } from "../helper/PostHelper";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const { user, token } = isAuthenticated();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const postedBy = user.name;
  const userId = user._id;



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
          className="btn waves-effect waves-light #ff1744 red accent-3"
          onClick={() =>  {CreateaPost( postedBy, token, title, body, userId).then(() =>
        setTimeout(() => {
          history.push("/");
        }, 2500)
      )
      .catch((err) => {
        console.log(err);
      });}}
        >
          Submit Post
        </button>
      </div>
    </App>
  );
};

export default CreatePost;
