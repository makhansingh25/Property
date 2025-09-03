const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");
const messageRoute = express.Router();
const messageController = require("../controller/messagecontroller");

messageRoute.post("/messsages", authMiddleware, messageController.messages);
messageRoute.get("/messsages", authMiddleware, messageController.getMessages);
messageRoute.delete(
  "/messsages/:id",
  authMiddleware,
  messageController.deleteMessage
);

module.exports = messageRoute;
