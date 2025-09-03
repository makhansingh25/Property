import React from "react";

const Loading = ({ message = "Loading..." }) => {
  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "6px solid #ccc",
      borderTop: "6px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    text: {
      marginTop: "1rem",
      fontSize: "1.2rem",
      color: "#333",
    },
    "@keyframes": `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  };

  return (
    <div style={styles.wrapper}>
      <style>{styles["@keyframes"]}</style>
      <div style={styles.spinner}></div>
      <div style={styles.text}>{message}</div>
    </div>
  );
};

export default Loading;
