import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    console.log(decoded.id)

    req.user = { id: decoded.id };

    next();

  } catch (error) {
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
