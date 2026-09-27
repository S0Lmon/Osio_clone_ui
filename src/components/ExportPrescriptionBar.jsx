import { useState } from 'react';
import { Download, Lock, Check, HardDriveDownload, AlertTriangle } from 'lucide-react';
import { GRID, PLOT, SEVERITY, buildPrescription, cellSizeM } from '../data/scan';

/**
 * T5 · XUẤT BẢN ĐỒ KÊ ĐƠN — tính năng duy nhất đội bay trả tiền để có.
 *
 * Đây là bước ⑤ của vòng lặp lõi, và là chỗ dashboard cũ bị đứt: nó hiển thị
 * marker bệnh rất đẹp nhưng không sinh ra file nào nạp được vào máy.
 *
 * Định dạng Agras đọc được (đường đi đã được thị trường xác nhận, PIX4Dfields
 * làm đúng việc này): một thư mục gồm
 *    Shapefile/  — ranh giới thửa
 *    Rx/         — .tiff chứa liều theo từng vùng
 * Nạp qua microSD → tay điều khiển → Prescription Map → Map Source: Other,
 * Source unit: ha, Resample: Max/Average.
 * Hỗ trợ T20 · T30 · T40 · T50 · T100 — ⚠️ T10 KHÔNG hỗ trợ.
 *
 * GIỚI HẠN CỦA BẢN DEMO: trình duyệt xuất được ranh giới (GeoJSON) và bảng liều
 * (CSV). File .tiff raster phải sinh ở backend bằng rasterio — xem
 * DacTa_WebApp_DroneAI mục 8. Nút dưới đây tải về đúng hai thứ làm được ở client,
 * và nói thẳng phần còn thiếu thay vì giả vờ đã có.
 */

const AGRAS_OK = ['T20', 'T30', 'T40', 'T50', 'T100'];

function download(filename, text, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ExportPrescriptionBar({ chemical }) {
  const [done, setDone] = useState(false);
  const locked = !chemical;
  const rx = chemical ? buildPrescription(GRID, chemical) : null;

  const handleExport = () => {
    if (locked) return;

    // Bảng liều theo vùng — CSV
    const csv = [
      'zone_level,zone_label,cells,area_ha,rate_l_per_ha,volume_l',
      ...rx.zones.map((z) =>
        [z.level, z.label, z.cells, z.areaHa.toFixed(4), z.rateLpHa.toFixed(2), z.volumeL.toFixed(3)].join(',')
      ),
    ].join('\n');

    // Ranh giới + lưới liều — GeoJSON (thay cho Shapefile ở bản demo client)
    const features = [];
    GRID.forEach((row, r) => {
      row.forEach((v, c) => {
        if (v === 0) return; // ô khoẻ không phun — chính là điểm của VRA
        features.push({
          type: 'Feature',
          properties: {
            cell: `${String.fromCharCode(65 + c)}${r + 1}`,
            severity: v,
            severity_label: SEVERITY[v].label,
            rate_l_per_ha: Number((chemical.baseRateLpHa * SEVERITY[v].rate).toFixed(2)),
          },
          geometry: { type: 'Polygon', coordinates: [[]] }, // toạ độ thật lấy từ polygon thửa
        });
      });
    });
    const geojson = {
      type: 'FeatureCollection',
      metadata: {
        plot: PLOT.name,
        area_ha: PLOT.areaHa,
        cell_size_m: Number(cellSizeM().toFixed(2)),
        surveyed_at: PLOT.surveyedAt,
        active_ingredient: chemical.activeIngredient,
        phi_days: chemical.phiDays,
        total_volume_l: Number(rx.totalVolumeL.toFixed(2)),
        note: 'Toạ độ ô để trống ở bản demo — backend gán từ polygon thửa (PostGIS).',
      },
      features,
    };

    download(`don_thuoc_${PLOT.surveyedAt.replace(/\//g, '-')}.csv`, csv, 'text/csv;charset=utf-8');
    download(
      `ban_do_ke_don_${PLOT.surveyedAt.replace(/\//g, '-')}.geojson`,
      JSON.stringify(geojson, null, 2),
      'application/geo+json'
    );
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <div className="bottom-tools-plain">
      <div className="bottom-toolset" style={{ marginLeft: 0 }}>

        {/* --------- thông tin gói xuất --------- */}
        <div className="toolset-section">
          <div className="toolset-label export-lbl">
            <HardDriveDownload style={{ width: 12, height: 12 }} />
            BƯỚC 5 · XUẤT BẢN ĐỒ KÊ ĐƠN
          </div>
          <div className="exp-files">
            <div className="exp-file">
              <div className="exp-file-name">Shapefile /</div>
              <div className="exp-file-desc">ranh giới thửa</div>
            </div>
            <div className="exp-file">
              <div className="exp-file-name">Rx / .tiff</div>
              <div className="exp-file-desc">liều theo vùng</div>
            </div>
            <div className="exp-file muted">
              <div className="exp-file-name">
                {rx ? `${rx.totalVolumeL.toFixed(1)} L` : '—'}
              </div>
              <div className="exp-file-desc">tổng lượng thuốc</div>
            </div>
          </div>
        </div>

        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />

        {/* --------- hướng dẫn nạp máy --------- */}
        <div className="toolset-section">
          <div className="toolset-label compat">TƯƠNG THÍCH</div>
          <div className="exp-compat">
            {AGRAS_OK.map((m) => (
              <span className="chip ok" key={m}>{m}</span>
            ))}
            <span className="chip bad">T10 ✕</span>
          </div>
          <div className="exp-steps">
            microSD → tay điều khiển → Prescription Map → Map Source: <b>Other</b> · unit: <b>ha</b>
          </div>
        </div>

        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />

        {/* --------- nút xuất --------- */}
        <div className="toolset-section" style={{ minWidth: 210 }}>
          <button
            className={`export-btn ${locked ? 'locked' : ''} ${done ? 'done' : ''}`}
            onClick={handleExport}
            disabled={locked}
            title={locked ? 'Phải chọn hoạt chất đã đăng ký phun drone trước' : 'Tải gói bản đồ kê đơn'}
          >
            {locked ? <Lock style={{ width: 14, height: 14 }} />
              : done ? <Check style={{ width: 14, height: 14 }} />
              : <Download style={{ width: 14, height: 14 }} />}
            <span>{locked ? 'Chưa mở khoá' : done ? 'Đã tải' : 'Tải gói bản đồ'}</span>
          </button>

          {locked ? (
            <div className="exp-hint warn">
              <AlertTriangle style={{ width: 11, height: 11 }} />
              Chưa có hoạt chất đăng ký phun drone cho cà phê
            </div>
          ) : (
            <div className={`exp-hint ${chemical.isDemo ? 'demo' : ''}`}>
              {chemical.isDemo && <><b>DỮ LIỆU DEMO</b> · </>}
              xuất <b>GeoJSON + CSV</b>. File <b>.tiff</b> raster sinh ở backend.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
