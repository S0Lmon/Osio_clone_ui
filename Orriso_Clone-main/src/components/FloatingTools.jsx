import React from "react";
import "./FloatingTools.css";

export function FloatingToolbar() {
  return (
    <div className="floating-tools-dock">
      {/* 1. Typography Pill */}
      <div className="typography-pill">
        <span className="type-icon">T</span>
        <span className="type-label">Typography</span>
        <span className="type-shortcut">T</span>
      </div>

      {/* 2. Canvas Multi-tool Group (Color, Grid Switch, Pen Tool) */}
      <div className="canvas-tool-group">
        <button className="canvas-tool-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 10 10 0 0 0 10-10" />
          </svg>
          <span>Color</span>
          <span className="shortcut-badge">C</span>
        </button>

        <button className="canvas-tool-center-btn active">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4.5" cy="4.5" r="1.5" />
            <circle cx="11.5" cy="4.5" r="1.5" />
            <circle cx="4.5" cy="11.5" r="1.5" />
            <circle cx="11.5" cy="11.5" r="1.5" />
          </svg>
        </button>

        <button className="canvas-tool-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19 7-7 3 3-7 7-3-3z" />
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="m2 2 7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
          <span>Pen Tool</span>
          <span className="shortcut-badge">P</span>
        </button>
      </div>

      {/* 3. Zoom / History Capsule */}
      <div className="zoom-history-capsule">
        <button className="zh-btn" title="Undo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
        </button>

        <button className="zh-btn" title="Redo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6" />
            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
          </svg>
        </button>

        <span className="zoom-percentage">14%</span>

        <span className="zh-divider"></span>

        <button className="zh-btn" title="Preview">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        <button className="zh-btn" title="Comments">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </button>

        <button className="zh-btn" title="History">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </button>

        <button className="zh-btn" title="Help">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function TypographyFloatingTools() {
  return <FloatingToolbar />;
}

export function ZoomHistoryControls({ className = "" }) {
  return null;
}

export default FloatingToolbar;
