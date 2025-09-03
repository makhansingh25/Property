const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Corrected field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
