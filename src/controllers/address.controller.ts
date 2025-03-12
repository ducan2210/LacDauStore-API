import {Request, Response} from 'express';
import Address from '../models/address.model';

export const getAddressByUserId = async (req: Request, res: Response) => {
  try {
    const user = await Address.findAll({
      where: {user_id: req.query.user_id},
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'Not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching address'});
  }
};

export const updateDefaultAddress = async (req: Request, res: Response) => {
  const {user_id, address_id, is_default} = req.query;
  try {
    // Kiểm tra và chuyển đổi is_default thành số
    const isDefaultNumber = Number(is_default);

    if (isDefaultNumber === 1) {
      // Cập nhật tất cả các địa chỉ khác của người dùng thành is_default = 0
      await Address.update({is_default: 0}, {where: {user_id: user_id}});
    }

    // Tìm địa chỉ cần cập nhật
    const address = await Address.findOne({
      where: {user_id: user_id, address_id: address_id},
    });

    if (address) {
      // Cập nhật is_default cho địa chỉ được chỉ định
      address.is_default = isDefaultNumber;
      await address.save();
      res
        .status(200)
        .json({message: 'Address updated successfully.', address: address});
    } else {
      res
        .status(404)
        .json({message: 'No address found for the specified user.'});
    }
  } catch (error) {
    res.status(500).json({
      error:
        'An error occurred while updating the address. Please try again later.',
    });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const {user_id, address_id} = req.query;
  try {
    const result = await Address.findOne({
      where: {user_id: user_id, address_id: address_id},
    });

    if (result) {
      await result.destroy();
      res.status(200).json({message: 'Address deleted successfully.'});
    } else {
      res
        .status(404)
        .json({message: 'No address found for the specified user.'});
    }
  } catch (error) {
    res.status(500).json({
      error:
        'An error occurred while deleting the address. Please try again later.',
    });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  const {
    user_id,
    full_name,
    phone,
    address_line,
    postal_code,
    city,
    state,
    country,
  } = req.body;
  try {
    // Tạo địa chỉ mới
    const address = await Address.create({
      user_id: user_id,
      full_name: full_name,
      phone: phone,
      address_line: address_line,
      postal_code,
      city,
      state,
      country,
    });
    res.status(201).json({
      message: 'address registered successfully',
      address: address,
    });
  } catch (error) {
    res.status(500).json({error: 'Error creating address'});
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const {
    user_id,
    address_id,
    full_name,
    phone,
    address_line,
    postal_code,
    city,
    state,
    country,
  } = req.body;
  try {
    const address = await Address.findOne({
      where: {user_id: user_id, address_id: address_id},
    });
    if (address) {
      address.full_name = full_name;
      address.phone = phone;
      address.address_line = address_line;
      address.postal_code = postal_code;
      address.city = city;
      address.state = state;
      address.country = country;
      await address.save();
      res.status(200).json({
        message: 'Address updated successfully.',
        address: address,
      });
    } else {
      res
        .status(404)
        .json({message: 'No address found for the specified user.'});
    }
  } catch (error) {
    res.status(500).json({
      error:
        'An error occurred while updating the address. Please try again later.',
    });
  }
};
