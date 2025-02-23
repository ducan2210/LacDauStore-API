"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const database_1 = __importDefault(require("./config/database"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const wishList_router_1 = __importDefault(require("./routes/wishList.router"));
const promotion_route_1 = __importDefault(require("./routes/promotion.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use('/api', user_route_1.default);
app.use('/api', product_route_1.default);
app.use('/api', category_route_1.default);
app.use('/api', cart_route_1.default);
app.use('/api', wishList_router_1.default);
app.use('/api', promotion_route_1.default);
app.use('/api/payment', payment_route_1.default);
database_1.default.authenticate()
    .then(() => {
    console.log('Database connected!');
})
    .catch((err) => {
    console.error('Database connection failed:', err);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map