import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/house.png";
import { useAuth } from "../auth/Auth";
import { AiFillMessage } from "react-icons/ai";

const Navbar = () => {
  const { islogedIn, users, messages } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="navbar-container">
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} alt="Logo" />
            PropertyPulse
          </div>
        </Link>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li> </li>
            {islogedIn ? (
              <>
                <li>
                  <Link to="/property">Property</Link>
                </li>
                <li>
                  <Link to="/addproperty">Add Property</Link>
                </li>
                <li>
                  <Link to="/message">
                    <AiFillMessage
                      style={{
                        width: "22px",
                        height: "30px",
                        position: "relative",
                      }}
                    />
                    {messages.length === 0 ? (
                      <span className="newMessage-not"></span>
                    ) : (
                      <span className="newMessage">{messages.length}</span>
                    )}
                  </Link>
                </li>
                <li className="profile-icon" onClick={toggleDropdown}>
                  <img
                    key={users.image}
                    src={
                      users?.image
                        ? users.image
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    alt={users.username || users.name}
                    title={users.username || users.name}
                    className="logo-icon"
                  />

                  {isDropdownOpen && (
                    <div className="profile-content">
                      <Link className="a" to="/profile">
                        Profile
                      </Link>
                      <Link className="a" to="/Saveproperty">
                        Bookmarks
                      </Link>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
