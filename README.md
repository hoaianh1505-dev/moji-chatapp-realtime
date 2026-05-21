# Moji Chat App Realtime

Moji Chat App Realtime là dự án chat app tách riêng `frontend` và `backend`.
Trạng thái hiện tại của repo tập trung vào auth cơ bản: đăng ký, đăng nhập, refresh token, logout và lấy thông tin user đang đăng nhập. Phần chat realtime chưa được triển khai đầy đủ trong source hiện tại.

## Công nghệ sử dụng

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, cookie-parser, CORS
- Database: MongoDB

## Cấu trúc thư mục

```text
Moji_ChatApp_RealTime/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- libs/
|   |   |-- middlewares/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- server.js
|   |-- package.json
|   `-- .env
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- lib/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- stores/
|   |   `-- types/
|   |-- package.json
|   `-- vite.config.ts
`-- README.md
```

## Chức năng hiện có

- Đăng ký tài khoản
- Đăng nhập bằng username và password
- Tạo `access token` bằng JWT
- Lưu `refresh token` trong cookie `httpOnly`
- Tự động refresh access token khi hết hạn
- Bảo vệ route ở frontend và backend
- Lấy thông tin user hiện tại qua `/api/users/me`

## API hiện có

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `POST /api/auth/refresh`

### User

- `GET /api/users/me`

## Yêu cầu môi trường

- Node.js `>= 22.12.0`
- npm `>= 10`
- MongoDB connection string hợp lệ

## Cài đặt

### 1. Cài dependencies cho backend

```powershell
cd backend
npm install
```

### 2. Cài dependencies cho frontend

```powershell
cd ../frontend
npm install
```

## Cấu hình môi trường backend

Tạo file `backend/.env`:

```env
PORT=5001
MONGODB_CONNECTIONSTRING=mongodb://<username>:<password>@<host-1>:27017,<host-2>:27017,<host-3>:27017/?ssl=true&replicaSet=<replica-set>&authSource=admin&appName=Moji
CLIENT_URL=http://localhost:5173
ACCESS_TOKEN_SECRET=<your-random-secret>
```

Có thể tạo `ACCESS_TOKEN_SECRET` bằng Node.js:

```js
require('crypto').randomBytes(64).toString('hex')
```

## Chạy dự án

### Chạy backend

```powershell
cd backend
npm run dev
```

Backend mặc định chạy tại:

```text
http://localhost:5001
```

### Chạy frontend

Mở terminal khác:

```powershell
cd frontend
npm run dev
```

Frontend mặc định chạy tại:

```text
http://localhost:5173
```

## Luồng xác thực hiện tại

1. User đăng nhập tại frontend.
2. Backend kiểm tra username và password.
3. Nếu hợp lệ, backend trả `accessToken` trong response và set `refreshToken` vào cookie.
4. Frontend lưu `accessToken` trong Zustand store.
5. Khi gọi API private, frontend gắn `Authorization: Bearer <token>`.
6. Nếu access token hết hạn, Axios interceptor tự gọi `/api/auth/refresh`.

## Lưu ý

- Repo hiện tại chưa có `Socket.IO`, WebSocket hoặc message realtime.
- Nếu gặp lỗi `querySrv ECONNREFUSED` với MongoDB Atlas, ưu tiên kiểm tra connection string, DNS và trạng thái cluster.
- File `frontend/README.md` hiện vẫn là README mặc định của Vite và không mô tả dự án này.

## Định hướng tiếp theo

- Thêm model tin nhắn và conversation
- Thêm realtime bằng Socket.IO hoặc WebSocket
- Hiển thị danh sách user và cửa sổ chat
- Upload avatar và cập nhật hồ sơ
- Bổ sung validation và test
