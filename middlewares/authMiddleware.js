import jwt from "jsonwebtoken";
import User from "../model/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
      console.log(error);
    }

    console.log("Cookies:", req.cookies);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please login again." });
    }

    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
