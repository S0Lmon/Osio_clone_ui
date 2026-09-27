/**
 * Dữ liệu một đợt khảo sát — nguồn duy nhất cho toàn bộ dashboard.
 *
 * ⚠️ HAI CHỖ PHẢI THAY BẰNG DỮ LIỆU THẬT TRƯỚC KHI DEMO:
 *   1. DISEASE_CLASSES — hiện là chỗ giữ chỗ. Lấy tên thật 3 lớp 0/1/2 từ Roboflow.
 *      KHÔNG mặc định là "gỉ sắt": Robusta kháng cao với Hemileia vastatrix,
 *      mà Tây Nguyên ~95% Robusta.
 *   2. CHEMICALS — mọi thuốc phải có registeredForDrone === true mới được chọn.
 *      Theo TCCS 830:2022/BVTV mỗi thuốc phải khảo nghiệm & đăng ký riêng cho
 *      hình thức phun bằng drone. Tới 04/7/2026 mới có 6 loại, trên
 *      thanh long / măng cụt / bưởi — CHƯA XÁC MINH ĐƯỢC loại nào cho cà phê.
 */

// ---------------------------------------------------------------- lớp bệnh
export const DISEASE_CLASSES = [
  { id: 0, code: 'class_0', label: 'Lớp 0 — chưa đặt tên', placeholder: true },
  { id: 1, code: 'class_1', label: 'Lớp 1 — chưa đặt tên', placeholder: true },
  { id: 2, code: 'class_2', label: 'Lớp 2 — chưa đặt tên', placeholder: true },
];

// ------------------------------------------------------------ thang mức độ
// 0 khoẻ · 1 nhẹ · 2 trung bình · 3 nặng
export const SEVERITY = [
  { level: 0, label: 'Khoẻ',      color: '#4CAF50', rate: 0.0 },
  { level: 1, label: 'Nhẹ',       color: '#FFCA28', rate: 0.6 },
  { level: 2, label: 'Trung bình',color: '#FF9800', rate: 1.0 },
  { level: 3, label: 'Nặng',      color: '#EF5350', rate: 1.4 },
];

// -------------------------------------------------------------- thửa & lưới
export const PLOT = {
  name: 'Vườn sau nhà — Cư M\'gar',
  owner: 'Chú Bảy',
  areaHa: 1.3,
  surveyedAt: '28/8/2026',
  orthoSource: 'DJI Terra',
};

// Lưới mức độ bệnh — 12 cột × 9 hàng. Thay bằng đầu ra thật của YOLO11s-seg.
export const GRID = [
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,1,1,2,1,0,0,0,1,0,0],
  [0,1,2,2,3,2,1,0,1,1,0,0],
  [0,1,2,3,3,3,2,1,1,2,1,0],
  [0,0,1,2,3,2,2,1,1,1,0,0],
  [0,0,1,1,2,1,1,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
];

// ------------------------------------------------------ hình học ô lưới
/**
 * Diện tích mỗi ô được SUY RA từ diện tích thửa chia cho số ô, không đặt cứng.
 *
 * Trước đây cellSizeM đặt cứng 5 m: 108 ô × 25 m² = 0,27 ha, trong khi thửa khai
 * 1,3 ha — lệch gần 5 lần, kéo theo tổng lượng thuốc và % tiết kiệm sai theo.
 * Suy ra thì hai con số không bao giờ mâu thuẫn được nữa.
 */
export function cellAreaHa(grid = GRID) {
  return PLOT.areaHa / grid.flat().length;
}

export function cellSizeM(grid = GRID) {
  return Math.sqrt(cellAreaHa(grid) * 10000);
}

// --------------------------------------------------------------- thống kê
export function gridStats(grid = GRID) {
  const flat = grid.flat();
  const total = flat.length;
  const counts = [0, 0, 0, 0];
  flat.forEach((v) => { counts[v] += 1; });
  const pct = counts.map((c) => (c / total) * 100);
  return {
    total,
    counts,
    pct,
    // "% diện tích nhiễm" = mọi ô từ mức 1 trở lên
    infectedPct: pct[1] + pct[2] + pct[3],
  };
}

// ------------------------------------------------------------ danh mục thuốc
/**
 * Chỉ thuốc có registeredForDrone === true mới được phép chọn ở T4.
 * Danh sách này phải đối chiếu Thông tư 28/2026/TT-BNNMT trước khi dùng thật.
 */
export const CHEMICALS = [
  {
    id: 'placeholder',
    activeIngredient: '— chưa xác minh —',
    crop: 'Cà phê',
    registeredForDrone: false,
    phiDays: null,
    baseRateLpHa: null,
    note: 'Chưa xác minh được hoạt chất nào đăng ký phun drone cho cà phê (TCCS 830:2022).',
  },
];

