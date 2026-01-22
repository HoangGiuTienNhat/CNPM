Dưới đây là bản tổng kết chi tiết quá trình chúng ta đã thực hiện, giúp bạn có cái nhìn tổng quan về những gì đã được xây dựng trên AWS.

---

## I. Những thành phần đã được Deploy thành công

Hệ thống của bạn hiện tại không chỉ là một ứng dụng đơn lẻ, mà là một **hệ sinh thái container** gồm 3 thành phần chính:

1. **Application (Spring Boot API):** Đóng gói dưới dạng Docker image, chạy Java 17, cung cấp các endpoint RESTful và tài liệu Swagger UI.
2. **Database (MySQL 8.0):** Hệ quản trị cơ sở dữ liệu lưu trữ toàn bộ thông tin người dùng, khoa (faculty), và dữ liệu nghiệp vụ.
3. **Hạ tầng mạng (Docker Network & Volumes):** Một mạng nội bộ ảo để API và DB nói chuyện với nhau, cùng với ổ đĩa ảo (Volume) để dữ liệu không bị mất khi khởi động lại.

---

## II. Quy trình Deploy từ đầu đến cuối

Quá trình này có thể chia làm 5 giai đoạn quan trọng:

### 1. Khởi tạo hạ tầng AWS (Infrastructure)

* Tạo máy ảo **EC2 (t3.micro)** chạy hệ điều hành Ubuntu.
* Thiết lập **Security Group**: Mở cổng **8080** (cho API) và **3306** (cho Database - nếu cần truy cập từ ngoài).
* **Xử lý sự cố ổ cứng:** Nâng cấp dung lượng từ **8GB lên 30GB** trên AWS Console và dùng lệnh `growpart`, `resize2fs` để Ubuntu nhận đủ dung lượng.

### 2. Cấu hình môi trường Docker

* Cài đặt Docker và Docker Compose trên EC2.
* Viết file `docker-compose.yml` để quản lý đồng thời API và MySQL.
* **Tối ưu hóa Healthcheck:** Cấu hình để API luôn "kiên nhẫn" chờ MySQL khởi động xong hoàn toàn mới bắt đầu chạy, tránh lỗi kết nối (`Communications link failure`).

### 3. Chuẩn hóa mã nguồn (Logic Fixes)

Đây là bước bạn đã thực hiện ở máy local và đẩy lên Git:

* **Sửa lỗi Optimistic Locking:** Trong file `DataInitializer.java`, chúng ta xóa bỏ việc gán ID cứng (`.uid(999999L)`) để MySQL tự động quản lý (Auto Increment).
* **Cấu hình Security:** Đảm bảo các đường dẫn như `/auth/**` và `/error` được `permitAll()` để người dùng có thể đăng ký/đăng nhập công khai.

### 4. Quy trình CI/CD thủ công (Deployment Workflow)

* **Local:** Sửa code -> `git commit` -> `git push origin main`.
* **EC2:** `git pull` (hoặc `git reset --hard`) để lấy code mới nhất.
* **Docker Build:** Chạy `docker compose up -d --build`. Docker sẽ tự động tải các thư viện Maven, đóng gói file `.war` và chạy container.

### 5. Kiểm tra và Vận hành (Testing)

* Sử dụng **Swagger UI** (`/swagger-ui/index.html`) để xem danh sách API.
* Sử dụng **Postman** để test các luồng nghiệp vụ quan trọng như Login (`/auth/signin`) và Register (`/auth/register`).

---

## III. Cách bạn test toàn bộ hệ thống ngay bây giờ

Để khẳng định "mọi thứ đã thông suốt", bạn hãy thực hiện chuỗi test sau:

1. **Test Write (Ghi):** Gửi request `POST /auth/register` (bạn đã làm thành công).
2. **Test Read (Đọc):** Gửi request `POST /auth/signin` bằng tài khoản vừa tạo. Nếu nhận được **JWT Token**, nghĩa là API đã đọc được dữ liệu bạn vừa ghi vào MySQL.
3. **Test Persistence (Lưu trữ):** Thử chạy lệnh `docker compose restart`. Sau khi hệ thống lên lại, hãy thử Login lại. Nếu vẫn Login được, nghĩa là **Docker Volume** đã lưu dữ liệu thành công, không bị mất dữ liệu khi tắt máy.

---
