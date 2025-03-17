import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: "7d",
  });
};
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
