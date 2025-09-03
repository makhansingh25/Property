import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useAuth } from "../auth/Auth";

const BookmarkButton = ({ propertyId, onSuccess }) => {
  const [bookmark, setBookmark] = useState(false);
  const { AuthorizationToken, users } = useAuth();

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const URL = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${URL}/bookmark/${propertyId}`, {
          headers: {
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookmark status");
        }

        const data = await response.json();
        console.log("Fetched bookmark status:", data);
        setBookmark(data.bookmarked);
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    if (propertyId) {
      fetchBookmarkStatus();
    }
  }, [propertyId]);

  const handleBookmark = async () => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${URL}/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify({ propertyId }),
      });

      const data = await response.json();

      if (data.message === "Bookmarked") {
        setBookmark(true);
        toast.success("Added to bookmarks");
      } else if (data.message === "Unbookmarked") {
        setBookmark(false);
        toast.success("Removed from bookmarks");
        onSuccess();
      } else {
        toast.error(data.message || "Bookmark action failed");
      }
    } catch (error) {
      console.error("Bookmark failed:", error);
      toast.error("you need to signup first");
    }
  };

  return (
    <button onClick={handleBookmark}>
      {bookmark ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default BookmarkButton;
