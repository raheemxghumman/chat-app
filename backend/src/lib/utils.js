import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const secret = process.env.JWT_SECRET || "dev-secret-change-me";
  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    secure: isProd,
  });

  return token;
};
