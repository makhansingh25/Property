const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    image: String,
    price: String,
    name: { type: String, required: true },
    location: { type: String, required: true },
    room: { type: String, required: true },
    bathroom: { type: String, required: true },
    ac: Boolean,
    freeze: Boolean,
    heater: Boolean,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
