# Issue drafts · usereducer-exercises

## Issue 1: Bộ đếm có bước nhảy và lịch sử

### 📌 Mô tả yêu cầu (Description)
Xây dựng bộ đếm dùng `useReducer` để quản lý giá trị, bước nhảy và lịch sử trong cùng một state. Giá trị giới hạn từ 0 đến 100; các thao tác chạm giới hạn không tạo thêm lịch sử.

### 🎯 Mục tiêu (Objectives)
- [ ] Gom logic tăng, giảm, đổi bước và reset vào reducer thuần.
- [ ] Dùng action có `type` và `payload`, trả lại state cũ nếu thao tác không làm thay đổi dữ liệu.
- [ ] Hiển thị bộ đếm, điều khiển bước nhảy và tối đa 5 thay đổi gần nhất.

### ✅ Danh sách công việc (Checklist)
- [ ] Tạo `src/data/counterData.js` cho giới hạn, bước nhảy, action type và state ban đầu.
- [ ] Tạo `src/reducers/counterReducer.js` với `clamp`, các nhánh increment/decrement, set step, reset và `default` báo lỗi.
- [ ] Hoàn thiện `StepCounter.jsx`, `CounterControls.jsx` và `CounterHistory.jsx` trong `src/components/useReducer/`.
- [ ] Vô hiệu hóa nút tăng/giảm ở giới hạn; không ghi lịch sử khi giá trị không đổi.
- [ ] Kiểm tra bước 25 chạm 100, lịch sử không quá 5 dòng và reset xóa lịch sử, đưa bước về 1.

### 📸 Hình ảnh giao diện / Minh họa (Screenshots)
<!-- Tải lên hoặc dán (Paste) hình ảnh thiết kế, giao diện thực tế hoặc lỗi tại đây -->

---

## Issue 2: Theo dõi trạng thái đơn hàng

### 📌 Mô tả yêu cầu (Description)
Xây dựng giao diện theo dõi vòng đời đơn hàng bằng reducer như một state machine. Chỉ cho phép các sự kiện hợp lệ theo trạng thái; reducer phải tự chặn action không hợp lệ và kiểm tra lý do hủy.

### 🎯 Mục tiêu (Objectives)
- [ ] Mô tả các chuyển trạng thái bằng bảng `TRANSITIONS` dùng chung cho reducer và giao diện.
- [ ] Giữ reducer thuần; lấy thời gian ở event handler rồi truyền vào action.
- [ ] Hiển thị trạng thái, lỗi, timeline và thao tác tạo đơn mới.

### ✅ Danh sách công việc (Checklist)
- [ ] Tạo `src/data/orderData.js` cho transitions, nhãn/màu trạng thái, nhãn sự kiện và state ban đầu.
- [ ] Tạo `src/reducers/orderReducer.js` xử lý đổi lý do, reset, chuyển trạng thái và validation lý do hủy tối thiểu 5 ký tự.
- [ ] Hoàn thiện `src/components/useReducer/OrderTracker.jsx` với các nút sự kiện, ô lý do hủy, cảnh báo và timeline.
- [ ] Vô hiệu hóa sự kiện không hợp lệ; thêm nút thử gửi `SHIP` để xác nhận reducer vẫn chặn action sai.
- [ ] Kiểm tra luồng giao hàng, luồng hủy, timeline và nút tạo đơn mới ở trạng thái cuối.

### 📸 Hình ảnh giao diện / Minh họa (Screenshots)
<!-- Tải lên hoặc dán (Paste) hình ảnh thiết kế, giao diện thực tế hoặc lỗi tại đây -->

---

## Issue 3: Bảng Kanban quản lý công việc

### 📌 Mô tả yêu cầu (Description)
Tạo bảng Kanban ba cột để thêm, di chuyển, đổi tên, xóa và lọc công việc theo ưu tiên. Dữ liệu công việc dùng `useReducer`; trạng thái giao diện như nội dung nhập và bộ lọc dùng `useState`.

### 🎯 Mục tiêu (Objectives)
- [ ] Tách reducer và action creator khỏi component; cấp ID mới bằng `nextId` trong state.
- [ ] Hiển thị số thẻ mỗi cột, nhãn ưu tiên và các thao tác trên thẻ.
- [ ] Bộ lọc chỉ ảnh hưởng danh sách hiển thị, không làm mất dữ liệu.

