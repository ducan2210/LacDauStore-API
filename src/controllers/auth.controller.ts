import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const verifyToken = (req: Request, res: Response): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({valid: false, error: 'No token provided'});
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({valid: true});
  } catch (err: unknown) {
    if (err instanceof Error) {
      res
        .status(401)
        .json({valid: false, error: err.message || 'Token expired or invalid'});
    } else {
      res.status(500).json({valid: false, error: 'Internal server error'});
    }
  }
};
