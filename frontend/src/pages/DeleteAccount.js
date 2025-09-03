import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import toast from "react-hot-toast";

const DeleteAccount = ({ id }) => {
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const DeleteHandle = async () => {
    const response = await fetch(`http://localhost:3000/api/deleteuser/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    if (data.delted == 1) {
      storeToken("");
      navigate("/signup");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="btttn" onClick={DeleteHandle}>
      Yes
    </div>
  );
};

export default DeleteAccount;
