import { TrueFalseQuestion } from '../types/quiz';

const BASE_URL = import.meta.env.BASE_URL || './';

const PAGE_IMAGES: Record<number, string> = {
  18: `${BASE_URL}assets/aistudio/2aOboR8hcdtiOuqkuJP3mNSoBpjcONMbgWOaFuDo_f51111c1.jpg`,
  19: `${BASE_URL}assets/aistudio/2aOboR8hcf2qiXy2Tm3PDTKg1FXFKcr7yugsFLrk_e69c1395.jpg`,
  20: `${BASE_URL}assets/aistudio/2aOboR8hceTQ4bhixGmtx6TAuQBVFCvwtmOC8AFs_3319091d.jpg`,
};

export const PART_2_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 'p2_q1',
    part: 2,
    number: 1,
    topic: 'Thang nhiệt độ & Nhiệt kế',
    sourcePage: 18,
    sourceImage: PAGE_IMAGES[18],
    stem: 'Trong các phát biểu sau đây, phát biểu nào là đúng và phát biểu nào là sai ?',
    summaryFormula: 'T(K) = t(°C) + 273 | Đơn vị nhiệt độ trong hệ SI: Kelvin (K)',
    statements: [
      {
        key: 'a',
        text: 'Nhiệt độ là số đo độ "nóng", "lạnh" của một vật.',
        isTrue: true,
        explanation:
          'Đúng. Nhiệt độ là đại lượng vật lí đặc trưng cho mức độ nóng, lạnh của một vật (về mặt vi mô là thước đo động năng chuyển động nhiệt trung bình của các phân tử).',
      },
      {
        key: 'b',
        text: 'Người ta dùng nhiệt kế để đo nhiệt độ.',
        isTrue: true,
        explanation: 'Đúng. Nhiệt kế là dụng cụ dùng để đo nhiệt độ của các vật.',
      },
      {
        key: 'c',
        text: 'Đơn vị đo nhiệt độ trong hệ SI là Celsius (kí hiệu °C).',
        isTrue: false,
        explanation:
          'Sai. Đơn vị đo nhiệt độ cơ bản trong hệ đo lường quốc tế SI là Kelvin (kí hiệu K), còn độ Celsius (°C) là đơn vị thông dụng.',
      },
      {
        key: 'd',
        text: '1°C tương ứng với 273 K.',
        isTrue: false,
        explanation:
          'Sai. Theo công thức T(K) = t(°C) + 273, mức 0°C tương ứng với 273 K, còn 1°C tương ứng với 1 + 273 = 274 K.',
      },
    ],
  },
  {
    id: 'p2_q2',
    part: 2,
    number: 2,
    topic: 'Nội năng & Nguyên lí I NĐLH',
    sourcePage: 18,
    sourceImage: PAGE_IMAGES[18],
    stem: 'Trong các phát biểu sau đây, phát biểu nào là đúng và phát biểu nào là sai ? Có thể làm thay đổi nội năng của vật bằng cách',
    summaryFormula: 'ΔU = A + Q (Hai cách làm biến đổi nội năng: Thực hiện công & Truyền nhiệt)',
    statements: [
      {
        key: 'a',
        text: 'thực hiện công và nhận nhiệt lượng.',
        isTrue: false,
        explanation:
          'Sai. Hai cách tổng quát làm thay đổi nội năng là thực hiện công và truyền nhiệt (truyền nhiệt lượng), trong đó truyền nhiệt bao gồm cả nhận nhiệt và tỏa nhiệt.',
      },
      {
        key: 'b',
        text: 'thực hiện công và truyền nhiệt lượng.',
        isTrue: true,
        explanation:
          'Đúng. Theo lý thuyết Nhiệt động lực học, có hai cách làm thay đổi nội năng của vật là thực hiện công và truyền nhiệt (truyền nhiệt lượng).',
      },
      {
        key: 'c',
        text: 'nhận công và nhận nhiệt lượng.',
        isTrue: false,
        explanation:
          'Sai. Nhận công và nhận nhiệt lượng chỉ là trường hợp làm tăng nội năng, chưa bao quát cả trường hợp vật thực hiện công hoặc tỏa nhiệt.',
      },
      {
        key: 'd',
        text: 'Nhận công và truyền nhiệt lượng.',
        isTrue: false,
        explanation:
          'Sai. Khái niệm tổng quát của quá trình cơ học làm biến đổi nội năng là "thực hiện công" (gồm cả vật nhận công và vật sinh công).',
      },
    ],
  },
  {
    id: 'p2_q3',
    part: 2,
    number: 3,
    topic: 'Thang nhiệt độ & Nhiệt kế',
    sourcePage: 18,
    sourceImage: PAGE_IMAGES[18],
    stem: 'Thông thường, nhiệt kế thủy ngân thường dùng để đo thân nhiệt có phạm vi đo từ 35°C đến 42°C. Trong mỗi phát biểu sau, em hãy chọn đúng hoặc sai.',
    summaryFormula: 'Thủy ngân nóng chảy ở −39°C và sôi ở 357°C; thân nhiệt người sống: 35°C – 42°C',
    statements: [
      {
        key: 'a',
        text: 'Vì đó là giới hạn tối đa trong sự dãn nở vì nhiệt của thủy ngân.',
        isTrue: false,
        explanation:
          'Sai. Thủy ngân ở thể lỏng từ −39°C đến 357°C nên giới hạn dãn nở vì nhiệt của thủy ngân rộng hơn khoảng 35°C – 42°C rất nhiều.',
      },
      {
        key: 'b',
        text: 'Vì thân nhiệt bình thường của con người nằm trong khoảng này.',
        isTrue: true,
        explanation:
          'Đúng. Nhiệt độ cơ thể người sống chỉ dao động quanh 37°C và không vượt ra ngoài khoảng từ 35°C đến 42°C. Giới hạn thang đo hẹp giúp chia vạch 0,1°C rõ ràng và chính xác.',
      },
      {
        key: 'c',
        text: 'Vì nhiệt độ cao hơn 42°C thì thể tích thủy ngân biến thiên không còn tuyến tính.',
        isTrue: false,
        explanation:
          'Sai. Trên 42°C (cho đến gần điểm sôi 357°C), thủy ngân vẫn dãn nở đều đặn và được dùng trong các nhiệt kế phòng thí nghiệm đo tới 100°C – 300°C.',
      },
      {
        key: 'd',
        text: 'Vì nhiệt độ thấp hơn 35°C thì thể tích thủy ngân biến thiên không còn tuyến tính.',
        isTrue: false,
        explanation:
          'Sai. Dưới 35°C (cho đến trên −39°C), thủy ngân vẫn ở thể lỏng và co dãn tuyến tính theo nhiệt độ.',
      },
    ],
  },
  {
    id: 'p2_q4',
    part: 2,
    number: 4,
    topic: 'Nội năng & Nguyên lí I NĐLH',
    sourcePage: 18,
    sourceImage: PAGE_IMAGES[18],
    stem: 'Trong mỗi phát biểu sau, em hãy chọn đúng hoặc sai.',
    summaryFormula: 'Công A và nhiệt lượng Q là số đo độ biến thiên nội năng ΔU',
    statements: [
      {
        key: 'a',
        text: 'Có hai cách làm thay đổi nội năng của vật là thực hiện công và truyền nhiệt.',
        isTrue: true,
        explanation: 'Đúng. Đây là hai phương thức cơ bản để làm biến đổi nội năng của một hệ nhiệt động.',
      },
      {
        key: 'b',
        text: 'Công và nhiệt lượng là hai dạng cụ thể của nội năng.',
        isTrue: false,
        explanation:
          'Sai. Nội năng gồm động năng và thế năng phân tử; còn công (A) và nhiệt lượng (Q) chỉ là số đo độ biến thiên nội năng trong quá trình thực hiện công hoặc truyền nhiệt (một vật có nội năng chứ không "chứa" công hay nhiệt lượng).',
      },
      {
        key: 'c',
        text: 'Khi xoa hai bàn tay vào nhau, nội năng của hai bàn tay tăng là do sự truyền nhiệt.',
        isTrue: false,
        explanation:
          'Sai. Khi xoa hai bàn tay vào nhau, ta thực hiện công thắng lực ma sát làm nội năng của hai bàn tay tăng lên (biến đổi nội năng bằng cách thực hiện công).',
      },
      {
        key: 'd',
        text: 'Nội năng của chiếc yên xe đạp khi để ngoài trời nắng tăng lên là do sự truyền nhiệt.',
        isTrue: true,
        explanation:
          'Đúng. Yên xe đạp hấp thụ bức xạ nhiệt từ ánh nắng Mặt Trời làm nhiệt độ và nội năng tăng lên (quá trình truyền nhiệt).',
      },
    ],
  },
  {
    id: 'p2_q5',
    part: 2,
    number: 5,
    topic: 'Cấu trúc chất & Sự chuyển thể',
    sourcePage: 19,
    sourceImage: PAGE_IMAGES[19],
    diagram: 'p2_q5_heating_curve',
    stem: 'Hình bên là đường biểu diễn sự thay đổi nhiệt độ theo thời gian của thí nghiệm đun nóng liên tục của một lượng nước đá trong một bình không kín. Trong các phát biểu sau đây, phát biểu nào là đúng và phát biểu nào là sai ?',
    summaryFormula: 'OA (0°C): Nóng chảy | AB (0°C→100°C): Thể lỏng | BC (100°C): Đang sôi | CD (>100°C): Thể hơi',
    statements: [
      {
        key: 'a',
        text: 'Đoạn OA cho biết nước tồn tại ở cả thể rắn và thể lỏng.',
        isTrue: true,
        explanation:
          'Đúng. Đoạn OA nằm ngang ở 0°C biểu diễn quá trình nước đá đang nóng chảy, khi đó nước tồn tại đồng thời ở cả thể rắn (nước đá) và thể lỏng (nước).',
      },
      {
        key: 'b',
        text: 'Đoạn AB cho biết nước đang tồn tại ở thể rắn.',
        isTrue: false,
        explanation:
          'Sai. Tại điểm A nước đá đã tan hết; trên đoạn AB (nhiệt độ tăng từ 0°C lên 100°C) nước tồn tại hoàn toàn ở thể lỏng.',
      },
      {
        key: 'c',
        text: 'Đoạn BC cho biết nước đang sôi.',
        isTrue: true,
        explanation:
          'Đúng. Đoạn BC nằm ngang ở 100°C biểu diễn quá trình nước đang sôi (chuyển từ thể lỏng sang thể hơi ở nhiệt độ không đổi 100°C).',
      },
      {
        key: 'd',
        text: 'Đoạn CD cho biết nước không tồn tại ở thể lỏng mà đang ở thể hơi.',
        isTrue: true,
        explanation:
          'Đúng. Sau điểm C, toàn bộ lượng nước lỏng đã hóa hơi hoàn toàn; đoạn CD có nhiệt độ lớn hơn 100°C ứng với nước ở thể hơi (khí).',
      },
    ],
  },
  {
    id: 'p2_q6',
    part: 2,
    number: 6,
    topic: 'Cấu trúc chất & Sự chuyển thể',
    sourcePage: 19,
    sourceImage: PAGE_IMAGES[19],
    stem: 'Trong các phát biểu sau đây, phát biểu nào là đúng và phát biểu nào là sai ?',
    statements: [
      {
        key: 'a',
        text: 'Chất khí không có hình dạng và thể tích riêng, luôn chiếm toàn bộ thể tích bình chứa và có thể nén được dễ dàng.',
        isTrue: true,
        explanation:
          'Đúng. Do khoảng cách giữa các phân tử khí rất lớn và lực tương tác rất yếu nên chất khí chiếm toàn bộ bình chứa và dễ nén.',
      },
      {
        key: 'b',
        text: 'Chất rắn kết tinh có thể tích và hình dạng riêng xác định, rất khó nén.',
        isTrue: true,
        explanation:
          'Đúng. Ở chất rắn kết tinh, các hạt liên kết chặt chẽ theo cấu trúc mạng tinh thể nên có hình dạng, thể tích xác định và rất khó nén.',
      },
      {
        key: 'c',
        text: 'Vật ở thể lỏng có thể tích riêng nhưng không có hình dạng riêng.',
        isTrue: true,
        explanation:
          'Đúng. Chất lỏng có thể tích riêng xác định nhưng có hình dạng của phần bình chứa nó.',
      },
      {
        key: 'd',
        text: 'Các chất không thể chuyển từ dạng này sang dạng khác.',
        isTrue: false,
        explanation:
          'Sai. Khi điều kiện nhiệt độ và áp suất thay đổi thích hợp, các chất có thể chuyển từ thể này sang thể khác (nóng chảy, đông đặc, hóa hơi, ngưng tụ, thăng hoa, ngưng kết).',
      },
    ],
  },
  {
    id: 'p2_q7',
    part: 2,
    number: 7,
    topic: 'Nhiệt nóng chảy & Nhiệt hóa hơi',
    sourcePage: 19,
    sourceImage: PAGE_IMAGES[19],
    stem: 'Một ấm đun nước chứa 500g nước ở 20°C. Cho nhiệt dung riêng của nước là c = 4180J/(kg.K) và nhiệt hóa hơi riêng của nước ở 100°C là L = 2,3.10⁶ J/kg. Trong các phát biểu sau đây, phát biểu nào là đúng và phát biểu nào là sai ?',
    summaryFormula: 'Q = m·c·Δt + L·m = 0,5×4180×(100−20) + 2,3·10⁶×0,5 = 167200 + 1150000 = 1,3172·10⁶ J',
    statements: [
      {
        key: 'a',
        text: 'Nhiệt hóa hơi riêng của nước là nhiệt lượng cần để 1kg nước chuyển hoàn toàn từ thể lỏng sang thể khí ở nhiệt độ sôi.',
        isTrue: true,
        explanation:
          'Đúng. Đây chính là định nghĩa nhiệt hóa hơi riêng của nước ở nhiệt độ sôi.',
      },
      {
        key: 'b',
        text: 'Cần cung cấp 2,3.10⁶ J/kg cho 500g nước hóa hơi hoàn toàn ở 100°C.',
        isTrue: false,
        explanation:
          'Sai. Thứ nhất, đơn vị nhiệt lượng là J (không phải J/kg). Thứ hai, với m = 500 g = 0,5 kg nước ở 100°C thì nhiệt lượng cần để hóa hơi hoàn toàn là Q_hh = L.m = 2,3.10⁶ × 0,5 = 1,15.10⁶ J.',
      },
      {
        key: 'c',
        text: 'Trong quá trình sôi, nhiệt độ của nước hầu như không đổi là 100°C.',
        isTrue: true,
        explanation:
          'Đúng. Trong suốt quá trình nước đang sôi ở áp suất tiêu chuẩn, nhiệt độ của nước giữ không đổi ở 100°C.',
      },
      {
        key: 'd',
        text: 'Nhiệt lượng cần thiết để làm cho 500g nước này chuyển hóa hoàn toàn thành hơi là 1,65.10⁶ J.',
        isTrue: false,
        explanation:
          'Sai. Tổng nhiệt lượng cần thiết gồm:\n- Đun nước từ 20°C lên 100°C: Q₁ = m.c.(100 − 20) = 0,5 × 4180 × 80 = 167 200 J.\n- Hóa hơi hoàn toàn 0,5 kg nước ở 100°C: Q₂ = L.m = 2,3.10⁶ × 0,5 = 1 150 000 J.\n⇒ Tổng Q = Q₁ + Q₂ = 1 317 200 J ≈ 1,32.10⁶ J (khác 1,65.10⁶ J).',
      },
    ],
  },
  {
    id: 'p2_q8',
    part: 2,
    number: 8,
    topic: 'Mô hình động học phân tử',
    sourcePage: 19,
    sourceImage: PAGE_IMAGES[19],
    stem: 'Trong các phát biểu sau đây về mô hình động học phân tử, phát biểu nào sau đây là đúng, phát biểu nào sau đây là sai ?',
    statements: [
      {
        key: 'a',
        text: 'Các chất được cấu tạo bởi một số rất lớn những hạt có kích thước rất nhỏ được gọi chung là phân tử.',
        isTrue: true,
        explanation:
          'Đúng. Nội dung thứ nhất của thuyết động học phân tử: Các chất được cấu tạo từ các hạt riêng biệt rất nhỏ gọi là phân tử.',
      },
      {
        key: 'b',
        text: 'Các phân tử chuyển động không ngừng theo mọi hướng, chuyển động này được gọi là chuyển động nhiệt.',
        isTrue: true,
        explanation:
          'Đúng. Vì chuyển động hỗn loạn không ngừng của các phân tử liên quan chặt chẽ đến nhiệt độ nên được gọi là chuyển động nhiệt.',
      },
      {
        key: 'c',
        text: 'Giữa các phân tử có lực tương tác. Khi các phân tử gần nhau thì lực hút chiếm ưu thế và khi xa nhau thì lực đẩy chiếm ưu thế.',
        isTrue: false,
        explanation:
          'Sai. Khi khoảng cách giữa các phân tử rất nhỏ (rất gần nhau, nhỏ hơn khoảng cách cân bằng r₀) thì lực đẩy chiếm ưu thế; khi khoảng cách lớn hơn r₀ (xa nhau hơn) thì lực hút mới chiếm ưu thế.',
      },
      {
        key: 'd',
        text: 'Các phân tử chuyển động nhiệt càng nhanh thì nhiệt độ của vật càng cao.',
        isTrue: true,
        explanation:
          'Đúng. Tốc độ chuyển động nhiệt trung bình của các phân tử càng lớn thì nhiệt độ của vật càng cao.',
      },
    ],
  },
  {
    id: 'p2_q9',
    part: 2,
    number: 9,
    topic: 'Nội năng & Nguyên lí I NĐLH',
    sourcePage: 19,
    sourceImage: PAGE_IMAGES[19],
    stem: 'Đâu là nhận định đúng, sai khi nói về nội năng của một vật.',
    summaryFormula: 'U = W_đ(phân tử) + W_t(phân tử) = f(T, V)',
    statements: [
      {
        key: 'a',
        text: 'Nội năng của một vật không phụ thuộc vào nhiệt độ và thể tích của vật.',
        isTrue: false,
        explanation:
          'Sai. Động năng phân tử phụ thuộc vào nhiệt độ, thế năng phân tử phụ thuộc vào thể tích nên nội năng của một vật phụ thuộc vào cả nhiệt độ và thể tích của vật.',
      },
      {
        key: 'b',
        text: 'Nội năng của một vật có thể bị biến đổi bằng quá trình truyền nhiệt hoặc thực hiện công.',
        isTrue: true,
        explanation:
          'Đúng. Thực hiện công và truyền nhiệt là hai hình thức làm biến đổi nội năng của vật.',
      },
      {
        key: 'c',
        text: 'Số đo độ biến thiên nội năng trong quá trình truyền nhiệt được gọi là công.',
        isTrue: false,
        explanation:
          'Sai. Số đo độ biến thiên nội năng trong quá trình truyền nhiệt được gọi là nhiệt lượng (Q); còn công (A) là số đo độ biến thiên nội năng trong quá trình thực hiện công.',
      },
      {
        key: 'd',
        text: 'Nội năng của một vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật.',
        isTrue: true,
        explanation:
          'Đúng. Theo định nghĩa, nội năng của vật bằng tổng động năng chuyển động nhiệt và thế năng tương tác của các phân tử cấu tạo nên vật.',
      },
    ],
  },
  {
    id: 'p2_q10',
    part: 2,
    number: 10,
    topic: 'Cấu trúc chất & Sự chuyển thể',
    sourcePage: 19,
    sourceImage: PAGE_IMAGES[19],
    stem: 'Trong các phát biểu sau đây về sự bay hơi và sự sôi của chất lỏng, phát biểu nào là đúng và phát biểu nào là sai ?',
    statements: [
      {
        key: 'a',
        text: 'Sự bay hơi là sự hóa hơi xảy ra ở mặt thoáng của khối chất lỏng.',
        isTrue: true,
        explanation: 'Đúng. Sự bay hơi là quá trình chuyển từ thể lỏng sang thể khí diễn ra trên bề mặt thoáng của chất lỏng.',
      },
      {
        key: 'b',
        text: 'Sự hóa hơi xảy ra ở cả mặt thoáng và trong lòng của khối chất lỏng khi chất lỏng sôi.',
        isTrue: true,
        explanation: 'Đúng. Khi chất lỏng sôi, sự hóa hơi diễn ra đồng thời ở cả trong lòng chất lỏng và trên mặt thoáng.',
      },
      {
        key: 'c',
        text: 'Sự bay hơi diễn ra chỉ ở một số nhiệt độ nhất định.',
        isTrue: false,
        explanation: 'Sai. Sự bay hơi của chất lỏng xảy ra ở mọi nhiệt độ (nhiệt độ càng cao thì tốc độ bay hơi càng nhanh).',
      },
      {
        key: 'd',
        text: 'Sự sôi diễn ra ở nhiệt độ sôi.',
        isTrue: true,
        explanation: 'Đúng. Mỗi chất lỏng chỉ sôi ở một nhiệt độ xác định gọi là nhiệt độ sôi (phụ thuộc áp suất trên mặt thoáng).',
      },
    ],
  },
  {
    id: 'p2_q11',
    part: 2,
    number: 11,
    topic: 'Nội năng & Nguyên lí I NĐLH',
    sourcePage: 20,
    sourceImage: PAGE_IMAGES[20],
    stem: 'Cung cấp một nhiệt lượng 1,5J cho một khối khí trong một xi lanh đặt nằm ngang. Chất khí nở ra đẩy pít-tông đi một đoạn 6cm. Biết lực ma sát giữa pít-tông và xi lanh có độ lớn là 20N, diện tích tiết diện của pít-tông là 1cm². Coi pít-tông chuyển động thẳng đều. Trong các phát biểu sau, phát biểu nào là đúng, phát biểu nào là sai ?',
    summaryFormula: 'p = F/S = 20 / 10⁻⁴ = 2·10⁵ Pa | |A| = F·d = 20×0,06 = 1,2 J | ΔU = Q + A = 1,5 − 1,2 = +0,3 J',
    statements: [
      {
        key: 'a',
        text: 'Trong quá trình dãn nở, áp suất của chất khí là 2.10⁵ Pa.',
        isTrue: true,
        explanation:
          'Đúng. Do pít-tông chuyển động thẳng đều nên lực đẩy của khí cân bằng với lực ma sát: F = F_ms = 20 N.\nTiết diện S = 1 cm² = 10⁻⁴ m² ⇒ Áp suất chất khí gây ra lên pít-tông là p = F / S = 20 / 10⁻⁴ = 2.10⁵ Pa.',
      },
      {
        key: 'b',
        text: 'Thể tích khí trong xilanh tăng 6 lít.',
        isTrue: false,
        explanation:
          'Sai. Độ tăng thể tích của khí là: ΔV = S.d = 1 cm² × 6 cm = 6 cm³ = 6.10⁻³ lít (không phải 6 lít).',
      },
      {
        key: 'c',
        text: 'Công của khối khí đã thực hiện có độ lớn là 1,2J.',
        isTrue: true,
        explanation:
          'Đúng. Độ lớn công do khối khí thực hiện khi đẩy pít-tông đi đoạn d = 6 cm = 0,06 m là: |A| = F.d = 20 × 0,06 = 1,2 J.',
      },
      {
        key: 'd',
        text: 'Độ biến thiên nội năng của khối khí trong quá trình này giảm 0,3J.',
        isTrue: false,
        explanation:
          'Sai. Khối khí nhận nhiệt lượng Q = +1,5 J và thực hiện công A = −1,2 J.\nTheo Nguyên lí I NĐLH: ΔU = Q + A = 1,5 + (−1,2) = +0,3 J > 0 ⇒ Nội năng của khối khí tăng thêm 0,3 J (chứ không phải giảm 0,3 J).',
      },
    ],
  },
  {
    id: 'p2_q12',
    part: 2,
    number: 12,
    topic: 'Nhiệt nóng chảy & Nhiệt hóa hơi',
    sourcePage: 20,
    sourceImage: PAGE_IMAGES[20],
    stem: 'Đặt 1kg nước ở 25°C vào ngăn đá của một chiếc tủ lạnh thì sau 65 phút, lượng nước này sẽ chuyển thành băng (nước đá) ở −14,5°C. Cho biết nhiệt nóng chảy riêng và nhiệt dung riêng của băng lần lượt là 0,34MJ/kg và 2,1kJ/(kg.K); nhiệt dung riêng của nước là 4,2kJ/(kg.K).',
    summaryFormula: 'Q = Q₁ + Q₂ + Q₃ = 105000 + 340000 + 30450 = 475450 J | P = Q / t = 475450 / 3900 ≈ 0,12191 kW',
    statements: [
      {
        key: 'a',
        text: 'Nhiệt lượng cần thiết để làm nguội nước từ 25°C xuống 0°C là 105000J.',
        isTrue: true,
        explanation:
          'Đúng. Q₁ = m.c_nước.(25 − 0) = 1 × 4200 × 25 = 105 000 J.',
      },
      {
        key: 'b',
        text: 'Nhiệt lượng cần thiết để làm đông đặc nước ở 0°C thành băng ở 0°C là 340000J.',
        isTrue: true,
        explanation:
          'Đúng. Q₂ = λ.m = 0,34.10⁶ × 1 = 340 000 J.',
      },
      {
        key: 'c',
        text: 'Nhiệt lượng cần thiết để làm nguội băng từ 0°C xuống −14,5°C là 30450J.',
        isTrue: true,
        explanation:
          'Đúng. Q₃ = m.c_băng.[0 − (−14,5)] = 1 × 2100 × 14,5 = 30 450 J.',
      },
      {
        key: 'd',
        text: 'Công suất làm lạnh của tủ lạnh là 0,12191 kW.',
        isTrue: true,
        explanation:
          'Đúng. Tổng nhiệt lượng tủ lạnh lấy đi: Q = Q₁ + Q₂ + Q₃ = 105 000 + 340 000 + 30 450 = 475 450 J.\nThời gian làm lạnh: t = 65 phút = 65 × 60 = 3900 s.\nCông suất làm lạnh: P = Q / t = 475 450 / 3900 ≈ 121,91 W = 0,12191 kW.',
      },
    ],
  },
  {
    id: 'p2_q13',
    part: 2,
    number: 13,
    topic: 'Nhiệt nóng chảy & Nhiệt hóa hơi',
    sourcePage: 20,
    sourceImage: PAGE_IMAGES[20],
    stem: 'Một nhà máy thép mỗi lần luyện được 35 tấn thép. Cho nhiệt nóng chảy riêng của thép là 2,77.10⁵ J/kg. Trong các phát biểu sau đây, phát biểu nào là đúng và phát biểu nào là sai ?',
    summaryFormula: 'Q = λ·m = 2,77·10⁵ × 35000 = 9,695·10⁹ J | m_khí = Q / q = 9,695·10⁹ / 44·10⁶ ≈ 220,34 kg',
    statements: [
      {
        key: 'a',
        text: 'Việc sử dụng khí đốt để vận hành các nhà máy thép có thể gây ô nhiễm môi trường.',
        isTrue: true,
        explanation:
          'Đúng. Quá trình đốt nhiên liệu hóa thạch (khí đốt) sinh ra khí nhà kính CO₂ và các khí thải công nghiệp gây ô nhiễm môi trường.',
      },
      {
        key: 'b',
        text: 'Cần cung cấp 2,77.10⁵ J cho 1kg thép để chuyển toàn bộ từ thể rắn sang thể lỏng tại nhiệt độ nóng chảy.',
        isTrue: true,
        explanation:
          'Đúng. Vì nhiệt nóng chảy riêng của thép là λ = 2,77.10⁵ J/kg nên 1 kg thép ở nhiệt độ nóng chảy cần thu nhiệt lượng 2,77.10⁵ J để nóng chảy hoàn toàn.',
      },
      {
        key: 'c',
        text: 'Nhiệt lượng cần cung cấp để làm nóng chảy trong mỗi lần luyện của nhà máy ở nhiệt độ nóng chảy là 9,695.10¹⁰ J.',
        isTrue: false,
        explanation:
          'Sai. Đổi m = 35 tấn = 35 000 kg.\nNhiệt lượng cần cung cấp cho mỗi lần luyện là: Q = λ.m = 2,77.10⁵ × 35 000 = 9,695.10⁹ J (chứ không phải 9,695.10¹⁰ J).',
      },
      {
        key: 'd',
        text: 'Biết khi đốt hoàn toàn 1kg khí đốt thì nhiệt lượng tỏa ra là 44.10⁶ J. Lượng khí đốt cần sử dụng để tạo ra nhiệt lượng 9,695.10⁹ J là 120kg.',
        isTrue: false,
        explanation:
          'Sai. Khối lượng khí đốt cần sử dụng là: m_khí = Q / q = 9,695.10⁹ / (44.10⁶) ≈ 220,34 kg (khác 120 kg).',
      },
    ],
  },
];
