import jwt from 'jsonwebtoken';
import {Request, RequestHandler, Response} from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import Cart from '../models/cart.model';
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const createUser = async (req: Request, res: Response) => {
  const {username, password, email} = req.body;
  try {
    // Kiểm tra nếu username hoặc email đã tồn tại
    const existingUser = await User.findOne({where: {username}});
    const existingEmail = await User.findOne({where: {email}});

    if (existingUser || existingEmail) {
      res.status(201).json({
        error: existingUser
          ? 'Username already exists'
          : 'Email already exists',
      });
      return; // Dừng hàm để không tiếp tục thực thi
    }

    // Kiểm tra độ dài password
    if (password.length < 6) {
      res
        .status(201)
        .json({error: 'Password must be at least 6 characters long'});
      return;
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    // Ẩn mật khẩu trước khi trả về
    const {password: _, ...userWithoutPassword} = user.toJSON();
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error creating user'});
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const {username, password} = req.body;

  try {
    // Kiểm tra username có tồn tại không
    const user = await User.findOne({where: {username}});
    if (!user) {
      res.status(404).json({error: 'User not found'});
      return;
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({error: 'Invalid credentials'});
      return;
    }

    // Tạo token
    const token = jwt.sign(
      {id: user.user_id, username: user.username},
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    // Ẩn mật khẩu trước khi trả về
    const {password: _, ...userWithoutPassword} = user.toJSON();

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error logging in'});
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
  try {
    const user = await User.findOne({
      where: {username: req.query.username},
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error fetching user'});
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const {password, email, phone} = req.body;
  console.log('Query Username:', req.query.username);
  console.log('Request Body:', req.body);
  try {
    const user = await User.findOne({
      where: {username: req.query.username},
    });

    if (!user) {
      res.status(404).json({message: 'User not found'});
      return; // Thêm `return` để kết thúc hàm
    }

    user.password = password || user.password;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error updating user'});
  }
};
