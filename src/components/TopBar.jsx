import { Upload, Save, AlertTriangle } from 'lucide-react';
import { PLOT, TEAM } from '../data/scan';

/**
 * Thanh trên = VÒNG LẶP LÕI 6 BƯỚC, hiện thành stepper.
 *
 * Thanh cũ hiển thị Status / Farm / Drone / Export — bốn thứ rời rạc. Đổi thành
 * sáu bước của quy trình để người dùng luôn biết mình đang ở đâu, và để chính
 * dashboard kể ra được mô hình sản phẩm khi demo.
 */
const STEPS = [
  { n: 1, label: 'Khảo sát',      value: PLOT.orthoSource },
  { n: 2, label: 'Phân tích',     value: 'YOLO11s-seg' },
  { n: 3, label: 'Đơn thuốc',     value: 'theo vùng' },
  { n: 4, label: 'Cửa sổ phun',   value: 'T5 3/9' },
  { n: 5, label: 'Xuất bản đồ',   value: 'Shapefile + Rx' },
  { n: 6, label: 'Biên bản',      value: 'sau khi bay' },
];

export default function TopBar({ isScanning, onScan, activeStep = 3, chemical }) {
  const soonest = TEAM.documents.reduce((a, b) => (b.daysLeft < a.daysLeft ? b : a));

  return (
    <div className="topbar">
      <div className="logo-brand">
        <div className="logo-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="brand-text">
          VƯỜN<span style={{ color: 'var(--sev-healthy)' }}>KHOẺ</span>
          <span className="brand-sub">cổng đội bay</span>
        </div>
      </div>

      {/* ---------- stepper quy trình ---------- */}
      <div className="stepper-group">
        {STEPS.map((s) => {
          const state = s.n < activeStep ? 'done' : s.n === activeStep ? 'active' : 'todo';
          const blocked = s.n === 5 && !chemical;
          return (
            <div
              key={s.n}
              className={`top-capsule step ${state} ${blocked ? 'blocked' : ''}`}
              title={blocked ? 'Khoá: chưa chọn hoạt chất đã đăng ký phun drone' : s.label}
            >
              <span className={`step-num ${state}`}>{blocked ? '✕' : s.n}</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                <span className="step-lbl">{s.label}</span>
                <span className="step-val">{s.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="right-controls">
        {soonest.daysLeft <= 30 && (
          <div className="permit-warn" title={`${soonest.label} · ${soonest.ref}`}>
            <AlertTriangle style={{ width: 13, height: 13 }} />
            <span>Phép bay còn {soonest.daysLeft} ngày</span>
          </div>
        )}

        <button
          className="top-right-capsule primary"
          onClick={onScan}
          disabled={isScanning}
          style={{ minWidth: 168, justifyContent: 'center' }}
        >
          <Upload className={isScanning ? 'animate-spin' : ''} style={{ width: 16, height: 16 }} />
          <span>{isScanning ? 'Đang phân tích…' : 'Tải ảnh khảo sát'}</span>
        </button>

        <button className="top-right-capsule">
          <Save style={{ width: 14, height: 14 }} />
          <span>Lưu</span>
        </button>
      </div>
    </div>
  );
}
