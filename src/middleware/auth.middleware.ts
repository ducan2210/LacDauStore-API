import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Middleware xác thực token JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Lấy token từ header "Authorization"
  const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ "Bearer <token>"

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return; // Kết thúc hàm nếu không có token
  }

  (jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }

  // Ép kiểu tạm thời để tránh lỗi TypeScript
  (req as any).user = decoded;

  next();
}));

};
