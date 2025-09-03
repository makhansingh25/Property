import { useEffect, useState } from "react";
import { useAuth } from "../auth/Auth";
import DeleteMessage from "./DeleteMessage";

const GetMessage = () => {
  document.title = "Property Pulse - Message";

  const { messages, setMessage, AuthorizationToken } = useAuth();
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/messsages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
        });

        const data = await response.json();
        setMessage(data.messages);
        console.log(data.messages);
      } catch (err) {
        console.error(
          "Failed to fetch message:",
          err.data?.data || err.message
        );
      }
    };

    fetchMessage();
  }, [refresh]);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="message-wrapper">
      <style>{`
        .message-wrapper {
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 600px;
          margin: auto;
        }

        .search-box {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 25px;
          font-size: 1rem;
        }

        .message-count {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .message-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message-card {
          background-color: #e8f0fe;
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .message-card h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .message-card p {
          margin: 0.25rem 0;
          font-size: 0.95rem;
          color: #333;
        }

        .no-message {
          text-align: center;
          color: #888;
          font-size: 1.2rem;
        }

        @media (min-width: 768px) {
          .message-wrapper {
            padding: 2rem;
          }

          .search-box {
            font-size: 1.1rem;
          }

          .message-card h4,
          .message-card p {
            font-size: 1rem;
          }
        }
      `}</style>

      <input
        className="search-box"
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="message-count">
        Total Messages: {filteredMessages.length}
      </div>

      <div className="message-list">
        {filteredMessages.length === 0 ? (
          <div className="no-message">No message found</div>
        ) : (
          filteredMessages.map((message, index) => (
            <div key={index} className="message-card">
              <h2>Property : {message.room_name}</h2>
              <h3>Location : {message.location}</h3>
              <p>Price : ${message.room_price}</p>
              <h4>{message.name}</h4>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Mobile:</strong> {message.mobile}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
              <DeleteMessage
                id={message._id}
                onSuccess={() => setRefresh(!refresh)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetMessage;
