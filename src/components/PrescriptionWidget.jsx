import { AlertTriangle, FlaskConical, Info } from 'lucide-react';
import {
  GRID, PLOT, REGISTERED_CHEMICALS, CHEMICALS, DEMO_CHEMICAL, buildPrescription,
} from '../data/scan';

/**
 * T4 · SINH ĐƠN THUỐC
 *
 * Thay cho FertilizerRecommendationWidget cũ. Bốn thứ đã bị gỡ bỏ có chủ đích:
 *
 *  1. Tên thuốc thương mại + liều "ml/bình 16L"
 *     → kê thuốc là việc của cán bộ BVTV, không phải của app. App chỉ tính
 *       LIỀU THEO VÙNG (lít/ha) cho hoạt chất mà người dùng đã chọn.
 *  2. Mục phân bón ("Thiếu Kali → 50kg/ha → bón rải quanh gốc")
 *     → drone phun tán KHÔNG rải được quanh gốc. Toàn bộ N-P-K của cà phê đi
 *       vào đất và phải xăm xới lấp (QĐ 254/QĐ-TT-CCN). Vòng lặp phát hiện →
 *       hành động đứt ở bước hành động, nên tính năng này không thuộc về đây.
 *  3. "Phun đều hai mặt lá"
 *     → hướng dẫn của bình phun tay. Drone không phun được mặt dưới lá.
 *  4. Giá sản phẩm + nút "Order"
 *     → ăn hoa hồng bán thuốc thì mô hình doanh thu thưởng cho việc khuyến nghị
 *       NHIỀU thuốc hơn, mâu thuẫn trực tiếp với lời hứa giảm lượng thuốc.
 */
export default function PrescriptionWidget({ chemical, onPickChemical }) {
  const hasRegistered = REGISTERED_CHEMICALS.length > 0;
  const rx = chemical ? buildPrescription(GRID, chemical) : null;

  return (
    <div className="right-card">
      <div className="right-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FlaskConical style={{ width: 14, height: 14 }} />
          <span>Đơn thuốc theo vùng</span>
        </div>
        <span className="step-tag">T4</span>
      </div>

      {/* ---------- chọn hoạt chất ---------- */}
      <div className="rx-picker">
        <label className="rx-label">Hoạt chất đã đăng ký phun drone</label>
        {hasRegistered ? (
          <select
            className="rx-select"
            value={chemical?.id ?? ''}
            onChange={(e) =>
              onPickChemical(REGISTERED_CHEMICALS.find((c) => c.id === e.target.value))
            }
          >
            <option value="">— chọn hoạt chất —</option>
            {REGISTERED_CHEMICALS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.activeIngredient} · cách ly {c.phiDays} ngày
              </option>
            ))}
          </select>
        ) : (
          <div className="rx-blocked">
            <AlertTriangle style={{ width: 15, height: 15, flexShrink: 0 }} />
            <div>
              <div className="rx-blocked-title">Danh mục trống cho cà phê</div>
              <div className="rx-blocked-body">
                {CHEMICALS[0].note} Chưa chọn được hoạt chất thì <b>không xuất được bản
                đồ kê đơn</b> — nhưng bản đồ mức độ bệnh và biên bản khảo sát vẫn dùng bình thường.
              </div>
              <button className="rx-demo-btn" onClick={() => onPickChemical(DEMO_CHEMICAL)}>
                Bật dữ liệu demo để trình diễn luồng xuất bản đồ
              </button>
            </div>
          </div>
        )}
      </div>

      {chemical?.isDemo && (
        <div className="demo-banner">
          <span>⚠️ Đang dùng <b>dữ liệu demo</b> — hoạt chất và liều bên dưới không phải số thật.</span>
          <button className="demo-off" onClick={() => onPickChemical(null)}>Tắt</button>
        </div>
      )}

      {/* ---------- bảng liều theo vùng ---------- */}
      {rx ? (
        <>
          <div className="rx-zones">
            {rx.zones.map((z) => (
              <div className="rx-zone" key={z.level}>
                <span className="sev-dot" style={{ background: z.color }} />
                <span className="rx-zone-lbl">{z.label}</span>
                <span className="rx-zone-area">{z.areaHa.toFixed(2)} ha</span>
                <span className="rx-zone-rate">{z.rateLpHa.toFixed(1)} L/ha</span>
                <span className="rx-zone-vol">{z.volumeL.toFixed(1)} L</span>
              </div>
            ))}
          </div>

          <div className="rx-total">
            <div>
              <div className="rx-total-num">{rx.totalVolumeL.toFixed(1)} L</div>
              <div className="rx-total-lbl">
                trên {rx.treatedAreaHa.toFixed(2)} / {PLOT.areaHa} ha
              </div>
            </div>
            <div className="rx-saving">
              <div className="rx-saving-num">−{rx.savingPct.toFixed(0)}%</div>
              <div className="rx-total-lbl">so với phun đều</div>
            </div>
          </div>
        </>
      ) : (
        <div className="rx-empty">
          <Info style={{ width: 13, height: 13 }} />
          Chọn hoạt chất để tính liều theo từng vùng mức độ.
        </div>
      )}

      <div className="rx-note">
        App tính <b>liều theo vùng</b> từ bản đồ mức độ bệnh. Việc chọn hoạt chất và
        xác nhận liều cuối cùng thuộc về đội bay và cán bộ BVTV.
      </div>
    </div>
  );
}
