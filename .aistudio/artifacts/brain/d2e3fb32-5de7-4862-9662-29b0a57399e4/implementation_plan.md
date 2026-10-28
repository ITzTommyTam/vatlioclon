# Hệ Thống Ôn Tập Vật Lí 12 — Chương 1: Vật Lí Nhiệt

Ứng dụng web ôn luyện và kiểm tra kiến thức **Chương I: Vật Lí Nhiệt** được số hóa 100% từ bộ đề gốc (gồm **75 câu trắc nghiệm 4 phương án** ở Phần I và **13 câu trắc nghiệm Đúng - Sai** với 52 mệnh đề ở Phần II, loại bỏ hoàn toàn Phần III - Câu trả lời ngắn theo yêu cầu). Mỗi câu hỏi và từng mệnh đề đều đi kèm công thức tính toán và giải thích vật lí chi tiết, kết hợp bảng tổng kết điểm số và chế độ ôn lại các câu làm sai.

## User Review & Critical Decisions

> [!IMPORTANT]
> Dưới đây là các quyết định thiết kế và tính năng đã được xác nhận từ câu trả lời của bạn, cùng phương án chấm điểm chuẩn hóa cho cấu trúc đề mới:

- **Chế độ hiển thị lời giải (Đã xác nhận)**: Hỗ trợ song song **2 chế độ**:
  - *Chế độ Ôn tập*: Kiểm tra đáp án và mở khung giải thích chi tiết (kèm công thức $Q = mc\Delta t$, $\Delta U = A + Q$, $Q = \lambda m$, $Q = Lm$...) ngay sau khi chọn đáp án ở từng câu.
  - *Chế độ Thi thử*: Làm bài liền mạch, tự do chuyển câu và thay đổi lựa chọn; chỉ công bố đáp án, điểm số và giải thích chi tiết sau khi bấm **Nộp bài**.
- **Tổ chức bộ đề (Đã xác nhận)**: Cho phép người học linh hoạt chọn phạm vi trước khi bắt đầu:
  - *Chỉ làm Phần I*: 75 câu trắc nghiệm nhiều phương án lựa chọn (A, B, C, D).
  - *Chỉ làm Phần II*: 13 câu trắc nghiệm Đúng - Sai (mỗi câu gồm 4 ý a, b, c, d).
  - *Làm toàn bộ đề*: Kết hợp cả Phần I và Phần II (tổng cộng 88 câu hỏi), hoàn toàn không tính Phần III (bài tập trả lời ngắn).
- **Thống kê kết quả & Làm lại câu sai (Đã xác nhận)**: Trang kết quả cuối bài hiển thị tổng điểm, tỷ lệ chính xác (%), thời gian hoàn thành, phân tích riêng từng phần, bộ lọc xem lại (Tất cả / Câu đúng / Câu sai / Chưa làm) và nút **Làm lại các câu sai** để rèn luyện triệt để những câu còn nhầm lẫn.
- **Quy tắc tính điểm câu Đúng - Sai (Mặc định khuyến nghị)**: Áp dụng cách tính lũy tiến chuẩn cấu trúc đề thi mới cho mỗi câu Đúng/Sai 4 ý (Đúng 1 ý: `0,1đ` · Đúng 2 ý: `0,25đ` · Đúng 3 ý: `0,5đ` · Đúng cả 4 ý: `1,0đ`), đồng thời hiển thị rõ số ý đúng trên tổng số 52 ý để học sinh dễ theo dõi.

---

## 1. Overview & Core Concept

- **Mục tiêu cốt lõi**: Giúp học sinh nắm vững lý thuyết động học phân tử, sự chuyển thể, nội năng, nguyên lí I nhiệt động lực học và các bài toán nhiệt lượng ($c, \lambda, L$) thông qua việc thực hành trực tiếp bộ 88 câu hỏi trong đề cương.
- **Đối tượng sử dụng**: Học sinh THPT ôn tập Chương 1: Vật Lí Nhiệt trên máy tính hoặc điện thoại, cần tra cứu nhanh công thức, đồ thị chuyển thể và lời giải từng bước.
- **Giá trị nổi bật**:
  - Toàn bộ **75 câu Phần I** và **13 câu Phần II** được biên tập chuẩn xác từ 10 trang tài liệu gốc, bao gồm cả bảng số liệu (nhiệt độ nóng chảy/sôi ở Câu 61) và các **hình vẽ/đồ thị kỹ thuật được tái tạo sắc nét bằng SVG** (thước đo nhiệt kế Câu 67, sơ đồ tam giác chuyển thể Câu 72, đồ thị nhiệt độ - thời gian Câu 73 & 75, mô hình phân tử Câu 74, và đồ thị đun nước đá Câu 5 Phần II).
  - Giải thích chi tiết từng câu trắc nghiệm và **giải thích riêng cho từng ý a, b, c, d** trong mỗi câu Đúng/Sai (trình bày rõ dữ kiện, đổi đơn vị SI và bước thế số).

