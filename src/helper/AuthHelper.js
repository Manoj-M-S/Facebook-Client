import { API } from "../backend";

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("loggedIn")) {
    return JSON.parse(localStorage.getItem("loggedIn"));
  } else {
    return false;
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedIn");
    next();

    return fetch(`${API}/logout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout Successs"))

      .catch((error) => console.log(error));
  }
};
