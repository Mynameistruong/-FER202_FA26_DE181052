# Lab 6 – TODO 1 (NC1)

## Chạy project
1. Cài Node.js phiên bản tương thích với Vite 5 (khuyến nghị Node.js 18+).
2. Giải nén project và mở terminal trong thư mục `lab6`.
3. Chạy `npm install`.
4. Chạy `npm start` để mở đồng thời Vite và JSON Server, sau đó mở URL Vite hiển thị trong terminal.

## JSON Server
- Cơ sở dữ liệu mẫu nằm ở `db.json`; bản gốc để khôi phục nằm ở `db.backup.json`.
- API chạy tại `http://localhost:3001`; thử `GET /posts`, `GET /comments` hoặc `GET /profile`.
- `npm start` chạy đồng thời frontend Vite và API; cũng có thể khởi động riêng bằng `npm run dev` và `npm run server`.
- Form tạo bài viết gửi `POST` tới JSON Server, nên bài mới được lưu vào `db.json`. Các component Axios TODO 1 còn lại vẫn minh họa bằng JSONPlaceholder.

## Nội dung
Bảy component theo TODO 1 trong `Lab6_JsonServer.md`:
- `AxiosDemo.jsx`: GET một bài viết.
- `PostList.jsx`: GET danh sách với query params.
- `CreatePost.jsx`: POST.
- `UpdatePost.jsx`: GET rồi PUT.
- `PatchPost.jsx`: PATCH.
- `DeletePost.jsx`: GET danh sách rồi DELETE.
- `RequestConfig.jsx`: request cấu hình method, params, headers, timeout.

Các request dùng `async/await` và `try/catch`; các component GET có trạng thái loading và `finally` để tắt loading. Đây là TODO 1 nên các component gọi Axios trực tiếp; việc tách `axiosClient`/service thuộc TODO 2.

Lưu ý: JSONPlaceholder là API minh họa. POST/PUT/PATCH/DELETE trả kết quả mô phỏng, nhưng không lưu thay đổi lâu dài.
