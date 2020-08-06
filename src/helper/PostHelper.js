import M from "materialize-css";
import { API } from "../backend";

export const CreateaPost = (
  postedBy,
  token,
  title,
  body,
  userId
) => {
  fetch(`${API}/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
      postedBy,
      userId,
    }),
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
    .catch((error) => console.log(error));
};



