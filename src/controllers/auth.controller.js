import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { SECRET_KEY } from "../config.js";
import User from "../models/user.models.js";


export const register = async (req, res) => {
  try {

    const { username, email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: passwordHash,
    })

    const savedUser = await user.save();

    const token = await createAccessToken({
      id: savedUser._id,
    })

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });

    return res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Password is incorrect" });

    const token = await createAccessToken({ id: userFound._id, username: userFound.username });

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });

    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

export const verifyToken = async (req, res) => {

  try {
    // || req.headers.authorization?.split(" ")[1]
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "No token provided" });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(400).json({ message: "Invalid token" });

      const userFound = await User.findById(decoded.id);
      if (!userFound) return res.status(400).json({ message: "User not found" });

      return res.status(200).json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      })
    });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

}

export const logout = async (req, res) => {


  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Controla el acceso a la cookie en diferentes sitios
    path: "/"
  });

  return res.status(200).json({ message: "Logged out successfully" });
}