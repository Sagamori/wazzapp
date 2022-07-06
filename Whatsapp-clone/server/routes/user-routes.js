const express = require("express");
const {
  register,
  sendCode,
  verify,
  login,
} = require("../controllers/controllers");
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// router.get("/users", verifyToken, getUsers);
router.post("/registration", register.bind());
router.post("/sendCode", sendCode.bind());
router.post("/verify", verify.bind());
router.post("/login", login.bind());
// router.get("/token", refreshToken);
// router.delete("/logout", Logout);

module.exports = router;
