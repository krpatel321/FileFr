import nodemailer from "nodemailer";
import File from "../models/File";
import { sendEmail } from "../utils/sendEmail";

export const purchaseFile = async (req: any, res: any) => {
  try {
    const { fileId, email, paymentMethod } = req.body;

    await sendEmail(
      email,
      "Purchase Successful 🎉",
      `You purchased file ${fileId} using ${paymentMethod}`
    );

    res.status(200).json({ message: "Purchase successful" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getSingleFile = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id).populate("creator");

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file" });
  }
};