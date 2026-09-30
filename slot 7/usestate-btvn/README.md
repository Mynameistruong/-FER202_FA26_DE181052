# useState BTVN

Một ứng dụng React + Vite duy nhất gồm 5 bài thực hành. Chọn bài bằng thanh điều hướng ở đầu trang; các component, dữ liệu và helper vẫn được tách riêng theo bài trong `src/`.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

Kiểm tra chất lượng bằng `npm run lint` và tạo bản production bằng `npm run build`.

## Bài tập

### Bài 1: FAQ Accordion

State boolean, toggle, state riêng theo từng item và nâng state lên cha. Thử mở nhiều câu ở chế độ thường, sau đó bật chế độ chỉ mở một câu. Nội dung câu hỏi nằm trong `src/data/faqs.js`; các biến thể item nằm trong `src/components/`.

### Bài 2: Đánh giá sao

Controlled component, state hover cục bộ, kiểm tra form, cập nhật mảng review và tính trung bình. Gửi đánh giá 4 sao rồi 2 sao để kiểm tra trung bình `3.0/5`. Nhãn sao nằm trong `src/data/ratingLabels.js`; form, rating, list và item là các component riêng.

### Bài 3: Máy tính BMI

Lưu giá trị input dạng chuỗi, validation, quy đổi đơn vị và tính kết quả dẫn xuất. Thử `170 cm`, `65 kg` rồi đổi sang mét; BMI phải giữ nguyên. Giới hạn, nhãn đơn vị và phân loại nằm trong `src/data/bmiConfig.js`; phép tính nằm trong `src/utils/bmi.js`.

### Bài 4: Quản lý điểm sinh viên

Thêm, sửa, xóa, sắp xếp bất biến và cập nhật object lồng nhau. Kiểm tra dữ liệu ban đầu có 3 sinh viên, điểm trung bình `6.33`, đạt `2/3`. Sinh viên và danh sách lựa chọn nằm trong `src/data/`; hàm sắp xếp/thống kê nằm trong `src/utils/studentHelpers.js`.

### Bài 5: Quiz trắc nghiệm

Lazy initializer, shuffle Fisher–Yates trên bản sao, object answers và reset bằng `key`. Chọn đáp án đầu tiên để xác nhận index `0` vẫn hợp lệ; hoàn thành rồi chọn "Làm lại" để kiểm tra lượt mới. Câu hỏi ở `src/data/questions.js`, thuật toán shuffle ở `src/utils/shuffle.js`.

## Cấu trúc

- `src/App.jsx`: điều hướng giữa năm bài.
- `src/usestate/FaqAccordion.jsx`: bài 1.
- `src/usestate/ReviewForm.jsx`: bài 2.
- `src/usestate/BmiCalculator.jsx`: bài 3.
- `src/usestate/StudentManager.jsx`: bài 4.
- `src/usestate/QuizApp.jsx`: bài 5.
- `src/components/`: các phần giao diện nhỏ, phân theo trách nhiệm.
- `src/data/`: dữ liệu và cấu hình tĩnh.
- `src/utils/`: hàm tính toán, sắp xếp và shuffle.
- `src/main.jsx`: khởi chạy React và nạp Bootstrap CSS.
