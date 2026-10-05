# Thực hành useReducer

Ứng dụng gồm 5 bài theo tài liệu `useReducer.md`: bộ đếm có lịch sử, máy trạng thái đơn hàng, bảng Kanban, form đăng ký nhiều bước và ghi chú có Undo/Redo.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

Chọn bài cần thực hành ở danh sách đầu trang. Chạy `npm run lint` và `npm run build` để kiểm tra mã nguồn.

## Cấu trúc

- `src/components/useReducer/`: component màn hình từng bài và component giao diện dùng lại.
- `src/data/`: hằng số, cấu hình và state khởi tạo cho từng bài.
- `src/reducers/`: reducer thuần, action creator và higher-order reducer.
- `src/App.jsx`: bộ chọn bài thực hành.
- `src/main.jsx`: React root và Bootstrap CSS.
