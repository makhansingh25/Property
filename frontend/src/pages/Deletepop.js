import { Link } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import { useAuth } from "../auth/Auth";
import { MdDeleteForever } from "react-icons/md";

const Deletepop = () => {
  const { users } = useAuth();
  return (
    <div className="overlay">
      <div className="popup">
        <div className="deletecon">
          <MdDeleteForever className="deleteicon" />
        </div>
        <h3>Are you sure you want to delete this account</h3>
        <p>If you want to delete this account you could-not signin again</p>
        <div className="delbtn">
          <Link to={"/"}>No</Link>
          <DeleteAccount id={users._id} />
        </div>
      </div>
    </div>
  );
};

export default Deletepop;
