import express from 'express';
import {sendMessage, getMessages} from '../controllers/message.controller';

const router = express.Router();

router.post('/messages/send', sendMessage);
router.get('/messages/getMessages', getMessages);

export default router;
