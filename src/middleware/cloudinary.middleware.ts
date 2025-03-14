import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: 'djasybdwi',
  api_key: '675872433191122',
  api_secret: 'DNOeWxVVXiZ8wQDb3yZcFPbhFKY',
});

// Cấu hình storage cho multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uploads',
    format: file.mimetype.split('/')[1],
    public_id: `${Date.now()}_${file.originalname}`,
  }),
});

const uploadMultiple = multer({storage}).array('images', 10);
export default uploadMultiple;
