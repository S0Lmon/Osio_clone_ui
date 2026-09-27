/**
 * ⛔ ĐÃ NGỪNG DÙNG — thay bằng ./PrescriptionWidget.jsx (T4 · Sinh đơn thuốc).
 *
 * Widget cũ chứa bốn lỗi nội dung, mỗi lỗi đủ để bị bắt bài khi phản biện:
 *
 *  1. 'Thiếu Kali' → 'Kali Sulfate' 50kg/ha → 'Bón rải quanh gốc'
 *     Drone phun tán KHÔNG rải được quanh gốc. Toàn bộ N-P-K của cà phê đi vào
 *     đất và phải xăm xới lấp (QĐ 254/QĐ-TT-CCN). Vòng lặp phát hiện → hành động
 *     đứt ở bước hành động.
 *  2. 'Anvil 5SC' 20ml/bình 16L · 'Bavistin 50WP' 30g/bình
 *     Kê tên thương mại + liều cụ thể. TCCS 830:2022/BVTV yêu cầu mỗi thuốc phải
 *     đăng ký riêng cho hình thức phun drone; tới 04/7/2026 mới có 6 loại, trên
 *     thanh long/măng cụt/bưởi.
 *  3. 'Phun đều hai mặt lá'
 *     Hướng dẫn của bình phun tay. Drone không phun được mặt dưới lá.
 *  4. Giá sản phẩm + nút Order
 *     Ăn hoa hồng bán thuốc thì doanh thu thưởng cho việc khuyến nghị NHIỀU
 *     thuốc hơn — mâu thuẫn trực tiếp với lời hứa giảm lượng thuốc.
 *
 * Giữ file này làm ghi chú lịch sử để không ai chép lại bộ dữ liệu cũ.
 */
export { default } from './PrescriptionWidget';
