import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const UpdateProperty = () => {
  document.title = "Property Pulse - update";
  const [loader, setLoader] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "",
    room: "",
    bathroom: "",
    ac: false,
    freeze: false,
    heater: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    const getProperties = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/getPropertyDetail/${id}`);

        const data = await response.json();
        setFormData(data.property);
      } catch (error) {
        console.error("Error fetching property:", error.message);
      }
    };

    getProperties();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateDdata = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key] === null) continue;
      updateDdata.append(key, formData[key]);
    }

    try {
      setLoader(true);
      const URL = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${URL}/updateproperty/${id}`, {
        method: "PUT",

        body: updateDdata,
      });
      const datas = await res.json();
      console.log(res);
      if (res.ok) {
        navigate("/property");

        toast.success(datas.message);
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoader(false);
    }
  };
  if (loader) {
    return <Loading />;
  }

  // ✨ Internal CSS Styling
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      padding: "20px",
    },
    form: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
      fontSize: "28px",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "bold",
      color: "#555",
      marginBottom: "10px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "15px",
      transition: "background 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 style={styles.heading}>Add Property</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Room:</label>
          <input
            type="number"
            name="room"
            value={formData.room}
            onChange={handleChange}
            min={"1"}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bathroom:</label>
          <input
            type="number"
            name="bathroom"
            value={formData.bathroom}
            onChange={handleChange}
            min={"1"}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={"1"}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="ac"
              checked={formData.ac}
              onChange={handleChange}
            />
            AC
          </label>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="freeze"
              checked={formData.freeze}
              onChange={handleChange}
            />
            Freeze
          </label>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="heater"
              checked={formData.heater}
              onChange={handleChange}
            />
            Heater
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
