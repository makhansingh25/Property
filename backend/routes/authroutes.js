const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authcontroller");
const authmidddleware = require("../middleware/authmiddleware");
const bookmark = require("../controller/bookmark");
const upload = require("../config/multer");

router.post("/signup", upload.single("image"), authcontroller.signup);
router.post("/signin", authcontroller.signin);
router.get("/user", authmidddleware, authcontroller.user);
router.post("/bookmark", authmidddleware, bookmark.bookmark);
router.get("/bookmark", authmidddleware, bookmark.getBookmarks);
router.get("/bookmark/:propertyId", authmidddleware, bookmark.checkBookmark);
router.post("/googleSignin", authcontroller.googleSignin);
router.delete("/deleteuser/:id", authcontroller.DeleteUser);

module.exports = router;
