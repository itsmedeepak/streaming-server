import express from "express"
import {SignIn, SignUp, ValidateToken} from "../controllers/authControllers.js"
import Authenticate from "../authenticate.js";
const router = express.Router();

router.post('/sign-in', SignIn);
router.post('/sign-up', SignUp);
router.post('/validate-token', Authenticate, ValidateToken)
export default router;