### ✅ Danh sách công việc (Checklist)
- [ ] Tạo `src/data/taskData.js` cho cột, mức ưu tiên và state ban đầu.
- [ ] Tạo `src/reducers/taskReducer.js` với action creator thêm, chuyển cột, đổi tên, xóa và dọn cột hoàn thành.
- [ ] Tạo `src/components/useReducer/KanbanBoard.jsx` và component con `TaskCard.jsx`.
- [ ] Chặn tên rỗng, di chuyển vượt biên và các thao tác không làm thay đổi state.
- [ ] Thêm lọc ưu tiên, đổi tên bằng nhấp đúp và nút dọn cột hoàn thành có trạng thái disabled phù hợp.
- [ ] Kiểm tra số lượng ban đầu, thêm/chuyển thẻ, lọc, đổi tên và dọn cột.

### 📸 Hình ảnh giao diện / Minh họa (Screenshots)
<!-- Tải lên hoặc dán (Paste) hình ảnh thiết kế, giao diện thực tế hoặc lỗi tại đây -->

---

## Issue 4: Form đăng ký khóa học nhiều bước

### 📌 Mô tả yêu cầu (Description)
Xây dựng form đăng ký ba bước: thông tin học viên, chọn khóa học/lịch học và xác nhận. Dùng hàm `init` của `useReducer` để khởi tạo khóa học theo prop; chỉ chuyển bước khi dữ liệu của bước hiện tại hợp lệ.

### 🎯 Mục tiêu (Objectives)
- [ ] Quản lý bước hiện tại, bước đã truy cập, dữ liệu, lỗi và trạng thái gửi trong reducer.
- [ ] Kiểm tra dữ liệu theo từng bước và cập nhật lỗi ngay khi người dùng sửa trường đang lỗi.
- [ ] Giữ dữ liệu khi quay lại; cho phép nhảy tới bước đã truy cập và reset theo `initialCourseId`.

### ✅ Danh sách công việc (Checklist)
- [ ] Tạo `src/data/wizardData.js` cho khóa học, học phí, lịch học, tên bước và các trường theo bước.
- [ ] Tạo `src/reducers/wizardReducer.js` gồm `initWizard`, validation field/step và các action `CHANGE`, `NEXT`, `BACK`, `GO_TO`, `SUBMIT`, `RESET`.
- [ ] Tạo `src/components/useReducer/CourseWizard.jsx` dùng `useReducer(wizardReducer, initialCourseId, initWizard)`.
- [ ] Hoàn thiện các trường thông tin, chọn khóa học/lịch, bảng tóm tắt, xác nhận và màn hình thành công.
- [ ] Kiểm tra validation, khóa học khởi tạo theo prop, điều hướng, học phí và đăng ký khóa khác.

### 📸 Hình ảnh giao diện / Minh họa (Screenshots)
<!-- Tải lên hoặc dán (Paste) hình ảnh thiết kế, giao diện thực tế hoặc lỗi tại đây -->

---

## Issue 5: Bảng ghi chú có Hoàn tác / Làm lại

### 📌 Mô tả yêu cầu (Description)
Tạo bảng ghi chú có thể thêm, đổi màu, ghim, xóa và xóa hết. Bọc reducer ghi chú bằng higher-order reducer để hỗ trợ Undo/Redo với lịch sử tối đa 20 bước, không ghép logic lịch sử vào reducer gốc.

### 🎯 Mục tiêu (Objectives)
- [ ] Tách reducer nghiệp vụ ghi chú khỏi cơ chế Undo/Redo.
- [ ] Không ghi vào lịch sử khi action không làm thay đổi state; thao tác mới sau Undo phải xóa nhánh Redo.
- [ ] Hiển thị ghi chú đã ghim trước, bộ đếm Undo/Redo và hỗ trợ `Ctrl+Z` / `Ctrl+Y`.

### ✅ Danh sách công việc (Checklist)
- [ ] Tạo `src/data/notesData.js` cho màu ghi chú, action type và dữ liệu ban đầu.
- [ ] Tạo `src/reducers/notesReducer.js` xử lý thêm, đổi màu, ghim/bỏ ghim, xóa và xóa hết.
- [ ] Tạo `src/reducers/undoable.js` với `createHistory`, `UNDO`, `REDO` và giới hạn 20 state trong `past`.
- [ ] Tạo `src/components/useReducer/NotesBoard.jsx`, giữ nội dung nhập và màu đang chọn bằng `useState`.
- [ ] Thêm nút Undo/Redo có số bước, phím tắt trong bảng và sắp xếp ghi chú ghim lên trước.
- [ ] Kiểm tra no-op không tăng lịch sử, Undo/Redo khôi phục đúng state, thao tác mới xóa nhánh Redo và xóa hết có thể Undo.

### 📸 Hình ảnh giao diện / Minh họa (Screenshots)
<!-- Tải lên hoặc dán (Paste) hình ảnh thiết kế, giao diện thực tế hoặc lỗi tại đây -->
