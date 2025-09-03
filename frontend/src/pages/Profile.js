import { Link } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const Profile = () => {
  document.title = "Property Pulse Profile";
  const { users } = useAuth();
  console.log("this is new user ===>", users);
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f2f6fc",
      padding: "30px",
    },
    profile: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      textAlign: "center",
      width: "320px",
    },
    image: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "20px",

      objectPosition: "top",
    },
    username: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "8px",
    },
    email: {
      fontSize: "16px",
      color: "#777",
      marginBottom: "20px",
    },
    logoutSection: {
      marginTop: "20px",
      backgroundColor: "blue",
      padding: "6px 15px",
      color: "white",
      cursor: "pointer",
    },
    logoutLink: {
      textDecoration: "none",
      color: "#fff",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.profile}>
        <img
          key={users.image}
          src={
            users?.image
              ? users.image
              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={users.name}
          style={styles.image}
        />
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={styles.username}>{users.username}</li>
          <li style={styles.email}>{users.email}</li>
        </ul>
        <Link to={"/popup"} className="dlbtn_p">
          Delete Account
        </Link>
      </div>
      <div style={styles.logoutSection}>
        <Link to={"/logout"} style={styles.logoutLink}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Profile;
