# 🚀 Báo cáo Lab: Tổng hợp kiến thức ES6 & React Components

Kho lưu trữ này ghi lại quá trình thực hành và các bài học rút ra trong chuỗi bài tập vỡ lòng về React kết hợp với các tính năng hiện đại của ES6 (Template Literals, Arrow Function, Destructuring, Default Params, Optional Chaining và Nullish Coalescing).

---

## 📸 Hình ảnh ghi chú & Giao diện thực tế

### 1. Bài 3: ProductCard an toàn dữ liệu (Xử lý dữ liệu thiếu)
*Hình ảnh hiển thị kết quả chạy thực tế trên trình duyệt với 3 sản phẩm (sản phẩm đầy đủ, sản phẩm thiếu ảnh/rating, và sản phẩm trống gần như hoàn toàn):*

> ![Giao diện ProductCard Lab](image_92e2ed.jpg)

* **Ghi chú:** Sản phẩm 2 và sản phẩm 3 cố tình bị thiếu các trường dữ liệu (`image`, `category`, `rating`). Nhờ áp dụng toán tử `??` và `?.`, giao diện không bị crash mà tự động hiển thị ảnh dự phòng **"No Image"**, nhãn **"Chưa phân loại"** và giá **0 đ** hoặc **"Liên hệ"** một cách mượt mà.

---

## 🛠️ Các bài học và Lỗi thực tế đã gặp phải

### 1. Lỗi cấu trúc thư mục & Khởi tạo dự án (`npm error code ENOENT`)
* **Vấn đề:** Khi chạy lệnh `npm run dev` hoặc `npm install`, terminal báo lỗi không tìm thấy file `package.json` (`ENOENT: no such file or directory`).
* **Bài học rút ra:** 
  * Cần kiểm tra kỹ **vị trí đứng của Terminal** (đã trỏ đúng vào thư mục gốc của dự án chứa file `package.json` hay chưa).
  * Nếu tạo mới một thư mục thủ công mà quên khởi tạo dự án React (Vite), cần chạy lệnh `npm create vite@latest . -- --template react` để tạo bộ khung chuẩn.

### 2. Lỗi trắng trang (Blank Screen) do thiếu file `main.jsx` hoặc chưa Import CSS
* **Vấn đề:** Ứng dụng chạy thành công nhưng màn hình hoàn toàn trống trơn (màu trắng).
* **Bài học rút ra:** 
  * Phải luôn đảm bảo đã import file CSS của Bootstrap trong `src/main.jsx`: `import 'bootstrap/dist/css/bootstrap.min.css';`.
  * Khi gặp trắng trang, luôn bấm phím **F12** để kiểm tra tab **Console** nhằm phát hiện sớm các lỗi cú pháp ngầm hoặc lỗi mất file component.

### 3. Lỗi export/import component (`does not provide an export named 'default'`)
* **Vấn đề:** Trình duyệt báo lỗi cú pháp khi gọi component ở `App.jsx` vì không tìm thấy module export mặc định.
* **Bài học rút ra:** Mọi file component React tự tạo (như `WelcomeCard.jsx`, `StudentCard.jsx`, `ProductCard.jsx`) ở cuối file bắt buộc phải có câu lệnh xuất mặc định:
  ```javascript
  export default TenComponent;
