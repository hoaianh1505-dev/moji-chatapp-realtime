# Moji Chat App Realtime

Moji Chat App Realtime la du an chat app tach rieng `frontend` va `backend`.
Trang thai hien tai cua repo tap trung vao auth co ban: dang ky, dang nhap, refresh token, logout va lay thong tin user dang nhap. Phan chat realtime chua duoc trien khai day du trong source hien tai.

## Cong nghe su dung

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, cookie-parser, CORS
- Database: MongoDB

## Cau truc thu muc

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

## Chuc nang hien co

- Dang ky tai khoan
- Dang nhap bang username va password
- Tao `access token` bang JWT
- Luu `refresh token` trong cookie `httpOnly`
- Tu dong refresh access token khi het han
- Bao ve route o frontend va backend
- Lay thong tin user hien tai qua `/api/users/me`

## API hien co

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `POST /api/auth/refresh`

### User

- `GET /api/users/me`

## Yeu cau moi truong

- Node.js `>= 22.12.0`
- npm `>= 10`
- MongoDB connection string hop le

## Cai dat

### 1. Cai dependencies cho backend

```powershell
cd backend
npm install
```

### 2. Cai dependencies cho frontend

```powershell
cd ../frontend
npm install
```

## Cau hinh moi truong backend

Tao file `backend/.env`:

```env
PORT=5001
MONGODB_CONNECTIONSTRING=mongodb://<username>:<password>@<host-1>:27017,<host-2>:27017,<host-3>:27017/?ssl=true&replicaSet=<replica-set>&authSource=admin&appName=Moji
CLIENT_URL=http://localhost:5173
ACCESS_TOKEN_SECRET=<your-random-secret>
```

Co the tao `ACCESS_TOKEN_SECRET` bang Node.js:

```js
require('crypto').randomBytes(64).toString('hex')
```

## Chay du an

### Chay backend

```powershell
cd backend
npm run dev
```

Backend mac dinh chay tai:

```text
http://localhost:5001
```

### Chay frontend

Mo terminal khac:

```powershell
cd frontend
npm run dev
```

Frontend mac dinh chay tai:

```text
http://localhost:5173
```

## Luong xac thuc hien tai

1. User dang nhap tai frontend.
2. Backend kiem tra username va password.
3. Neu hop le, backend tra `accessToken` trong response va set `refreshToken` vao cookie.
4. Frontend luu `accessToken` trong Zustand store.
5. Khi goi API private, frontend gan `Authorization: Bearer <token>`.
6. Neu access token het han, Axios interceptor tu goi `/api/auth/refresh`.

## Luu y

- Repo hien tai chua co `Socket.IO`, WebSocket hoac message realtime.
- Neu gap loi `querySrv ECONNREFUSED` voi MongoDB Atlas, uu tien kiem tra connection string, DNS va trang thai cluster.
- File `frontend/README.md` hien van la README mac dinh cua Vite va khong mo ta du an nay.

## Dinh huong tiep theo

- Them model tin nhan va conversation
- Them realtime bang Socket.IO hoac WebSocket
- Hien thi danh sach user va cua so chat
- Upload avatar va cap nhat ho so
- Bo sung validation va test
