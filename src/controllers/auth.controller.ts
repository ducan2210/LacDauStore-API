import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const verifyToken = (req: Request, res: Response): void => {
  console.log('Request received at /verify-token');
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Token received:', token);

  if (!token) {
    console.log('No token provided');
    res.status(401).json({valid: false, error: 'No token provided'});
    return;
  }

  try {
    console.log('JWT_SECRET used:', JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decoded:', decoded);
    res.status(200).json({valid: true});
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('JWT Verify Error:', err.message);
      res
        .status(401)
        .json({valid: false, error: err.message || 'Token expired or invalid'});
    } else {
      console.error('Unexpected error:', err); // Xử lý trường hợp lỗi không phải Error
      res.status(500).json({valid: false, error: 'Internal server error'});
    }
  }
};
