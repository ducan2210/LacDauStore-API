"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemInWishList = exports.addToWishList = exports.getWishListById = void 0;
const wishlist_model_1 = __importDefault(require("../models/wishlist.model"));
const getWishListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.query;
    try {
        const result = yield wishlist_model_1.default.findAll({
            where: { user_id: user_id },
        });
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'No wishlist found for the specified user.' });
        }
    }
    catch (error) {
        console.error('Error while fetching the wishlist:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the wishlist. Please try again later.' });
    }
});
exports.getWishListById = getWishListById;
const addToWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id } = req.body;
    try {
        // Kiểm tra xem sản phẩm đã có trong wishlist chưa
        console.log(user_id, product_id);
        const existingItem = yield wishlist_model_1.default.findOne({
            where: { user_id: user_id, product_id: product_id },
        });
        if (existingItem) {
            res.status(200).json({ message: 'Product already in wishlist.' });
        }
        else {
            // Thêm sản phẩm vào wishlist
            const newItem = yield wishlist_model_1.default.create({
                user_id: user_id,
                product_id: product_id,
            });
            res.status(201).json({
                message: 'Add to wish list successfully',
                wishList: newItem,
            });
        }
    }
    catch (error) {
        console.error('Error while adding to the wishlist:', error);
        res.status(500).json({ error: 'An error occurred while adding to the wishlist. Please try again later.' });
    }
});
exports.addToWishList = addToWishList;
const deleteItemInWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id } = req.query;
    console.log(user_id, product_id); // Check the data sent in the request
    try {
        const result = yield wishlist_model_1.default.findOne({
            where: { user_id: user_id, product_id: product_id },
        });
        if (result) {
            yield result.destroy();
            res.status(200).json({ message: 'Item deleted successfully from the wish list.' });
        }
        else {
            res.status(404).json({ message: 'No product found for the specified user.' });
        }
    }
    catch (error) {
        console.error('Error while fetching the wish list:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the wish list. Please try again later.' });
    }
});
exports.deleteItemInWishList = deleteItemInWishList;
//# sourceMappingURL=wishlist.controller.js.map