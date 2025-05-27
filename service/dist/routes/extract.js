"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middleware/multer"));
const extractConroller_1 = require("../controllers/extractConroller");
const router = express_1.default.Router();
router.post('/extract', multer_1.default, extractConroller_1.extractDocument);
exports.default = router;
