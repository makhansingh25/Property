import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import toast from "react-hot-toast";

const DeleteAccount = ({ id }) => {
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const DeleteHandle = async () => {
    const URL = process.env.REACT_APP_BACKEND_URL;

    const response = await fetch(`${URL}/deleteuser/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    if (data.deleted) {
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
