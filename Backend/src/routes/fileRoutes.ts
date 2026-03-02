import express from "express";
import upload from "../middleware/upload";
import { uploadFile, getFiles } from "../controllers/fileController";
// import { uploadFile } from "../controllers/fileController";
import { protect } from "../middleware/authMiddleware";
import { getMyFiles,getMyPurchases ,getFileById} from "../controllers/fileController";
import { purchaseFile,getSingleFile } from "../controllers/purchaseController";
const router = express.Router();



// router.get("/files/download/:id", getFileById);
router.get("/files/:id", getFileById);
// router.post("/upload", upload.single("file"), uploadFile);
router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/", getFiles);
router.post("/purchase", purchaseFile);
router.get("/:id", getSingleFile);
router.get("/my-purchases", protect, getMyPurchases);
router.get("/my-files", protect, getMyFiles);

router.get("/my-purchases", getMyPurchases);

// router.get("/", getFiles);

export default router;