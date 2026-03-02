import multer from "multer";
import path from "path";
import Purchase from "../models/purchase";
import { Request, Response } from "express";
import File from "../models/File";
import { AuthRequest } from "../middleware/authMiddleware";

// import { Request, Response } from "express";
// import File from "../models/file.model";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { title, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/${req.file.filename}`;

    const newFile = await File.create({
      title,
      price,
      category,
      fileUrl,
      creator: req.body.creatorId, // later from JWT
    });

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getAllFiles = async (_req: Request, res: Response) => {
  const files = await File.find();
  res.json(files);
};




// export const uploadFile = async (req: Request, res: Response) => {
//   try {
//     const { title, description, price } = req.body;

//     const file = await File.create({
//       title,
//       description,
//       price,
//       fileUrl: `/uploads/${req.file?.filename}`,
//       fileType: req.file?.mimetype,
//     });

//     res.status(201).json(file);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getFiles = async (_: Request, res: Response) => {
  const files = await File.find();
  res.json(files);
};


export const getMyFiles = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const files = await File.find({
      creator: req.user.id,  // 🔥 Only this creator's files
    });

    res.json(files);
    // res.sendFile(files);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// import Purchase from "../models/purchase";


export const getMyPurchases = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const purchases = await Purchase.find({
      buyer: req.user.id,  // 🔥 Only this user's data
    }).populate("file");

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getFileById = async (
  req: Request,
  res: Response
) => {
  try {
    const file = await File.findById(req.params.id)
      .populate("creator", "fullName");

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json(file); // ✅ Send JSON not file
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};