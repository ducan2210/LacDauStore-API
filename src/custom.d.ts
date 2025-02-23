import { User } from './models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: User | { [key: string]: any }; // Thêm thuộc tính user
    }
  }
}