/**
 * Hoạt chất DEMO — chỉ để trình diễn luồng xuất bản đồ khi pitch.
 *
 * ⚠️ KHÔNG phải dữ liệu thật. Chưa xác minh được hoạt chất nào đăng ký phun
 * drone cho cà phê. Khi bật, giao diện hiện băng cảnh báo màu vàng ở mọi nơi
 * dùng số liệu này — cố ý, để không ai (kể cả nhóm) nhầm demo với thật.
 *
 * Khi tra được hoạt chất thật trong Thông tư 28/2026/TT-BNNMT: thêm vào
 * CHEMICALS với registeredForDrone: true rồi xoá khối này đi.
 */
export const DEMO_CHEMICAL = {
  id: 'demo',
  activeIngredient: 'Hoạt chất mẫu (DEMO)',
  crop: 'Cà phê',
  registeredForDrone: true,
  isDemo: true,
  phiDays: 14,
  baseRateLpHa: 18,
  note: 'Số liệu dựng sẵn để trình diễn. Không dùng ngoài thực địa.',
};

export const REGISTERED_CHEMICALS = CHEMICALS.filter((c) => c.registeredForDrone);

// ------------------------------------------------- đơn thuốc theo vùng liều
/**
 * Sinh đơn thuốc từ lưới severity.
 * Liều mỗi vùng = liều nền của hoạt chất × hệ số theo mức độ.
 * Vùng mức 0 không phun — đó là toàn bộ điểm của VRA.
 */
export function buildPrescription(grid, chemical) {
  const stats = gridStats(grid);
  const cellHa = cellAreaHa(grid);
  const base = chemical?.baseRateLpHa ?? 0;

  const zones = SEVERITY.filter((s) => s.level > 0).map((s) => {
    const cells = stats.counts[s.level];
    const areaHa = cells * cellHa;
    const rateLpHa = base * s.rate;
    return {
      level: s.level,
      label: s.label,
      color: s.color,
      cells,
      areaHa,
      rateLpHa,
      volumeL: areaHa * rateLpHa,
    };
  });

  const treatedAreaHa = zones.reduce((a, z) => a + z.areaHa, 0);
  const totalVolumeL = zones.reduce((a, z) => a + z.volumeL, 0);
  // Đối chứng: phun đều toàn thửa ở liều mức trung bình
  const blanketVolumeL = PLOT.areaHa * base;
  const savingPct = blanketVolumeL > 0
    ? ((blanketVolumeL - totalVolumeL) / blanketVolumeL) * 100
    : 0;

  return { zones, treatedAreaHa, totalVolumeL, blanketVolumeL, savingPct };
}

// --------------------------------------------------------- cửa sổ phun (T6)
/**
 * Ngưỡng gió theo khuyến cáo chung cho phun bằng drone.
 * Đây là giá trị tạm — cần đối chiếu hướng dẫn của nhà sản xuất và
 * quy định địa phương trước khi dùng thật.
 */
export const WIND_LIMITS = { good: 3.0, caution: 4.5 }; // m/s

export const FORECAST = [
  { day: 'T4', date: '2/9',  windMs: 4.8, tempC: 31, rainPct: 20, humidity: 62 },
  { day: 'T5', date: '3/9',  windMs: 1.8, tempC: 27, rainPct: 5,  humidity: 74 },
  { day: 'T6', date: '4/9',  windMs: 2.4, tempC: 28, rainPct: 10, humidity: 70 },
  { day: 'T7', date: '5/9',  windMs: 3.6, tempC: 29, rainPct: 35, humidity: 68 },
  { day: 'CN', date: '6/9',  windMs: 5.5, tempC: 30, rainPct: 60, humidity: 80 },
  { day: 'T2', date: '7/9',  windMs: 2.9, tempC: 28, rainPct: 15, humidity: 72 },
  { day: 'T3', date: '8/9',  windMs: 3.2, tempC: 28, rainPct: 25, humidity: 71 },
];

export function windVerdict(windMs, rainPct) {
  if (windMs > WIND_LIMITS.caution || rainPct >= 50) {
    return { code: 'stop', label: 'Hoãn', color: '#EF5350' };
  }
  if (windMs > WIND_LIMITS.good || rainPct >= 30) {
    return { code: 'caution', label: 'Cân nhắc', color: '#FFCA28' };
  }
  return { code: 'go', label: 'Nên phun', color: '#4CAF50' };
}

// ------------------------------------------------------- hồ sơ pháp lý (T8)
/**
 * NĐ 288/2025/NĐ-CP: đăng ký phương tiện + Giấy phép Hạng B + phép bay ≤180 ngày,
 * nộp trước ≥7 ngày kèm sơ đồ khu vực bay.
 */
export const TEAM = {
  name: 'Đội bay Ea Kar',
  operator: 'Nguyễn Văn Tuấn',
  drone: 'DJI Agras T40',
  documents: [
    { key: 'pilot',   label: 'Giấy phép điều khiển Hạng B', ref: 'GP-B-2026-1187',  expires: '14/3/2027', daysLeft: 193 },
    { key: 'vehicle', label: 'Đăng ký phương tiện bay',      ref: 'PT-2025-40219',   expires: '02/11/2027', daysLeft: 426 },
    { key: 'flight',  label: 'Phép bay khu vực Cư M\'gar',   ref: 'PB-2026-04417',   expires: '19/9/2026',  daysLeft: 17 },
  ],
};