---

## 2. User Experience & Visual Design

### Luồng trải nghiệm người dùng (Key User Flows)
1. **Màn hình Thiết lập & Tổng quan (Workspace khởi đầu)**:
   - Chọn **Phạm vi ôn tập**: *Toàn bộ đề (88 câu)*, *Phần I: Trắc nghiệm 4 lựa chọn (75 câu)*, hoặc *Phần II: Trắc nghiệm Đúng - Sai (13 câu)*.
   - Chọn **Chế độ làm bài**: *Chế độ Ôn tập (Xem giải thích ngay)* hoặc *Chế độ Thi thử (Nộp bài mới chấm)*.
   - Tùy chọn tra cứu nhanh **Bảng tóm tắt công thức Vật Lí Nhiệt** trước khi bước vào bài làm.
2. **Màn hình Làm bài (Two-Zone Sandbox Layout)**:
   - **Vùng chính bên trái (68% độ rộng trên Desktop)**: Hiển thị nội dung câu hỏi, bảng dữ liệu hoặc đồ thị SVG minh họa, các phương án lựa chọn (A/B/C/D hoặc bảng 4 mệnh đề a, b, c, d với nút chọn Đúng / Sai rõ ràng) và khung **Giải thích chi tiết** (hiển thị ngay khi trả lời ở chế độ Ôn tập).
   - **Vùng điều khiển bên phải (32% độ rộng trên Desktop)**: Bản đồ câu hỏi (Question Palette) chia rõ Phần I (1–75) và Phần II (1–13), hiển thị tiến độ hoàn thành theo thời gian thực, nút đánh dấu câu cần xem lại, chuyển nhanh đến câu bất kỳ và nút **Nộp bài & Xem kết quả**.
3. **Màn hình Kết quả & Phân tích chi tiết**:
   - Hiển thị bảng điểm tổng kết, số câu trả lời đúng ở Phần I (`/75`), số ý trả lời đúng ở Phần II (`/52 ý`), tỷ lệ phần trăm chính xác và thời gian làm bài.
   - Nút hành động chính **Làm lại các câu sai** giúp khởi tạo ngay một lượt ôn tập chỉ gồm những câu vừa trả lời sai hoặc chưa hoàn thành.
   - Danh sách rà soát toàn bộ câu hỏi bên dưới kèm bộ lọc trạng thái (*Tất cả · Đúng · Sai · Cần xem lại*) và lời giải chi tiết cho mọi câu.

### Định hướng thẩm mỹ & Hệ thống thị giác (Visual Identity & Theme)
- **Aesthetic Direction**: Phong cách học thuật hiện đại, rõ ràng và tập trung cao độ (*Clean Academic & Scientific Sandbox*), tuân thủ quy chuẩn thiết kế giáo dục với bố cục hai vùng cân đối, đường kẻ mảnh (`1px solid #E2E8F0`) và không dùng các chi tiết trang trí rườm rà.
- **Bảng màu 60-30-10 (Color Palette & Mood)**:
  - **60% Nền chính (Dominant Canvas)**: Nền sáng dịu mắt `#F8FAFC` (Slate 50) giúp đọc đề và công thức trong thời gian dài không mỏi mắt.
  - **30% Bề mặt cấu trúc (Structural Surfaces)**: Khung câu hỏi và bảng điều hướng nền trắng `#FFFFFF` kết hợp viền mảnh `#E2E8F0` và chữ chính `#0F172A` (độ tương phản cao đạt chuẩn WCAG AA).
  - **10% Điểm nhấn ngữ nghĩa (Semantic Accents)**:
    - Tương tác chính / Đang chọn: Xanh lam học thuật `#0284C7` (Vibrant Azure).
    - Đáp án Đúng: Xanh ngọc lục bảo `#059669` (Emerald 600) luôn đi kèm nhãn văn bản `✓ ĐÚNG` và biểu tượng kiểm tra.
    - Đáp án Sai: Đỏ san hô `#DC2626` (Coral Red) luôn đi kèm nhãn văn bản `✕ SAI`.
    - Câu đánh dấu xem lại: Vàng hổ phách `#D97706` (Amber 600).
