import {updateUser} from './../controllers/user.controller';
import express from 'express';
import {
  createUser,
  getUserByUsername,
  login,
} from '../controllers/user.controller';
import {authenticateToken} from '../middleware/auth.middleware';

const router = express.Router();

router.post('/CreateUser', createUser);
router.post('/Login', login);
router.get('/GetUser', authenticateToken, getUserByUsername);

router.put('/UpdateUser', authenticateToken, updateUser);
export default router;
