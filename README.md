# Backend API - TypeScript & MySQL

## 📌 Giới thiệu
Dự án này là một backend API được viết bằng TypeScript, sử dụng MySQL làm cơ sở dữ liệu. API hỗ trợ nhiều tính năng như xác thực người dùng, quản lý dữ liệu thông qua RESTful API.

## 🛠 Công nghệ sử dụng
- **Node.js** + **TypeScript**
- **Express.js** (Web framework)
- **Sequelize ORM** (Kết nối MySQL)
- **dotenv** (Quản lý biến môi trường)
- **jsonwebtoken (JWT)** (Xác thực API)
- **bcryptjs** (Mã hóa mật khẩu)

## 💁️ Cấu trúc thư mục
```
src/
│️—— config/           # Cấu hình hệ thống, kết nối database
│️—— controllers/      # Xử lý logic API
│️—— middleware/       # Middleware (Auth, Logger, ...)
│️—— models/           # Định nghĩa Models với Sequelize
│️—— routes/           # Định nghĩa API routes
│️—— index.ts          # Điểm khởi chạy server
│️—— custom.d.ts       # Định nghĩa TypeScript tùy chỉnh
.env                  # Biến môi trường
tsconfig.json         # Cấu hình TypeScript
package.json          # Thông tin dependencies
lacDauStore_full_backup.sql  # File backup database
```

## 🚀 Cách chạy dự án
### 1️⃣ Cài đặt dependencies
```bash
npm install
```

### 2️⃣ Cấu hình môi trường

#### **Tạo file `src/config/database.ts`**
```ts
import { Sequelize } from 'sequelize';

const DB_CONFIG = {
  database: 'lacDauStore',
  username: 'root',
  password: 'yourPassword',
  host: 'localhost',
  dialect: 'mysql' as const, // Ép kiểu cho Sequelize
  logging: false,
};

const sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: DB_CONFIG.dialect,
  logging: DB_CONFIG.logging,
});

export default sequelize;
```

#### **Import vào nơi cần thiết**
Trong `src/index.ts` hoặc file nào cần kết nối database, bạn import như sau:

```ts
import sequelize from './config/database';

sequelize.authenticate()
  .then(() => console.log('✅ Kết nối MySQL thành công'))
  .catch((err) => console.error('❌ Kết nối MySQL thất bại:', err));
```

### 3️⃣ Chạy server
```bash
npm run dev   # Chạy với nodemon (dành cho dev)
npm start     # Chạy bản build
```

## 📝 API Endpoints
### 1️⃣ **Xác thực**
- `POST /auth/register` - Đăng ký người dùng
- `POST /auth/login` - Đăng nhập nhận JWT

### 2️⃣ **Quản lý dữ liệu**
- `GET /products` - Lấy danh sách sản phẩm
- `POST /products` - Thêm sản phẩm mới
- `GET /users` - Lấy danh sách người dùng

## 📌 Ghi chú
- Backup database có trong file `lacDauStore_full_backup.sql`
- API sử dụng JWT cho xác thực, token cần được gửi trong header `Authorization: Bearer <token>`

