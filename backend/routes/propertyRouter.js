const express = require("express");
const propertyRoute = express.Router();
const propertytController = require("../controller/propertycontroller");
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../config/multer");

propertyRoute.post(
  "/property",
  authMiddleware,
  upload.single("image"),
  propertytController.property
);
propertyRoute.get(
  "/getproperty",
  authMiddleware,
  propertytController.getProperty
);

propertyRoute.get("/getallproperty", propertytController.getallproperty);
propertyRoute.get("/latestproperty", propertytController.latestProperty);
propertyRoute.delete("/deleteproperty/:id", propertytController.deleteProperty);

propertyRoute.get(
  "/getPropertyDetail/:id",
  propertytController.getPropertyDetail
);

propertyRoute.put(
  "/updateproperty/:id",
  upload.single("image"),
  propertytController.updateProperty
);

module.exports = propertyRoute;
