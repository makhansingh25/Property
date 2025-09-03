import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="pagenotfound">
        <h1>404</h1>
        <h2>PAGE NOT FOUND !</h2>
        <div className="homepage">
          <Link to="/">Go to Home</Link>
        </div>
      </div>
      <style>{`
        .pagenotfound {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2f3e46;
          text-align: center;
          animation: fadeIn 1s ease-in-out;
        }

        .pagenotfound h1 {
          font-size: 8rem;
          margin: 0;
          color:rgb(46, 98, 240);
        }

        .pagenotfound h2 {
          font-size: 2rem;
          font-weight: 400;
          margin-top: 10px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
          .homepage{
          background-color:rgb(46, 98, 240);
          padding:15px 30px;
          border-radius:32px
          }
          .homepage a{
          text-decoration:none;
          color:white;
          }
      `}</style>
    </>
  );
};

export default PageNotFound;
