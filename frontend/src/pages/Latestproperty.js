import React, { useEffect, useState } from "react";
import Spinner from "../pages/Spinner";
import { useAuth } from "../auth/Auth";
import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";

const LatestProperty = () => {
  const [Property, setProperty] = useState([]);
  const [loader, setLoader] = useState(true);
  const { AuthorizationToken } = useAuth();
  const getproperty = async () => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${URL}/latestproperty`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();
      setProperty(data.property);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getproperty();
  }, [AuthorizationToken]);

  return (
    <div>
      <style>
        {`
          .property-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
          }
          .property-cards {
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            height: 250px;
            position: relative;
          }
          .property-cards:hover {
            transform: scale(1.03);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
          }
          .property-images {
            width: 40%;
            object-fit: cover;
            object-position: center;
          }
          .property-infos {
            padding: 1.5rem;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
          }
          .property-names {
            font-size: 1.5rem;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }
          .property-locations {
            color: #6b7280;
            margin-bottom: 1rem;
            
          }
            .locationIcon{
            padding-right:4px;
            color:red
            }
          .property-featuress {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #374151;
            font-size: 0.95rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .property-featuress li {
            margin-bottom: 0.4rem;
            
            
          }
          .prices {
            position: absolute;
            z-index: 1;
            left: 10px;
            background-color: white;
            padding: 2px 6px;
            border-radius: 20%;
            opacity: 80%;
          }
  
          .latest-container {
            background-color: rgb(239 246 255);
            width: 100%;
          }
          .latestheading {
            text-align: center;
            padding-top: 20px;
            font-size: 25px;
            color: rgb(112 149 255);
            margin: 0;
          }
        `}
      </style>
      <div className="latest-container">
        <h3 className="latestheading">Latest Property</h3>
        {loader ? (
          <Spinner />
        ) : Property.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
            No property found.
          </p>
        ) : (
          <div className="property-content">
            {Property.map((property) => (
              <div className="property-cards" key={property._id}>
                {property.image && (
                  <img
                    src={property.image}
                    alt={property.name}
                    className="property-images"
                  />
                )}
                <p className="prices">
                  <strong>${property.price}</strong>
                </p>
                <div className="property-infos">
                  <h2 className="property-names">{property.name}</h2>
                  <p className="property-locations">
                    <strong className="locationIcon">
                      <ImLocation2 />
                    </strong>
                    {property.location}
                  </p>
                  <ul className="property-featuress">
                    <li>
                      <strong>Room:</strong> {property.room}
                    </li>
                    <li>
                      <strong>Bathroom:</strong> {property.bathroom}
                    </li>
                    <li>
                      <strong>AC:</strong> {property.ac ? "Yes" : "No"}
                    </li>
                    <li>
                      <strong>Fridge:</strong> {property.freeze ? "Yes" : "No"}
                    </li>
                    <li>
                      <strong>Heater:</strong> {property.heater ? "Yes" : "No"}
                    </li>
                  </ul>
                  <div className="detailbtn">
                    <Link to={`/propertydetail/${property._id}`}>Details</Link>
                  </div>
                  {/* <div className="bookmarkButtonWrapper">
                    <BookmarkButton propertyId={property.id} />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProperty;
