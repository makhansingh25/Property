const Room = require("../models/roomModel");
const streamUpload = require("../config/streamupload");
const cloudinary = require("../config/claudnary");

// Upload new property
const property = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, price, location, room, bathroom, ac, freeze, heater } =
      req.body;

    let imageUrl = null;
    if (req.file) {
      const uploadResult = await streamUpload(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const newProperty = new Room({
      name,
      price,
      location,
      room,
      bathroom,
      ac,
      freeze,
      heater,
      image: imageUrl,
      user_id: userId,
    });

    const savedProperty = await newProperty.save();

    res
      .status(201)
      .json({ message: "Property added", property: savedProperty, imageUrl });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};

// Get all properties for a specific user
const getProperty = async (req, res) => {
  try {
    const userId = req.user.id;
    const properties = await Room.find({ user_id: userId });
    res.status(200).json({ property: properties });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};

// Get all properties (for listing, admin, etc.)
const getallproperty = async (req, res) => {
  try {
    const properties = await Room.find();
    res.status(200).json({ property: properties });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};

// Get latest 2 properties (sorted by creation date)
const latestProperty = async (req, res) => {
  try {
    const properties = await Room.find().sort({ createdAt: -1 }).limit(2);
    res.status(200).json({ property: properties });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Room.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Delete from Cloudinary if image exists
    if (property.image) {
      const publicId = getPublicIdFromUrl(property.image);
      await cloudinary.uploader.destroy(publicId);
    }

    await Room.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Property and image deleted successfully" });
  } catch (error) {
    console.error("Deletion error:", error);
    res.status(500).json({ error: "Server error during deletion" });
  }
};

// Get property details
const getPropertyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Room.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res
      .status(200)
      .json({ message: "Property fetched successfully", property });
  } catch (error) {
    console.error("Detail fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const existingProperty = await Room.findById(id);
    if (!existingProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Upload new image if provided
    if (req.file) {
      const uploadResult = await streamUpload(req.file.buffer);
      const newImageUrl = uploadResult.secure_url;

      // Delete old image
      if (existingProperty.image) {
        const publicId = getPublicIdFromUrl(existingProperty.image);
        await cloudinary.uploader.destroy(publicId);
      }

      updateData.image = newImageUrl;
    }

    await Room.findByIdAndUpdate(id, updateData, { new: true });
    const updatedProperty = await Room.findById(id);

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper to get publicId from Cloudinary URL
function getPublicIdFromUrl(url) {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return filename.split(".")[0];
}

module.exports = {
  property,
  getProperty,
  getallproperty,
  latestProperty,
  deleteProperty,
  getPropertyDetail,
  updateProperty,
};