- **Hệ thống chữ (Typography & Hierarchy)**:
  - **Tiêu đề & Đề mục**: `Plus Jakarta Sans` (SemiBold/Bold 600–700) tạo điểm nhấn hiện đại, rõ ràng.
  - **Nội dung câu hỏi & Lời giải**: `DM Sans` (Regular 400, Medium 500, cỡ chữ `16px`, chiều cao dòng `1.65`) tối ưu cho tiếng Việt và ký hiệu vật lí.
  - **Số liệu, Công thức & Bảng điểm**: `IBM Plex Mono` với thuộc tính `tabular-nums` giúp các con số, đơn vị (`J/(kg.K)`, `°C`, `K`, `kWh`, `Pa`) và đồng hồ bấm giờ thẳng hàng tuyệt đối.
- **Thanh điều hướng trên cùng (Top Bar Contract)**:
  - Thiết kế chuẩn 1 hàng, 3 vùng tách biệt:
    1. Tên ứng dụng: `Vật Lí Nhiệt 12`.
    2. Các liên kết điều hướng 1 dòng: `Làm bài`, `Phần I (75 câu)`, `Phần II (Đúng/Sai)`, `Công thức`, `Kết quả`.
    3. Nút hành động chính: `Nộp bài` (hoặc `Bắt đầu mới` khi đang ở màn hình kết quả).

---

## 3. Key Product Decisions & Trade-Offs

- **Quyết định 1: Tái tạo đồ thị & hình vẽ bằng Vector SVG nội tuyến thay vì cắt ảnh mờ**
  - *Phương án chọn*: Vẽ lại chính xác 6 hình minh họa trong đề (Câu 67, 72, 73, 74, 75 Phần I và Câu 5 Phần II) bằng các component SVG sắc nét, có chú thích trục tọa độ và điểm nút rõ ràng.
  - *Lý do*: Ảnh chụp đề giấy có bóng râm và góc nghiêng; sử dụng SVG giúp đồ thị nhiệt độ - thời gian và thước đo hiển thị sắc nét ở mọi kích thước màn hình, đồng thời vẫn cho phép bấm xem ảnh chụp trang đề gốc nếu muốn đối chiếu.
- **Quyết định 2: Xử lý cơ chế chấm điểm câu Đúng - Sai (Phần II) ở Chế độ Ôn tập**
  - *Phương án chọn*: Trong một câu Đúng/Sai (gồm 4 ý a, b, c, d), ở chế độ Ôn tập, ngay khi người dùng chọn Đúng hoặc Sai cho từng ý, hệ thống có thể phản hồi ngay hoặc bấm nút **"Kiểm tra câu này"** để đối chiếu cả 4 ý cùng lúc kèm lời giải chi tiết từng ý.
  - *Lý do*: Các ý a, b, c, d trong Phần II (như Câu 7, 11, 12, 13) có số liệu liên kết chặt chẽ với nhau (câu sau dùng kết quả câu trước); việc cho phép chọn đủ các ý hoặc bấm kiểm tra ngay giúp học sinh tư duy trọn vẹn bài toán trước khi đọc lời giải.
- **Quyết định 3: Lưu trữ tiến độ tự động trên trình duyệt (`localStorage`)**
  - *Phương án chọn*: Tự động lưu các đáp án đang chọn và lịch sử câu sai vào `localStorage`.
  - *Lý do*: Với bộ đề dài 88 câu, học sinh có thể ôn tập thành nhiều đợt mà không sợ mất bài làm khi tải lại trang, kèm nút "Làm mới bài tập" bất cứ lúc nào.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Sơ đồ Kiến trúc & Luồng dữ liệu

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        TOP NAVIGATION BAR (3-Zone)                         │
│  [Vật Lí Nhiệt 12]   [Làm bài · Phần I · Phần II · Công thức · Kết quả]    │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌───────────────────┐       ┌───────────────────┐       ┌────────────────────┐
│  SETUP & FORMULA  │       │   QUIZ SANDBOX    │       │  RESULTS & REVIEW  │
│  DRAWER / PANEL   │       │  (2-Zone Layout)  │       │     DASHBOARD      │
│                   │       │                   │       │                    │
│ • Chọn phạm vi:   │       │ ┌───────────────┐ │       │ • Tổng điểm & %    │
│   Tất cả / P1 / P2│       │ │ Question Stage│ │       │ • Điểm P.I & P.II  │
│ • Chọn chế độ:    │──────▶│ │ + SVG Diagrams│ │──────▶│ • Lọc: Đúng / Sai  │
│   Ôn tập / Thi thử│       │ │ + Explanation │ │       │ • Nút: "Làm lại    │
│ • Bảng công thức  │       │ └───────────────┘ │       │   các câu sai"     │
│   Chương 1        │       │ ┌───────────────┐ │       │ • Giải thích chi   │
│                   │       │ │Question Map & │ │       │   tiết toàn bộ đề  │
│                   │       │ │Progress Panel │ │       │                    │
│                   │       │ └───────────────┘ │       │                    │
└───────────────────┘       └─────────┬─────────┘       └─────────▲──────────┘
                                      │                           │
                                      ▼                           │
