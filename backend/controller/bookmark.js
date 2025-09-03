const Bookmark = require("../models/bookmarkModel");
const Room = require("../models/roomModel"); // Assuming you have a Mongoose Room model

// Toggle bookmark
const bookmark = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.user.id;

  if (!userId || !propertyId) {
    return res
      .status(400)
      .json({ message: "User ID and Property ID are required" });
  }

  try {
    const existing = await Bookmark.findOne({
      user_id: userId,
      property_id: propertyId,
    });

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Unbookmarked" });
    } else {
      await Bookmark.create({
        user_id: userId,
        property_id: propertyId,
      });

      return res.status(201).json({ message: "Bookmarked" });
    }
  } catch (error) {
    console.error("Error in bookmark toggle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all bookmarks for user
const getBookmarks = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookmarks = await Bookmark.find({ user_id: userId }).populate(
      "property_id"
    );

    // Optional: Format response to return populated room info only
    const roomData = bookmarks.map((b) => b.property_id);

    res.status(200).json({ message: "Bookmarks", bookmarks: roomData });
  } catch (err) {
    console.error("Error getting bookmarks:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Check if a property is bookmarked
const checkBookmark = async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.user.id;

  try {
    const existing = await Bookmark.findOne({
      user_id: userId,
      property_id: propertyId,
    });

    res.status(200).json({ bookmarked: !!existing });
  } catch (error) {
    console.error("Error checking bookmark:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  bookmark,
  getBookmarks,
  checkBookmark,
};
