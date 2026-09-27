import { useState } from 'react';
import { GRID, SEVERITY, PLOT, gridStats, cellSizeM } from '../data/scan';

/**
 * T3 · Bản đồ mức độ bệnh theo Ô LƯỚI.
 *
 * Vì sao lưới chứ không phải marker điểm: marker nói "có một điểm bệnh ở đây".
 * Lưới nói "ô này nhiễm mức 2" — và chỉ lưới mới sinh ra được liều theo vùng,
 * tức là mới xuất được bản đồ kê đơn. Marker là hình minh hoạ; lưới là dữ liệu.
 */
export default function SeverityGrid({ isScanning }) {
  const [hover, setHover] = useState(null);
  const stats = gridStats();
  const cols = GRID[0].length;

  return (
    <div className="sev-wrap">
      <div className="sev-head">
        <div>
          <div className="sev-title">{PLOT.name}</div>
          <div className="sev-sub">
            {PLOT.areaHa} ha · {GRID.flat().length} ô ~{cellSizeM().toFixed(1)}×{cellSizeM().toFixed(1)} m · quét {PLOT.surveyedAt} · ảnh ghép: {PLOT.orthoSource}
          </div>
        </div>
        <div className="sev-badge">
          <span className="sev-badge-num">{stats.infectedPct.toFixed(1)}%</span>
          <span className="sev-badge-lbl">diện tích nhiễm</span>
        </div>
      </div>

      <div
        className={`sev-grid ${isScanning ? 'scanning' : ''}`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {GRID.map((row, r) =>
          row.map((v, c) => {
            const s = SEVERITY[v];
            const id = `${r}-${c}`;
            return (
              <div
                key={id}
                className={`sev-cell ${hover === id ? 'hovered' : ''}`}
                style={{
                  background: s.color,
                  opacity: v === 0 ? 0.32 : 0.55 + v * 0.15,
                }}
                onMouseEnter={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
                title={`Ô ${String.fromCharCode(65 + c)}${r + 1} · ${s.label}`}
              />
            );
          })
        )}
      </div>

      <div className="sev-legend">
        {SEVERITY.map((s) => (
          <div className="sev-legend-item" key={s.level}>
            <span className="sev-dot" style={{ background: s.color }} />
            <span className="sev-legend-lbl">{s.label}</span>
            <span className="sev-legend-val">{stats.pct[s.level].toFixed(0)}%</span>
          </div>
        ))}
      </div>

      {hover && (
        <div className="sev-tip">
          Ô {String.fromCharCode(65 + Number(hover.split('-')[1]))}
          {Number(hover.split('-')[0]) + 1} ·{' '}
          {SEVERITY[GRID[Number(hover.split('-')[0])][Number(hover.split('-')[1])]].label}
        </div>
      )}
    </div>
  );
}
