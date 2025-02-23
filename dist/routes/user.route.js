"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const user_controller_2 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/CreateUsers', user_controller_2.createUser);
router.post('/Login', user_controller_2.login);
router.get('/GetUser', auth_middleware_1.authenticateToken, user_controller_2.getUserByUsername);
router.put('/UpdateUser', auth_middleware_1.authenticateToken, user_controller_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map