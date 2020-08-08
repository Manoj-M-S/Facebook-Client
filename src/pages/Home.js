import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [pics, setPics] = useState([]);
  const {  token } = isAuthenticated();

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
                  <div className="card-content">
                  <h5 >
                        <b>{item.postedBy}</b>
                    </h5>
                    <h5>
                      <b>Title : </b>
                      {item.title}
                    </h5>
                    <h5>
                      <b>Body :</b> {item.body}
                    </h5>
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
