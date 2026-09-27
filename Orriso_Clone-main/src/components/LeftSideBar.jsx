import React from "react";
import "./LeftSideBar.css";

export default function LeftSideBar() {
  return (
    <div className="left-sidebar">
      <button className="back-homebase-btn">
        <div className="back-circle-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </div>
        <div className="back-labels">
          <span className="back-sub">Back</span>
          <span className="back-title">Homebase</span>
        </div>
      </button>
    </div>
  );
}
