import React from "react";

const Banner = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <style>
        {`
       
          .banner{
                padding-top:80px;
                text-align:center;
                 margin-bottom:80px;
                }
            .banner h1{
                    color:white;
                     font-size:70px;
                      margin:0;  
                      
                     }
            .banner p{
            font-size:22px;
            margin:0 0 30px 0;
             color:rgb(247, 249, 255);
            }
          .searchContainer input{
                           width:250px;
                           padding:13px;
                           border:none;
                           border-radius:6px;
                           margin-right:20px;
                            font-size:16px;
                            outline:none;
                          }
                            
                           .rentalSpan{
            animation: pulse 2s infinite;
            display: inline-block;
          
          }

          @keyframes pulse {
            0%, 100% {
              
              opacity: 50%;
            }
            50% {
           
              opacity: 90%;
            }
          }
           
                  
         
                          
        `}
      </style>
      <div className="main-containerss">
        <div className="banner">
          <h1>
            Find The Perfect <span className="rentalSpan">Rental</span>{" "}
          </h1>
          <p>Discover the perfect property that suits your needs.</p>
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search Property by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
