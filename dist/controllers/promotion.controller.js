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
exports.getPromotionByCodeActive = exports.getPromotion = void 0;
const productPromotion_model_1 = __importDefault(require("../models/productPromotion.model"));
const promotion_model_1 = __importDefault(require("../models/promotion.model"));
const getPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.query;
    try {
        // Kiểm tra xem sản phẩm có khuyến mãi không
        const productPromotions = yield productPromotion_model_1.default.findAll({
            where: {
                product_id: product_id
            }
        });
        if (!productPromotions || productPromotions.length === 0) {
            res.status(200).json([]);
            return;
        }
        // Lấy thông tin khuyến mãi đang có hiệu lực
        const activePromotions = yield Promise.all(productPromotions.map((productPromotion) => __awaiter(void 0, void 0, void 0, function* () {
            return yield promotion_model_1.default.findOne({
                where: {
                    promotion_id: productPromotion.promotion_id,
                    status: 'active'
                }
            });
        })));
        // Lọc ra các khuyến mãi hợp lệ
        const validPromotions = activePromotions.filter(promotion => promotion !== null);
        if (validPromotions.length === 0) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(validPromotions[0]);
    }
    catch (error) {
        console.error('Error fetching promotion:', error);
        res.status(500).json({ error: 'Error fetching promotion' });
    }
});
exports.getPromotion = getPromotion;
const getPromotionByCodeActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        const promotion = yield promotion_model_1.default.findOne({
            where: {
                code: code,
                status: 'active'
            }
        });
        if (!promotion) {
            res.status(200).json(null);
            return;
        }
        else {
            const result = yield productPromotion_model_1.default.findOne({
                where: {
                    promotion_id: promotion.promotion_id
                }
            });
            if (result) {
                res.status(200).json(null);
                return;
            }
            res.status(200).json(promotion);
        }
    }
    catch (error) {
        console.error('Error fetching promotion:', error);
        res.status(500).json({ error: 'Error fetching promotion' });
    }
});
exports.getPromotionByCodeActive = getPromotionByCodeActive;
//# sourceMappingURL=promotion.controller.js.map