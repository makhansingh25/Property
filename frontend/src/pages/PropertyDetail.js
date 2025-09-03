import React, { useEffect, useState } from "react";
import BookmarkButton from "./Bookmark";
import { MdLocationPin } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import { TbFridge } from "react-icons/tb";
import { LuHeater } from "react-icons/lu";
import { useParams } from "react-router-dom";
import Message from "./Message";

const PropertyDetail = () => {
  const [properties, setProperties] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProperties = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/getPropertyDetail/${id}`);

        const data = await response.json();
        setProperties([data.property]);
      } catch (error) {
        console.error("Error fetching property:", error.message);
      }
    };

    getProperties();
  }, [id]);

  const styles = {
    mainContainer: {
      padding: "2rem",
      background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
      minHeight: "100vh",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem",
      padding: "1rem",
    },
    propertyCard: {
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      background: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      transition: "transform 0.3s ease",
    },
    bookmarkButtonWrapper: {
      position: "absolute",
      top: "15px",
      right: "15px",
      zIndex: 1,
    },
    propertyImage: {
      width: "100%",
      height: "240px",
      objectFit: "cover",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
    },
    price: {
      position: "absolute",
      top: "10px",
      left: "15px",
      backgroundColor: "#ffffffdd",
      padding: "6px 12px",
      borderRadius: "15px",
      fontWeight: "bold",
      fontSize: "15px",
      color: "#1f2937",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    propertyInfo: {
      padding: "1.5rem",
    },
    propertyName: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#111827",
      textAlign: "center",
      marginBottom: "0.5rem",
    },
    propertyLocation: {
      fontSize: "16px",
      color: "#6b7280",
      marginBottom: "1rem",
      textAlign: "center",
    },
    locationIcon: {
      color: "#ef4444",
      marginRight: "6px",
    },
    featuresList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px",
      padding: "10px 12px",
      borderRadius: "10px",
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    featureicon: {
      fontSize: "18px",
      backgroundColor: "#dbeafe",
      color: "#2563eb",
      padding: "6px",
      borderRadius: "50%",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        {properties.map((property) => (
          <div key={property.id} style={styles.propertyCard}>
            <div style={styles.bookmarkButtonWrapper}>
              <BookmarkButton propertyId={property._id} />
            </div>
            {property.image && (
              <img
                src={property.image}
                alt={property.name}
                style={styles.propertyImage}
              />
            )}
            <div style={styles.price}>${property.price}</div>

            <div style={styles.propertyInfo}>
              <h2 style={styles.propertyName}>{property.name}</h2>
              <p style={styles.propertyLocation}>
                <MdLocationPin style={styles.locationIcon} />
                Location: {property.location}
              </p>
              <ul style={styles.featuresList}>
                <li style={styles.featureItem}>
                  <IoIosBed style={styles.featureicon} />
                  <strong>Room </strong> {property.room}
                </li>
                <li style={styles.featureItem}>
                  <FaBath style={styles.featureicon} />
                  <strong>Bathroom </strong> {property.bathroom}
                </li>
                <li style={styles.featureItem}>
                  <FaNewspaper style={styles.featureicon} />
                  <strong>AC </strong> {property.ac ? "Yes" : "No"}
                </li>
                <li style={styles.featureItem}>
                  <TbFridge style={styles.featureicon} />
                  <strong>Fridge </strong> {property.freeze ? "Yes" : "No"}
                </li>
                <li style={styles.featureItem}>
                  <LuHeater style={styles.featureicon} />
                  <strong>Heater </strong> {property.heater ? "Yes" : "No"}
                </li>
              </ul>
            </div>

            <Message propertyId={property._id} ReceiverId={property.user_id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetail;
