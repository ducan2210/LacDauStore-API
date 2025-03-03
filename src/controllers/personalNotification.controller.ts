import {Request, Response} from 'express';
import PersonalNotification from '../models/personalNotification.model';
import UserGlobalNotification from '../models/userGlobalNotification.model';

export const getNotificationByUserID = async (req: Request, res: Response) => {
  try {
    const {user_id} = req.query;
    if (!user_id || isNaN(parseInt(user_id as string))) {
      res.status(400).json({error: 'Invalid user_id'});
    }

    const userId = parseInt(user_id as string);

    const personalNotifications = await PersonalNotification.findAll({
      where: {user_id: userId},
      include: [
        {
          model: require('../models/order.model').default,
          attributes: ['order_id', 'total_amount', 'status'],
        },
      ],
    });

    const userGlobalNotifications = await UserGlobalNotification.findAll({
      where: {user_id: userId},
      include: [
        {
          model: require('../models/globalNotification.model').default,
          attributes: [
            'notification_id',
            'title',
            'message',
            'type',
            'created_at',
            'updated_at',
          ],
        },
      ],
    });

    // Chuẩn bị dữ liệu personal notifications
    const personalNotifData = personalNotifications.map(notif => ({
      notification_id: notif.notification_id,
      user_id: notif.user_id,
      order_id: notif.order_id,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      status: notif.status,
      created_at: notif.created_at,
      updated_at: notif.updated_at,
      order: notif.Order
        ? {
            order_id: notif.Order.order_id,
            total_amount: notif.Order.total_amount,
            status: notif.Order.status,
          }
        : null,
      source: 'personal',
    }));

    // Chuẩn bị dữ liệu global notifications
    const globalNotifData = userGlobalNotifications.map(userNotif => ({
      notification_id: userNotif.notification_id,
      user_id: userNotif.user_id,
      status: userNotif.status,
      read_at: userNotif.read_at,
      title: userNotif.GlobalNotification?.title,
      message: userNotif.GlobalNotification?.message,
      type: userNotif.GlobalNotification?.type,
      created_at: userNotif.GlobalNotification?.created_at,
      updated_at: userNotif.GlobalNotification?.updated_at,
      order: null,
      source: 'global',
    }));

    // Gộp hai mảng thành một
    const allNotifications = [...personalNotifData, ...globalNotifData];

    // Sắp xếp giảm dần theo updated_at, xử lý trường hợp undefined
    allNotifications.sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return dateB - dateA;
    });

    // Trả về kết quả
    res.status(200).json({
      notifications: allNotifications,
    });
  } catch (error) {
    res.status(500).json({
      error: error || 'Internal server error',
    });
  }
};
