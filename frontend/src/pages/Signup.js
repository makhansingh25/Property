import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
const Signup = () => {
  document.title = "Property Pulse - Sign-Up";

  const navigate = useNavigate();
  const { storeToken } = useAuth();
  const [formData, setFormData] = useState({
    image: null,
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const URL = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${URL}/signup`, {
        method: "POST",
        body: data,
      });

      const datas = await response.json();

      if (response.ok) {
        storeToken(datas.token);
        toast.success(datas.message);
        navigate("/");
      } else {
        console.error("Signup failed:", datas.errors);
        toast.error(datas.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={styles.form}
      >
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
        <p>
          already have an account?<Link to="/signin">SignIn</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    fontWeight: "bold",
  },
};

export default Signup;
