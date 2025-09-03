import React, { useEffect, useState } from "react";
import LatestProperty from "./Latestproperty";
import BookmarkButton from "./Bookmark";
import { MdLocationPin } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import Spinner from "./Spinner";
import emptyPro from "../assets/images/NotFound.jpg";
import { useAuth } from "../auth/Auth";

const Home = () => {
  document.title = "Property Pulse";

  const { AuthorizationToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const itemsPerPage = 3;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = properties.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log("filter data from input filed ", filteredUsers);
  useEffect(() => {
    const getProperties = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/getallproperty`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        console.log("getallproperty", data);
        setProperties(data.property);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, [AuthorizationToken, refresh]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <LatestProperty />
      <div className="container">
        <h2>All Property</h2>
        {currentItems.length === 0 ? (
          <div className="empty-state">
            <img src={emptyPro} alt="No properties" className="empty-image" />
            <p>No properties found</p>
          </div>
        ) : (
          <div className="property-grid">
            {currentItems.map((property) => (
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

                  <ul className="features-list">
                    <li className="feature-item">
                      <strong>
                        <IoIosBed className="feature-icon" />
                      </strong>{" "}
                      {property.room} Room
                    </li>
                    <li className="feature-item">
                      <strong>
                        <FaBath className="feature-icon" />
                      </strong>{" "}
                      {property.bathroom} Bathroom
                    </li>
                  </ul>
                  <div className="propertyFooters">
                    <div className="property-location">
                      <MdLocationPin className="location-icon" />
                      {property.location}
                    </div>
                    <div className="detailbtn">
                      <Link to={`/propertydetail/${property._id}`}>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
