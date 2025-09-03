import React, { useEffect, useState } from "react";
import DeleteProperty from "./DeleteProperty";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa6";
import Spinner from "./Spinner";
import emptyPro from "../assets/images/NotFound.jpg";
import { useAuth } from "../auth/Auth";

const Property = () => {
  document.title = "Property Pulse - Property";
  const { AuthorizationToken } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const itemsPerPage = 3;

  const getProperty = async () => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${URL}/getproperty`, {
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
      setProperties(data.property || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperty();
  }, [refresh]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
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
    <div className="container">
      <h2>Property</h2>
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
                  <div className="inner-ctn">
                    <div className="property-location">
                      <div className="innner-icon">
                        <MdLocationPin className="location-icon" />
                      </div>
                      <p>{property.location}</p>
                    </div>
                    <div className="next-ctb">
                      <DeleteProperty
                        id={property._id}
                        onSuccess={() => setRefresh(!refresh)}
                      />
                      <div className="detailbtn">
                        <Link to={`/updateproperty/${property._id}`}>
                          update
                        </Link>
                      </div>

                      <div className="detailbtn">
                        <Link to={`/propertydetail/${property._id}`}>
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

export default Property;
