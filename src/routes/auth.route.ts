import express from 'express';
import {verifyToken} from '../controllers/auth.controller';
const router = express.Router();

router.get('/VerifyToken', verifyToken);

export default router;
