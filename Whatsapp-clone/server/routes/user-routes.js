const express = require("express");
const register = require("../controllers/controllers");
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// router.get("/users", verifyToken, getUsers);
router.post("/registration", register.bind());
// router.post("/login", Login);
// router.get("/token", refreshToken);
// router.delete("/logout", Logout);

module.exports = router;
