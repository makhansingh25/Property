import toast from "react-hot-toast";
const DeleteProperty = ({ id, onSuccess }) => {
  const handleDelete = async () => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${URL}/deleteproperty/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.deletepro === 1) {
        toast.success(data.message);
        onSuccess();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div
      onClick={handleDelete}
      style={{
        backgroundColor: "red",
        borderRadius: "5px",
        color: "white",
        padding: "5px 15px",
        cursor: "pointer",
      }}
    >
      Delete
    </div>
  );
};

export default DeleteProperty;
