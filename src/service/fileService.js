const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Sử dụng uuid để tạo GUID

// Hàm kiểm tra và tạo folder nếu chưa tồn tại
const checkAndCreateFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Hàm xóa folder nếu tồn tại
const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Xóa file nếu tồn tại
  }
};

const uploadSingleFile = (file, folderPath, imgName) => {
  let newFileName;

  // Kiểm tra imgName, nếu có, sử dụng tên file đó
  if (!imgName || imgName.trim() === "") {
    newFileName = uuidv4() + path.extname(file.originalname); // Tạo file mới với UUID
  } else {
    newFileName = imgName; // Giữ nguyên tên file nếu imgName được cung cấp
    const oldFilePath = path.join(
      __dirname,
      "../../public",
      folderPath,
      imgName
    );

    // Kiểm tra nếu file cũ tồn tại thì xóa
    deleteFileIfExists(oldFilePath); // Xóa file cũ nếu tồn tại
    newFileName = uuidv4() + path.extname(file.originalname);
  }

  return new Promise((resolve, reject) => {
    const newFullFolderPath = path.join(__dirname, "../../public", folderPath); // Đường dẫn tới thư mục

    checkAndCreateFolder(newFullFolderPath); // Tạo thư mục nếu chưa tồn tại

    const filePath = path.join(newFullFolderPath, newFileName); // Đường dẫn đầy đủ tới file mới

    // Lưu file vào hệ thống
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          message: "File uploaded successfully!",
          fileName: newFileName,
          folderPath,
        });
      }
    });
  });
};

// Hàm xử lý upload nhiều file với GUID
const uploadMultipleFiles = (files, folderPath) => {
  return new Promise((resolve, reject) => {
    // deleteFolderIfExists(folderPath); // Xóa folder cũ nếu tồn tại
    checkAndCreateFolder(folderPath); // Tạo folder mới

    const uploadPromises = files.map((file) => {
      // Tạo tên file mới với GUID
      const newFileName = uuidv4() + path.extname(file.originalname);
      const filePath = path.join(folderPath, newFileName);

      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, file.buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              fileName: newFileName,
              message: `File ${file.originalname} uploaded successfully!`,
              folderPath,
            });
          }
        });
      });
    });

    // Sử dụng Promise.all để chờ tất cả các file được upload xong
    Promise.all(uploadPromises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
