const mysql = require("mysql2");

// Tạo kết nối tới MySQL
const connection = mysql.createPool({
  host: "localhost",
  user: "root", // Thay bằng username của bạn
   password: "dtai7303La...123", // Thay bằng password của bạn
  database: "management_booking", // Tên cơ sở dữ liệu
  waitForConnections: true,
  connectionLimit: 10,
  port: 3306,
  queueLimit: 0,
});
// Kiểm tra kết nối đến database
connection.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Database connection established successfully");
    connection.release(); // Giải phóng kết nối sau khi kiểm tra
  }
});
module.exports = connection.promise();
