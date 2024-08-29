import express from "express"
import Authenticate from "../middleware.js";
import { GetStream, GetStreamByID, saveStream } from "../controllers/streamControllers.js";
const router = express.Router();

router.get('/',Authenticate,  GetStream);
router.get('/:roomID',  GetStreamByID );
router.post('/', Authenticate, saveStream);
export default router;