const Message = require("../models/messageModel");

// Send message
const messages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId, message, ReceiverId, name, mobile, email } = req.body;

    if (userId === ReceiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send a message to yourself." });
    }

    await Message.create({
      name,
      mobile,
      email,
      message,
      user_id: userId,
      receiver: ReceiverId,
      property_id: propertyId,
    });

    res.status(200).json({ message: "Message has been sent successfully." });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get all messages received by user
const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({ receiver: userId })
      .populate("property_id", "name price location") // Populate room details
      .populate("user_id", "_id"); // Optional: populate sender info

    const formattedMessages = messages.map((msg) => ({
      id: msg._id,
      message: msg.message,
      name: msg.name,
      email: msg.email,
      mobile: msg.mobile,
      property_id: msg.property_id?._id,
      sender_id: msg.user_id?._id,
      receiver_id: msg.receiver,
      room_name: msg.property_id?.name,
      room_price: msg.property_id?.price,
      location: msg.property_id?.location,
    }));

    res.status(200).json({ messages: formattedMessages });
  } catch (error) {
    console.error("Get messages error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching messages." });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json({
      message: "Message deleted successfully",
      deletedMessage: deleted,
    });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  messages,
  getMessages,
  deleteMessage,
};
