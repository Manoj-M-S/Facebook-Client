import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link } from "react-router-dom";

const Home = () => {
  const [pics, setPics] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    fetch(`${API}/feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result);
      });
  }, [token]);

 

  return (
    <App>
      {isAuthenticated() ? (
        pics.length > 0 ? (
          pics.map((item) => {
            return (
              <div key={item._id}>
                <div className="card home-card">
                  <span className="card-title">
                    <h5 style={{ padding: "7px" }}>
                      
                        {item.postedBy}

                      
                    </h5>
                  </span>
   
                  <div className="card-content">
            
                    <h6>
                      <b>Title : </b>
                      {item.title}
                    </h6>
                    <h6>
                      <b>Body :</b> {item.body}
                    </h6>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Loading!</h2>
        )
      ) : (
        <Redirect to="/signup" />
      )}
    </App>
  );
};

export default Home;
