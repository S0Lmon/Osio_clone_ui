import { Wind, ShieldCheck, AlertTriangle, MapPinned, Droplets, CloudRain } from 'lucide-react';
import { FORECAST, WIND_LIMITS, windVerdict, TEAM, PLOT } from '../data/scan';

/**
 * Cột trái = T6 · Cửa sổ phun  +  T8 · Hồ sơ pháp lý.
 *
 * Giá nông sản và tin tức đã được gỡ khỏi đây: đội bay không cần chúng để làm
 * việc. Chúng thuộc về app nông dân, nơi chúng giúp giữ chân bên cầu.
 */

function SprayWindow() {
  const best = FORECAST.reduce((a, b) =>
    windVerdict(b.windMs, b.rainPct).code === 'go' && b.windMs < a.windMs ? b : a
  , FORECAST.find((f) => windVerdict(f.windMs, f.rainPct).code === 'go') ?? FORECAST[0]);

  const bestV = windVerdict(best.windMs, best.rainPct);

  return (
    <div className="left-card">
      <div className="left-card-header">
        <Wind style={{ width: 14, height: 14 }} />
        <span>Cửa sổ phun</span>
        <span className="step-tag" style={{ marginLeft: 'auto' }}>T6</span>
      </div>

      {/* ngày tốt nhất */}
      <div className="sw-best" style={{ borderColor: bestV.color + '55' }}>
        <span className="sw-lamp" style={{ background: bestV.color, boxShadow: `0 0 14px ${bestV.color}` }} />
        <div style={{ flex: 1 }}>
          <div className="sw-best-day">{best.day} {best.date} — {bestV.label}</div>
          <div className="sw-best-meta">
            gió {best.windMs} m/s · {best.tempC}°C · mưa {best.rainPct}% · ẩm {best.humidity}%
          </div>
        </div>
      </div>

      {/* 7 ngày */}
      <div className="sw-week">
        {FORECAST.map((f) => {
          const v = windVerdict(f.windMs, f.rainPct);
          return (
            <div className="sw-day" key={f.date} title={`${f.date} · gió ${f.windMs} m/s · mưa ${f.rainPct}%`}>
              <div className="sw-day-lbl">{f.day}</div>
              <div className="sw-day-lamp" style={{ background: v.color }} />
              <div className="sw-day-wind">{f.windMs}</div>
            </div>
          );
        })}
      </div>

      <div className="sw-legend">
        <span><Wind style={{ width: 10, height: 10 }} /> m/s · ngưỡng {WIND_LIMITS.good}–{WIND_LIMITS.caution}</span>
        <span><CloudRain style={{ width: 10, height: 10 }} /> hoãn khi mưa ≥50%</span>
      </div>

      <div className="sw-note">
        Bản đồ kê đơn vô nghĩa nếu phun lúc gió lớn — thuốc trôi dạt hết.
      </div>
    </div>
  );
}

function Compliance() {
  const soonest = TEAM.documents.reduce((a, b) => (b.daysLeft < a.daysLeft ? b : a));

  return (
    <div className="left-card">
      <div className="left-card-header" style={{ color: 'var(--sev-healthy)' }}>
        <ShieldCheck style={{ width: 14, height: 14 }} />
        <span>Hồ sơ pháp lý</span>
        <span className="step-tag" style={{ marginLeft: 'auto' }}>T8</span>
      </div>

      <div className="cp-team">{TEAM.name} · {TEAM.drone}</div>

      <div className="cp-list">
        {TEAM.documents.map((d) => {
          const warn = d.daysLeft <= 30;
          return (
            <div className={`cp-item ${warn ? 'warn' : ''}`} key={d.key}>
              <div className="cp-item-main">
                <div className="cp-item-lbl">{d.label}</div>
                <div className="cp-item-ref">{d.ref}</div>
              </div>
              <div className="cp-item-exp">
                <div className={`cp-days ${warn ? 'warn' : ''}`}>{d.daysLeft} ngày</div>
                <div className="cp-exp-date">{d.expires}</div>
              </div>
            </div>
          );
        })}
      </div>

      {soonest.daysLeft <= 30 && (
        <div className="cp-alert">
          <AlertTriangle style={{ width: 13, height: 13, flexShrink: 0 }} />
          <span>
            <b>{soonest.label}</b> hết hạn sau {soonest.daysLeft} ngày. Hồ sơ xin phép bay phải
            nộp trước <b>ít nhất 7 ngày</b> và kèm sơ đồ khu vực bay.
          </span>
        </div>
      )}

      <button className="cp-btn">
        <MapPinned style={{ width: 13, height: 13 }} />
        Sinh sơ đồ khu vực bay cho {PLOT.name.split('—')[0].trim()}
      </button>
      <div className="cp-btn-note">
        App đã có ranh giới thửa, nên dựng được sơ đồ nộp kèm đơn xin phép bay —
        việc đội bay phải làm ít nhất 2 lần mỗi năm.
      </div>
    </div>
  );
}

export default function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <SprayWindow />
      <Compliance />
    </div>
  );
}
