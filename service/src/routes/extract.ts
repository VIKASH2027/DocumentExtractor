import express from 'express';
import uploadFile from '../middleware/multer';
import { extractDocument } from '../controllers/extractConroller';

const router = express.Router();

router.post('/extract', uploadFile, extractDocument);

export default router;