┌─────────────────────────────────────────────────────────────────┴──────────┐
│                 QUESTION BANK & STATE ENGINE (localStorage)                │
│  • 75 Câu Trắc Nghiệm 4 Lựa Chọn (Phần I) + Giải thích từng câu            │
│  • 13 Câu Trắc Nghiệm Đúng/Sai (Phần II - 52 ý) + Giải thích từng ý a,b,c,d│
│  • SVG Physics Diagrams (Câu 67, 72, 73, 74, 75 & Câu 5 Phần II)           │
└────────────────────────────────────────────────────────────────────────────┘
```

### Mô hình dữ liệu câu hỏi (Data Model)
- **Câu hỏi Phần I (`MultipleChoiceQuestion`)**:
  - `id`: Mã câu (`p1_q1` đến `p1_q75`), `number`: Số thứ tự (`1`–`75`).
  - `question`: Nội dung câu hỏi (hỗ trợ bảng dữ liệu cho Câu 61 và mã hình vẽ SVG cho Câu 67, 72, 73, 74, 75).
  - `options`: Mảng 4 phương án `{ key: 'A' | 'B' | 'C' | 'D', text: string }`.
  - `correctAnswer`: Đáp án đúng (`'A' | 'B' | 'C' | 'D'`).
  - `explanation`: Giải thích chi tiết lý thuyết hoặc các bước biến đổi công thức và thay số ra kết quả.
  - `topic`: Chủ đề con (Cấu tạo chất & Chuyển thể · Nội năng & Nguyên lí I · Thang nhiệt độ · Nhiệt dung riêng, Nhiệt nóng chảy & Nhiệt hóa hơi).
- **Câu hỏi Phần II (`TrueFalseQuestion`)**:
  - `id`: Mã câu (`p2_q1` đến `p2_q13`), `number`: Số thứ tự (`1`–`13`).
  - `stem`: Đoạn dẫn đề chung của câu hỏi (kèm hình vẽ đồ thị cho Câu 5).
  - `statements`: Mảng 4 mệnh đề `a, b, c, d`, mỗi mệnh đề gồm:
    - `key`: `'a' | 'b' | 'c' | 'd'`
    - `text`: Nội dung phát biểu.
    - `isTrue`: Giá trị chuẩn (`true` = Đúng, `false` = Sai).
    - `explanation`: Giải thích chi tiết vì sao phát biểu đó Đúng hoặc Sai (kèm phép tính cụ thể cho từng ý).

### Ánh xạ Tương tác & Trạng thái (Interactive State Mapping)
- **Chuyển đổi chế độ (`mode: 'practice' | 'exam'`)**:
  - Ở `practice`, khi chọn đáp án 1 câu Phần I hoặc bấm kiểm tra/chọn đủ 4 ý ở câu Phần II, khung giải thích chi tiết mở ra ngay lập tức với nhãn `✓ ĐÚNG` / `✕ SAI`.
  - Ở `exam`, lựa chọn được ghi nhận vào trạng thái tạm, bản đồ câu hỏi chuyển sang màu "Đã làm", và chỉ mở khóa lời giải khi người dùng xác nhận nộp bài.
- **Luồng "Làm lại các câu sai" (`retryIncorrectQuestions`)**:
  - Lọc danh sách các câu Phần I trả lời sai và các câu Phần II có ít nhất 1 ý sai từ lượt làm vừa rồi, khởi tạo phiên ôn tập tập trung chỉ gồm các câu đó ở chế độ Ôn tập để học sinh sửa sai ngay.
