import { MdLocationPin } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import { TbFridge } from "react-icons/tb";
import { LuHeater } from "react-icons/lu";
import { Link } from "react-router-dom";
import BookmarkButton from "./Bookmark";
import emptyPro from "../assets/images/NotFound.jpg";
import { useAuth } from "../auth/Auth";
import { useEffect, useState } from "react";

const BookmarkList = () => {
  document.title = "Property Pulse Bookmark";
  const [bookmarks, setBookmarks] = useState([]);
  const { AuthorizationToken } = useAuth();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/bookmark`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookmark");
        }

        const data = await response.json();
        console.log(data);
        setBookmarks(data.bookmarks);
      } catch (err) {
        console.error(
          "Failed to fetch bookmarks:",
          err.data?.data || err.message
        );
      }
    };

    fetchBookmarks();
  }, [refresh]);
  return (
    <div className="property-grid">
      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <img src={emptyPro} alt="No properties" className="empty-image" />
          <p>No Bookmark found</p>
        </div>
      ) : (
        bookmarks.map((property) => (
          <div className="property-card" key={property._id}>
            {property.image && (
              <img
                src={property.image}
                alt={property.name}
                className="property-image"
              />
            )}
            <div className="bookmarkButtonWrapper">
              <BookmarkButton
                propertyId={property._id}
                onSuccess={() => setRefresh(!refresh)}
              />
            </div>
            <p className="price-tag">
              <strong>${property.price}</strong>
            </p>
            <div className="property-info">
              <h2 className="property-name">{property.name}</h2>
              <p className="property-location">
                <MdLocationPin className="location-icon" /> Location:{" "}
                {property.location}
              </p>
              <ul className="features-list">
                <li className="feature-item">
                  <strong>
                    <IoIosBed className="feature-icon" /> Room:
                  </strong>{" "}
                  {property.room}
                </li>
                <li className="feature-item">
                  <strong>
                    <FaBath className="feature-icon" /> Bathroom:
                  </strong>{" "}
                  {property.bathroom}
                </li>
                <li className="feature-item">
                  <strong>
                    <FaNewspaper className="feature-icon" /> AC:
                  </strong>{" "}
                  {property.ac ? "Yes" : "No"}
                </li>
                <li className="feature-item">
                  <strong>
                    <TbFridge className="feature-icon" /> Fridge:
                  </strong>{" "}
                  {property.freeze ? "Yes" : "No"}
                </li>
                <li className="feature-item">
                  <strong>
                    <LuHeater className="feature-icon" /> Heater:
                  </strong>{" "}
                  {property.heater ? "Yes" : "No"}
                </li>
              </ul>

              <div className="detailbtn">
                <Link to={`/propertydetail/${property._id}`}>Details</Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkList;
