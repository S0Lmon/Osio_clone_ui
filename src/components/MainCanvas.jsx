import { useState, Suspense, lazy } from 'react';
import SeverityGrid from './SeverityGrid';
import { PLOT } from '../data/scan';

const Drone3DView = lazy(() => import('./Drone3DView'));

/**
 * Khung giữa. Chế độ MẶC ĐỊNH là "Lưới mức độ" — đó là dữ liệu sinh ra được liều.
 * Cảnh 3D giữ lại làm chế độ phụ và nạp chậm: đẹp cho ảnh chụp pitch, nhưng không
 * phải nơi ra quyết định, nên không để nó chiếm chỗ mặc định lẫn dung lượng tải.
 */
const MODES = [
  { key: 'grid', label: 'Lưới mức độ' },
  { key: 'ortho', label: 'Ảnh ghép' },
  { key: '3d', label: '3D' },
];

export default function MainCanvas({ isScanning }) {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="center-main">
      <div className="blur-card center-card" style={{ padding: 0, border: '1px solid rgba(255,255,255,0.15)' }}>
        <div className="canvas-content">

          {viewMode === 'grid' && <SeverityGrid isScanning={isScanning} />}

          {viewMode === 'ortho' && (
            <div className="ortho-placeholder">
              <div className="ortho-box">
                <div className="ortho-title">Ảnh ghép chưa được tải lên</div>
                <div className="ortho-body">
                  Đội bay xuất orthomosaic từ <b>{PLOT.orthoSource}</b> rồi kéo thả vào đây.
                  <br />
                  Hệ thống <b>không tự ghép ảnh</b> — ghép ảnh cần GPU và hàng giờ mỗi thửa,
                  trong khi máy Agras đã đi kèm phần mềm làm sẵn việc đó.
                </div>
                <button className="ortho-btn">Chọn tệp ảnh ghép (.tif)</button>
              </div>
            </div>
          )}

          {viewMode === '3d' && (
            <Suspense fallback={<div className="lazy-fallback">Đang tải cảnh 3D…</div>}>
              <Drone3DView isScanning={isScanning} />
            </Suspense>
          )}

          <div className="view-mode-toggle">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setViewMode(m.key)}
                className={`view-mode-btn ${viewMode === m.key ? 'active' : ''}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {isScanning && (
            <div className="scan-overlay">
              <div className="scan-overlay-border" />
              <div className="scan-overlay-content">Đang phân tích ảnh ghép…</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
