import React from "react";
import { Link } from "react-router-dom";
import DeleteAccount from "./src/pages/DeleteAccount";

const DeleteMessage = ({ id }) => {
  return (
    <div>
      <h1>Are you sure you want to delete this account</h1>
      <p>if you delete this account you could-not sigin again</p>
      <Link to={"/"}>No</Link>
      <DeleteAccount id={id} />
    </div>
  );
};

export default DeleteMessage;
