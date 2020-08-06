import React, { useState } from "react";
import App from "../App";
import { Link, useHistory } from "react-router-dom";
import { API } from "../backend";
import M from "materialize-css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const signup = (user) => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.error) {
          M.toast({
            html: "Signup Successful",
            classes: "#43a047 green darken-1",
          });
          setTimeout(() => {
            history.push("/");
          }, 250);
        } else {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-2",
          });
        }
      })
      .catch((error) => console.log(error));
  };

 

  return (
    <App>
      <div>
        <div className="signupcard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
            <button
              className="btn waves-effect waves-light #ff1744 red accent-3"
              onClick={() => signup({ name, email, password })}
            >
              Signup
            </button>
            <h6 className="text-lighten-3">
              Already have an account ?
              <Link to="/login" className="link">
                login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Signup;
