-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 17, 2024 lúc 05:43 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30
create database management_booking;
use management_booking;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `management_booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `score` int(11) DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `role` tinyint(4) NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `userName`, `email`, `score`, `password`, `role`, `phoneNumber`) VALUES
(2, 'admin', 'admin@gmail.com', 479900, '$2b$10$XLV5CSO0XgU7EDE4V4r7/ef9Iiz6VbyT4SQtfa2XT/sgWo6082lom', 0, '123456'),
(5, 'Staff', 'Staff@gmail.com', 999888777, '$2b$10$JcnolVxCg9rhcLPFUFfihOqwtlkcQmF6g6MKt3YKhL4hh2TPes1Y6', 1, '0321456987'),
(6, 'User', 'user@gmail.com', 0, '$2b$10$crXXK3dJD0DoZuJF/OL9pumVPu/D4Z/sTfrMjMT5mri0Qx1263WNS', 2, '123456'),
(12, 'Admin B', 'baoquoczero@gmail.com', 2147483647, '$2b$10$C1HLU8sFbBb/SvF/jV/AQev/tA.TBz6IOU785xsHlhuZywmHCjnaW', 0, '0372701722');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `bookingName` varchar(100) NOT NULL,
  `userIdBooking` int(11) NOT NULL,
  `bookingPhone` varchar(20) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkOutDate` date NOT NULL,
  `bookingRoomId` int(11) DEFAULT NULL,
  `bookingStatus` tinyint(4) DEFAULT 0,
  `paymentStatus` int(11) DEFAULT 0,
  `paymentMethod` int(11) DEFAULT 0,
  `surcharge` decimal(10,2) DEFAULT 0.00,
  `totalFee` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `booking`
--

