import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Createpost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  function postDetails() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "InstaClone");
    data.append("cloud_name", "sourav1234");
    fetch("	https://api.cloudinary.com/v1_1/sourav1234/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUrl(result.url);
        console.log("hi", url);
        fetch("/post/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            title: title,
            body: body,
            url: result.url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "#f44336 red" });
            } else {
              M.toast({ html: "Created post", classes: "#4caf50 green" });
              history.push("/");
            }
            console.log(data);
          });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div
      className="card input-filed mypost"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placehplder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placehplder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn #5c6bc0 indigo lighten-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn #5c6bc0 indigo lighten-1"
        type="submit"
        name="action"
        onClick={() => postDetails()}
      >
        Submit Post
      </button>
    </div>
  );
};

export default Createpost;
