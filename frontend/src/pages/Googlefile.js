import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import toast from "react-hot-toast";

const GoogleLoginComponent = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth();
  const googleSigin = async (userInfo) => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;

      const res = await fetch(`${URL}/googleSignin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
  console.log("google user info", data);
      if (res.ok) {
        toast.success(data.message);
        storeToken(data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("something went wrong google sigin :", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={(response) => {
        const credential = response.credential;
        const userInfo = jwtDecode(credential);
        googleSigin(userInfo);
        console.log(userInfo);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginComponent;

// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const navigate = useNavigate();
//   const googleSigin = async (userInfo) => {
//     try {
//       const URL = "http://localhost:5000/api/v1";
//       const res = await fetch("http://localhost:5000/api/v1/client", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userInfo),
//       });
//       const data = await res.json();
//       console.log(data, "dfgdsgsdf");
//       if (res.ok) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("something went wrong google sigin :", error);
//     }
//   };
//   return (
//     <GoogleLogin
//       onSuccess={(response) => {
//         const credential = response.credential;
//         const userInfo = jwtDecode(credential);
//         googleSigin(userInfo);
//       }}
//       onError={() => {
//         console.log("Login Failed");
//       }}
//     />
//   );
// };
// export default Login;
// exports.addclient = [
//   async (req, res) => {
//     const { name, email, sub } = req.body;
//     const user = await db("clients").where({ google_id: sub });
//     if (user.length === 0) {
//       await db("clients").insert({
//         google_id: sub,
//         name,
//         email,
//       });
//       res.status(201).json({ message: "user sigin successfully" });
//     } else {
//       console.log("something went wrong");
//     }
//   },
// ];
// Collapse