INSERT INTO `booking` (`id`, `bookingName`, `userIdBooking`, `bookingPhone`, `checkInDate`, `checkOutDate`, `bookingRoomId`, `bookingStatus`, `paymentStatus`, `paymentMethod`, `surcharge`, `totalFee`) VALUES
(1, 'Nguyễn Văn A', 6, '0123456789', '2023-12-29', '2024-12-29', 17, 1, 0, 0, 100.00, 1000000.00),
(2, 'Nguyễn Văn B', 6, '0123456789', '2024-01-29', '2025-01-29', 18, 1, 1, 1, 150.00, 1502000.00),
(3, 'Nguyễn Văn C', 6, '0123456789', '2024-02-28', '2025-02-27', 19, 1, 1, 1, 200.00, 2544000.00),
(4, 'Nguyễn Văn D', 6, '0123456789', '2024-03-29', '2025-03-29', 19, 1, 1, 1, 250.00, 2504000.00),
(5, 'Nguyễn Văn E', 6, '0123456789', '2024-04-28', '2025-04-28', 18, 1, 1, 1, 300.00, 3003440.00),
(6, 'Nguyễn Văn F', 6, '0123456789', '2024-05-30', '2025-05-30', 18, 1, 1, 1, 350.00, 322500.00),
(7, 'Nguyễn Văn G', 6, '0123456789', '2024-06-29', '2025-06-29', 18, 1, 1, 1, 400.00, 400330.00),
(8, 'Nguyễn Văn H', 6, '0123456789', '2024-07-30', '2025-07-30', 17, 1, 1, 1, 450.00, 454500.00),
(9, 'Nguyễn Văn I', 6, '0123456789', '2024-08-30', '2025-08-30', 20, 1, 1, 1, 500.00, 500550.00),
(10, 'Nguyễn Văn J', 6, '0123456789', '2024-09-29', '2025-09-29', 20, 1, 1, 1, 550.00, 550440.00),
(11, 'Nguyễn Văn K', 6, '0123456789', '2024-11-01', '2025-11-01', 17, 1, 1, 1, 600.00, 6000.00),
(12, 'Nguyễn Văn L', 6, '0123456789', '2024-11-30', '2025-11-30', 17, 0, 1, 1, 650.00, 6500.00),
(23, 'Nhatdeptrai', 6, '12313123', '2024-11-11', '2024-11-22', 17, 1, 1, 0, 0.00, 10000000.00),
(61, 'phúc fix', 2, '21312313123', '2024-11-28', '2024-12-01', 18, 1, 0, 0, 0.00, 6000000.00),
(62, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-06', '2024-11-07', 17, 1, 1, 1, 0.00, 8999999.00),
(63, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-06', '2024-11-07', 20, 1, 1, 1, 0.00, 1232313.00),
(64, 'Nguyễn Lâm Quốc Bảo', 2, '0321456987', '2024-11-10', '2024-11-11', 18, 1, 1, 1, 0.00, 2000000.00),
(65, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-10', '2024-11-11', 19, 1, 1, 1, 0.00, 1002021109.00),
(66, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-11', '2024-11-12', 17, 1, 1, 1, 0.00, 9049999.00),
(67, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-13', '2024-11-14', 20, 1, 0, 0, 0.00, 1000.00),
(68, 'Nguyễn Lâm Quốc Bảo', 2, '0321456987', '2024-11-13', '2024-11-14', 21, 1, 0, 0, 0.00, 4849000.00),
(69, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-17', '2024-11-18', 21, 1, 0, 0, 0.00, 5050000.00),
(70, 'Nguyễn Lâm Quốc Bảo', 12, '0321456987', '2024-11-17', '2024-11-18', 22, 0, 1, 1, 0.00, 150000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `roomId` int(11) DEFAULT NULL,
  `hotelId` int(11) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `comment` text DEFAULT NULL,
  `is_removed` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `userId`, `roomId`, `hotelId`, `rating`, `comment`, `is_removed`) VALUES
(1, 5, NULL, NULL, 4.0, 'ádasdadsdasdádasdasdadadasdsa', 0),
(5, 5, 17, 7, 8.9, 'dsdadasdsadadadasd', 0),
(7, 5, 17, 7, 2.0, 'sadasdasdsd', 0),
(9, 6, 17, 7, 6.0, 'sdad', NULL),
(10, 6, NULL, 7, 4.0, NULL, NULL),
(11, 6, NULL, 7, NULL, NULL, NULL),
(12, 12, 17, 7, 9.9, 'Khách sạn quá tốt', NULL),
(13, 12, 17, 7, 0.0, 'Khách sạn quá hay', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `device`
--

CREATE TABLE `device` (
  `deviceId` int(11) NOT NULL,
  `deviceName` varchar(100) DEFAULT NULL,
  `deviceType` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `purchaseDate` date DEFAULT NULL,
  `warrantyPeriod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `device`
--

INSERT INTO `device` (`deviceId`, `deviceName`, `deviceType`, `status`, `purchaseDate`, `warrantyPeriod`) VALUES
(1, 'Máy lạnh', 'Điện tử', 'Hoạt động', '2023-01-15', 24),
(2, 'TV', 'Điện tử', 'Hoạt động', '2022-05-10', 36),
(3, 'Máy giặt', 'Điện tử', 'Bảo trì', '2021-08-25', 12),
(4, 'Tủ lạnh', 'Điện tử', 'Hoạt động', '2024-02-10', 24),
(5, 'Máy tính', 'Văn phòng', 'Hoạt động', '2023-11-01', 36);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `description` text DEFAULT NULL,
  `totalRooms` int(11) DEFAULT 0,
  `reviewScore` decimal(2,1) DEFAULT 0.0,
  `image` text DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotel`
--

INSERT INTO `hotel` (`id`, `name`, `location`, `rating`, `description`, `totalRooms`, `reviewScore`, `image`, `createdDate`, `updatedDate`) VALUES
(7, 'Pandoru', 'Sao Hỏa', 5.0, 'Khách sạn lớn nhất Sao Hỏa', 2147483603, 9.9, '08585946-0141-4e97-b82e-3257c0722356.jpg', '2024-11-02 21:19:49', '2024-11-13 00:29:17'),
(8, 'Pandora', 'Thái dương hệ', 5.0, 'view siêu đẹp', 10, 9.9, 'ad7e9784-5dce-4ff5-8d40-d79c2aa473ee.jfif', '2024-11-03 22:16:32', '2024-11-11 20:10:32'),
(9, 'Orario', 'Thái dương hệ', 3.0, 'ádadasd', 3, 3.0, 'f69892c9-694f-4081-adaa-b71e3da407c6.jfif', '2024-11-03 22:17:16', '2024-11-06 16:50:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `newsImage` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `topic`, `title`, `newsImage`, `description`) VALUES
(2, 'Cây Đèn Giao Thông Tự Tin Nhất Thế Giới', 'Giao thông', 'https://static.tuoitre.vn/tto/i/s626/2012/05/23/0wQS2In3.jpg', 'Một cây đèn giao thông ở thành phố XYZ vừa tuyên bố sẽ không còn bật đèn đỏ nữa vì “tôi quá nổi tiếng và không muốn ai phải chờ đợi”. Người dân cho biết họ rất hào hứng với ý tưởng này, nhưng cũng lo lắng về việc giao thông có thể trở nên hỗn loạn hơn.'),
(3, 'Lợn Vào Quán Cà Phê Gây Náo Loạn', 'Giải trí', 'https://sohanews.sohacdn.com/2017/1-1512584166031-1512619511163.png', 'Một con lợn đáng yêu đã bất ngờ chạy vào một quán cà phê ở trung tâm thành phố và yêu cầu một ly cappuccino. Chủ quán đã quyết định phục vụ nó với một ly nước, nhưng lợn đã từ chối và nói: “Tôi chỉ muốn một trải nghiệm cà phê thực sự!”'),
(4, 'Trái Đất Không Tồn Tại: Những Bằng Chứng Mới Đầy Thuyết Phục', 'Khoa học', 'https://e7.pngegg.com/pngimages/957/391/png-clipart-rage-comic-internet-meme-iphone-4s-desktop-meme-comics-face-thumbnail.png', 'Trong một cuộc hội thảo khoa học gây tranh cãi vừa diễn ra, một nhóm các nhà nghiên cứu đã đưa ra một tuyên bố gây sốc rằng Trái đất thực chất không tồn tại. Theo họ, mọi hình ảnh và video mà chúng ta thấy về hành tinh xanh chỉ là một sản phẩm của trí tưởng tượng và công nghệ chỉnh sửa hiện đại.\n\nNhóm nghiên cứu này đã công bố \"Báo cáo Thực Tế Ảo\" với những lý lẽ như: không có ai thực sự đi du lịch đến Trái đất, và tất cả các video về không gian chỉ là một chuỗi các đoạn phim được tạo ra bởi các nhà khoa học hàng đầu để che giấu sự thật. Họ khẳng định rằng các tấm ảnh chụp Trái đất từ không gian đều được quay tại một studio lớn ở Hollywood.\n\n“Nếu bạn nghĩ về nó, không có ai từng thực sự thấy Trái đất,” một thành viên trong nhóm cho biết. “Tất cả chúng ta chỉ đang sống trong một trò chơi thực tế ảo khổng lồ mà chúng ta gọi là cuộc sống.”\n\nBáo cáo đã thu hút sự quan tâm lớn từ giới truyền thông và mạng xã hội, với nhiều người bày tỏ sự hoài nghi, trong khi một số khác thì hoàn toàn đồng tình với tuyên bố gây sốc này. “Thật đáng sợ khi nghĩ rằng chúng ta có thể chỉ là những nhân vật trong một trò chơi không có điểm dừng,” một người dùng Twitter bình luận.\n\nCác nhà khoa học khác đã nhanh chóng bác bỏ những tuyên bố này, cho rằng đây chỉ là một trò đùa hoặc một chiến dịch gây rối. Tuy nhiên, cuộc tranh cãi về sự tồn tại của Trái đất vẫn tiếp tục nóng lên, với ngày càng nhiều người tò mò về thực hư của những thông tin này.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `description` text DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `discount`, `description`, `startDate`, `endDate`, `createdDate`, `updatedDate`) VALUES
(3, 'Giảm giá cho người Sao Hỏa', 99.00, 'Giảm giá cho người Sao Hỏa', '2024-11-01', '3000-10-31', '2024-11-02 21:20:33', '2024-11-07 16:22:30'),
(4, 'Giảm giá cho người ở Bãi đỗ xe', 50.00, 'Giảm giá cho người ở Bãi đỗ xe', '2024-11-17', '2030-01-01', '2024-11-17 23:00:29', '2024-11-17 23:00:29'),
(5, 'Giảm giá cho người âm', 100.00, 'Giảm giá cho người âm', '2024-11-16', '2030-01-01', '2024-11-17 23:01:11', '2024-11-17 23:01:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `roomtypeId` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `statusRooms` varchar(255) NOT NULL DEFAULT '0',
  `hotelId` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `image`, `price`, `description`, `location`, `roomtypeId`, `name`, `statusRooms`, `hotelId`, `createdDate`, `updatedDate`) VALUES
(17, '5da257a9-d99d-4e00-a22b-19cf1b07bf43.jfif', 9000000, 'Pandoru Vip', 'Sao Hỏa', 7, 'Pandoru Vip', '0', 7, '2024-11-02 21:23:56', '2024-11-17 23:36:19'),
(18, '1e773fdc-ad97-455b-a9eb-83e5663695b3.jfif', 2000000, ' Orario Vip', 'Quận 2', 7, ' Orario Vip', '0', 9, '2024-11-03 23:11:02', '2024-11-17 23:02:32'),
(19, 'c52d08ee-70b5-4e96-9ace-fb72ac3e9a1d.jfif', 2500000, 'Pandora Vip', 'Thái dương hệ', 7, 'Pandora Vip', '0', 8, '2024-11-03 23:11:28', '2024-11-17 23:02:56'),
(20, '741674a8-46f7-4607-b9f6-c47401388e30.jfif', 9000500, 'Pandoru Thường', 'Sao Hỏa', 8, 'Pandoru Thường', '0', 7, '2024-11-03 23:12:13', '2024-11-17 23:36:12'),
(21, 'c130ad32-00fc-4cac-ae78-8de2277ac267.jpg', 5000000, 'Pandoru Bãi đỗ xe', 'Sao Hỏa', 7, 'Pandoru Bãi đỗ xe', '3', 7, '2024-11-13 22:09:53', '2024-11-17 23:38:49'),
(22, '810c616f-fcd7-464e-85c5-bd979c7d1c62.jfif', 100000, 'Pandoru Tầng hầm', 'Sao Hỏa', 10, 'Pandoru Tầng hầm', '1', 7, '2024-11-17 23:08:47', '2024-11-17 23:43:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roomtypes`
--

CREATE TABLE `roomtypes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roomtypes`
--

INSERT INTO `roomtypes` (`id`, `name`, `description`, `createdDate`, `updatedDate`) VALUES
(7, 'Vip', 'Vip', '2024-11-02 21:20:07', '2024-11-02 21:20:07'),
(8, 'Thường', 'Thường', '2024-11-17 23:03:18', '2024-11-17 23:03:18'),
(9, 'Bãi đỗ xe', 'Bãi đỗ xe', '2024-11-17 23:03:28', '2024-11-17 23:03:28'),
(10, 'Tầng hầm', 'Tầng hầm', '2024-11-17 23:03:40', '2024-11-17 23:03:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_device`
--

CREATE TABLE `room_device` (
  `roomId` int(11) NOT NULL,
  `deviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_device`
--

INSERT INTO `room_device` (`roomId`, `deviceId`) VALUES
(17, 1),
(17, 2),
(17, 3),
(17, 4),
(17, 5),
(18, 1),
(19, 2),
(20, 2),
(20, 3),
(20, 4),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(21, 5),
(22, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_promotions`
--

CREATE TABLE `room_promotions` (
  `roomId` int(11) NOT NULL,
  `promotionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_promotions`
--

INSERT INTO `room_promotions` (`roomId`, `promotionId`) VALUES
(17, 3),
(18, 3),
(19, 3),
(20, 3),
(21, 5),
(22, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_services`
--

CREATE TABLE `room_services` (
  `roomId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_services`
--

INSERT INTO `room_services` (`roomId`, `serviceId`) VALUES
(17, 3),
(18, 3),
(19, 3),
(20, 3),
(21, 3),
(22, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `service_price` double NOT NULL,
  `createdDate` datetime DEFAULT current_timestamp(),
  `updatedDate` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `icon`, `service_price`, `createdDate`, `updatedDate`) VALUES
(3, 'Ắn uống', 'Ắn uống', 'https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/12_2019/nhung-quy-tac-an-uong-ki-la-nhat-the-gioi.jpg', 50000, '2024-11-02 21:21:38', '2024-11-13 21:54:54');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookingRoomId` (`bookingRoomId`),
  ADD KEY `userIdBooking` (`userIdBooking`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `roomId` (`roomId`),
  ADD KEY `hotelId` (`hotelId`);

--
-- Chỉ mục cho bảng `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`deviceId`);

--
-- Chỉ mục cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomtypeId` (`roomtypeId`),
  ADD KEY `hotelId` (`hotelId`);

--
-- Chỉ mục cho bảng `roomtypes`
--
ALTER TABLE `roomtypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `room_device`
--
ALTER TABLE `room_device`
  ADD PRIMARY KEY (`roomId`,`deviceId`),
  ADD KEY `deviceId` (`deviceId`);

--
-- Chỉ mục cho bảng `room_promotions`
--
ALTER TABLE `room_promotions`
  ADD PRIMARY KEY (`roomId`,`promotionId`),
  ADD KEY `fk_room_promotion_promotion` (`promotionId`);

--
-- Chỉ mục cho bảng `room_services`
--
ALTER TABLE `room_services`
  ADD PRIMARY KEY (`roomId`,`serviceId`),
  ADD KEY `fk_room_service_service` (`serviceId`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `device`
--
ALTER TABLE `device`
  MODIFY `deviceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `roomtypes`
--
ALTER TABLE `roomtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`bookingRoomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`userIdBooking`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`hotelId`) REFERENCES `hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`roomtypeId`) REFERENCES `roomtypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`hotelId`) REFERENCES `hotel` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `room_device`
--
ALTER TABLE `room_device`
  ADD CONSTRAINT `room_device_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `room_device_ibfk_2` FOREIGN KEY (`deviceId`) REFERENCES `device` (`deviceId`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `room_promotions`
--
ALTER TABLE `room_promotions`
  ADD CONSTRAINT `fk_room_promotion_promotion` FOREIGN KEY (`promotionId`) REFERENCES `promotions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_promotion_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `room_services`
--
ALTER TABLE `room_services`
  ADD CONSTRAINT `fk_room_service_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_service_service` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
