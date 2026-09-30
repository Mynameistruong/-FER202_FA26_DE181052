# Bài 1: Bộ đếm có bước nhảy và lịch sử (reducer đầu tiên)

Ứng dụng thực hành `useReducer`: state bộ đếm, bước nhảy và lịch sử được cập nhật cùng nhau trong một reducer thuần.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

## Mục tiêu

- Dùng action có `type` và `payload` để mô tả thao tác.
- Gom logic tăng, giảm, đổi bước và reset trong `counterReducer`.
- Không vượt khỏi giới hạn 0–100; thao tác không đổi trả lại state cũ.
- Chỉ lưu 5 thay đổi số gần nhất, mới nhất ở đầu danh sách.

## Cấu trúc

- `src/App.jsx`: entry của ứng dụng.
- `src/usereducer/StepCounter.jsx`: sở hữu `useReducer` và kết nối các phần giao diện.
- `src/usereducer/CounterControls.jsx`, `CounterHistory.jsx`: components dùng React-Bootstrap.
- `src/usereducer/counterData.js`: kiểu state JSDoc, `MIN`, `MAX`, bước nhảy, giới hạn lịch sử và `initialState`.
- `src/usereducer/counterActions.js`: object `ACTIONS` theo tài liệu.
- `src/usereducer/counterReducer.js`: logic cập nhật state thuần.
- `src/main.jsx`: React root và Bootstrap CSS.

## Tự kiểm tra

1. Bấm `+ 1`, chọn bước `25`, rồi bấm `+ 25` bốn lần. Bộ đếm phải lần lượt tới `26`, `51`, `76`, `100`.
2. Lịch sử lúc chạm `100` phải là `76 → 100`, `51 → 76`, `26 → 51`, `1 → 26`, `0 → 1`.
3. Tại `100`, nút tăng bị mờ; bấm giảm nhiều lần thì dừng ở `0` và nút giảm bị mờ.
4. Khi chạm giới hạn, lịch sử không thêm dòng `100 → 100` hoặc `0 → 0`.
5. Lịch sử giữ đúng 5 thay đổi gần nhất. Bấm "Đặt lại" để đưa số về `0`, bước về `1` và xóa lịch sử.

Chạy `npm run lint` và `npm run build` để kiểm tra mã nguồn và bản production.
