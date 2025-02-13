const express = require("express");
const cors = require("cors"); // Import CORS
const http = require("http"); // Nhập khẩu http
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const hotelRouter = require("./src/router/hotel-router");
const accountRouter = require("./src/router/account-router");
const roomTypesRouter = require("./src/router/roomTypes-router");
const fileRouter = require("./src/router/fileRouter");
const servicesRouter = require("./src/router/service-router");
const promotionRouter = require("./src/router/promotion-router");
const roomsRoutes = require("./src/router/room-router");
const newsRoutes = require("./src/router/news-router");
const Comment = require("./src/router/comment-router");
const Booking = require("./src/router/booking-router");
const revenue = require("./src/router/revenue-router");
const device = require("./src/router/device-router");
const app = express();
const path = require("path"); // Thêm dòng này để import module 'path'

const server = http.createServer(app); // Tạo máy chủ HTTP từ Express
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép tất cả nguồn
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Để xử lý dữ liệu JSON từ body

app.use(express.static(path.join(__dirname, "public")));
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Message received: ', msg);
    // Gửi lại tin nhắn tới tất cả client khác
    socket.broadcast.emit('chat message', { ...msg, sender: 'bot' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Sử dụng router cho accounts
app.use("/api", accountRouter);
app.use("/api", hotelRouter);
app.use("/api", fileRouter);
app.use("/api", roomTypesRouter);
app.use("/api", servicesRouter);
app.use("/api", promotionRouter);
app.use("/api", roomsRoutes);
app.use("/api", newsRoutes);
app.use("/api", Comment);
app.use("/api", Booking);
app.use("/api", revenue);
app.use("/api", device);

// Khởi động server
const PORT = 3002;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
