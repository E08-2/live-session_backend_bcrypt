import express from "express";
import { albumsPost } from "../controllers/albumsController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import albumValidator from "../validators/albumValidator.js";

const router = express.Router();

router.post("/", requiredValues(["albumTitle", "band", "albumYear"]), albumValidator(), checkValidation, albumsPost);    // POST /albums

export default router;