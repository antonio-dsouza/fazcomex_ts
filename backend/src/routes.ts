import { Router } from "express";
import { DuesController } from "./controllers/DuesController";
import upload from "./config/upload";
import multer from "multer";

const multerUpload = multer(upload);
const router = Router();

const duesController = new DuesController();

router.get('/dues/:id', duesController.getDueById);
router.get('/dues', duesController.getDues);
router.patch('/dues/:id', duesController.updateDue);
router.post('/dues', multerUpload.single('json'), duesController.createDue);

export { router };