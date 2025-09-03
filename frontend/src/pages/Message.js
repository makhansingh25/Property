import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../auth/Auth";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Message = ({ propertyId, ReceiverId }) => {
  const { AuthorizationToken, token } = useAuth();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const URL = process.env.REACT_APP_BACKEND_URL;

      if (!token) {
        toast.error("You need to sign in first");
        navigate("/signin");
        return;
      }

      const response = await fetch(`${URL}/messsages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({
          propertyId,
          ReceiverId,
          ...formData,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Invalid JSON response from server");
      }

      if (response.ok) {
        toast.success(data?.data?.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else {
        toast.error(data?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <Loading />;
  }

  return (
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            minLength={12}
            maxLength={25}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="1234567890"
            value={formData.mobile}
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <input
            type="text"
            name="message"
            placeholder="I want this property"
            value={formData.message}
            onChange={handleChange}
            maxLength={100}
            minLength={10}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Message;
