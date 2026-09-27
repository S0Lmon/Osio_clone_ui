import { Leaf, Radio, Battery, Wifi } from 'lucide-react';
import PrescriptionWidget from './PrescriptionWidget';
import { SEVERITY, gridStats, PLOT, cellSizeM } from '../data/scan';

/**
 * Cột phải = T4 · Đơn thuốc (trên cùng — đây là thứ bán được)
 *          + T3 · Thống kê sức khoẻ
 *          + trạng thái máy (thu gọn)
 *
 * Trạng thái drone thời gian thực bị hạ xuống một dải nhỏ có chủ đích: nó thuộc
 * Mức B (retrofit qua iface_board), mà bo mạch còn 2 lỗi điện chưa sửa. Trưng nó
 * to như một tính năng đang chạy là hứa thứ chưa có.
 */
export default function RightPanel({ chemical, onPickChemical }) {
  const stats = gridStats();

  return (
    <div className="right-panel">
      <PrescriptionWidget chemical={chemical} onPickChemical={onPickChemical} />

      {/* ---------- sức khoẻ vườn ---------- */}
      <div className="right-card">
        <div className="right-card-header" style={{ color: 'var(--sev-healthy)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Leaf style={{ width: 14, height: 14 }} />
            <span>Sức khoẻ vườn</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--sev-healthy)' }}>
            {stats.pct[0].toFixed(0)}%
          </div>
        </div>

        {/* thanh xếp chồng */}
        <div className="hp-stack">
          {SEVERITY.map((s) => (
            stats.pct[s.level] > 0 && (
              <div
                key={s.level}
                className="hp-seg"
                style={{ width: `${stats.pct[s.level]}%`, background: s.color }}
                title={`${s.label} ${stats.pct[s.level].toFixed(1)}%`}
              />
            )
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>
          {SEVERITY.map((s) => (
            <div key={s.level} className="hp-row">
              <span className="sev-dot" style={{ background: s.color }} />
              <span className="hp-lbl">{s.label}</span>
              <span className="hp-cells">{stats.counts[s.level]} ô</span>
              <span className="hp-val" style={{ color: s.color }}>
                {stats.pct[s.level].toFixed(1)}%
              </span>
            </div>
          ))}
        </div>

        <div className="hp-note">
          Tính trên {stats.total} ô lưới ~{cellSizeM().toFixed(1)}×{cellSizeM().toFixed(1)} m của {PLOT.areaHa} ha.
        </div>
      </div>

      {/* ---------- trạng thái máy, thu gọn ---------- */}
      <div className="right-card compact">
        <div className="right-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Radio style={{ width: 13, height: 13 }} />
            <span>Trạng thái máy</span>
          </div>
          <span className="status-badge phase-b">MỨC B</span>
        </div>
        <div className="ds-row">
          <span><Battery style={{ width: 12, height: 12 }} /> Pin —</span>
          <span><Wifi style={{ width: 12, height: 12 }} /> Tín hiệu —</span>
        </div>
        <div className="ds-note">
          Telemetry thời gian thực cần bo mạch <code>iface_board</code> (J5 → Pixhawk
          TELEM2, MAVLink 921600). Bo mạch còn <b>2 lỗi điện chưa sửa</b> — chưa bật ở
          giai đoạn này.
        </div>
      </div>
    </div>
  );
}
