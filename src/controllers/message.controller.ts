import {Request, Response} from 'express';
import Message from '../models/message.model';
import {Server} from 'socket.io';
import {Op} from 'sequelize';

let io: Server | null = null;

export const setSocketInstance = (socketInstance: Server) => {
  io = socketInstance;
};

export const sendMessage = async (req: Request, res: Response) => {
  const {sender_id, receiver_id, content} = req.body;

  if (!sender_id || !receiver_id || !content) {
    res.status(400).json({success: false, error: 'Missing required fields'});
  }

  try {
    const message = await Message.create({sender_id, receiver_id, content});

    if (io) {
      io.to(receiver_id.toString()).emit('newMessage', message);
      console.log(`Sent message to user ${receiver_id}`);
    } else {
      console.warn(' Socket.io instance is null');
    }

    res.json({success: true, message});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: error});
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const {sender_id, receiver_id} = req.query;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {sender_id: sender_id, receiver_id: receiver_id},
          {sender_id: receiver_id, receiver_id: sender_id},
        ],
      },
      order: [['created_at', 'ASC']],
    });

    res.status(200).json({
      data: messages,
    });
  } catch (error) {
    console.error('Lỗi lấy tin nhắn:', error);
    res.status(500).json({message: 'Lỗi server'});
  }
};
