import toast from "react-hot-toast";
const DeleteMessage = ({ id, onSuccess }) => {
  const handleDelete = async () => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/messsages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.delMessage === 1) {
        onSuccess();
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div
      onClick={handleDelete}
      style={{
        backgroundColor: "rgb(29 78 216)",
        borderRadius: "5px",
        color: "white",
        padding: "2px 12px",
        textAlign: "center",
        width: "max-content",
      }}
    >
      Delete
    </div>
  );
};

export default DeleteMessage;
