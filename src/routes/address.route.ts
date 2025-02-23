import express from 'express';
import {
  createAddress,
  deleteAddress,
  getAddressByUserId,
  updateAddress,
  updateDefaultAddress,
} from '../controllers/address.controller';
import {authenticateToken} from '../middleware/auth.middleware';

const router = express.Router();

router.get('/GetAddressByUserId', getAddressByUserId);

router.put('/UpdateDefaultAddress', updateDefaultAddress);

router.delete('/DeleteAddress', authenticateToken, deleteAddress);

router.post('/CreateAddress', createAddress);

router.put('/UpdateAddress', authenticateToken, updateAddress);
export default router;
