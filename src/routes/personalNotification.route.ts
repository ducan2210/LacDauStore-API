import express from 'express';
import {verifyToken} from '../controllers/auth.controller';
import {getNotificationByUserID} from '../controllers/personalNotification.controller';
const router = express.Router();

router.get('/GetNotificationByUserID', getNotificationByUserID);

export default router;
