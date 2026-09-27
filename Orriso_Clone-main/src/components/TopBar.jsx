import React from "react";
import "./TopBar.css";

export default function TopBar() {
  return (
    <div className="topbar-wrapper">
      {/* 1. macOS Style Browser Window Top Header */}
      <div className="browser-window-bar">
        {/* Left Window Controls */}
        <div className="window-controls-left">
          <div className="mac-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <button className="window-action-btn sidebar-toggle" title="Sidebar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="9" y1="3" y2="21" />
            </svg>
          </button>
          <div className="window-nav-arrows">
            <button className="window-action-btn" title="Back">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="window-action-btn" title="Forward">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Center URL Address Bar */}
        <div className="browser-address-bar">
          <button className="address-shield-btn">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </button>
          <div className="address-text-group">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="lock-icon">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            <span className="address-url">orriso.com</span>
          </div>
        </div>

        {/* Right Browser Action Icons */}
        <div className="browser-actions-right">
          <button className="window-action-btn" title="Share">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
          </button>
          <button className="window-action-btn" title="Bookmarks">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>
          <button className="window-action-btn" title="New tab">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button className="window-action-btn" title="Tabs overview">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Main App Top Navigation Bar */}
      <div className="topbar">
        {/* Left: Brand Logo */}
        <div className="topbar-left-brand">
          <div className="brand-logo-icon">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="21" stroke="#21A691" strokeWidth="2.5" strokeOpacity="0.8" />
              <path d="M24 6v12M24 30v12M6 24h12M30 24h12" stroke="#87DF2C" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M11 11l8 8M29 29l8 8M11 37l8-8M29 19l8-8" stroke="#21A691" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="brand-title">ORRISO</span>
        </div>

        {/* Center: Stepper Capsules */}
        <div className="topbar-stepper-group">
          {/* Step 1 */}
          <div className="top-capsule step-active">
            <div className="step-content">
              <span className="step-category">Project</span>
              <span className="step-name">Vireel marketing</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="top-capsule step-active">
            <div className="step-content">
              <span className="step-category">Create</span>
              <span className="step-name">Framework</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v10M3 8h10" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="top-capsule step-dim">
            <div className="step-content">
              <span className="step-category">Insert</span>
              <span className="step-name">Generation</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </div>

          {/* Step 4 */}
          <div className="top-capsule step-dimmer">
            <div className="step-content">
              <span className="step-category">Templates</span>
              <span className="step-name">Vireel banner</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </div>

          {/* Refresh Loop Button */}
          <button className="top-capsule-icon-btn" title="Refresh">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
            </svg>
          </button>
        </div>

        {/* Right: Load & Save Action Buttons */}
        <div className="topbar-right-actions">
          <button className="top-action-capsule load-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>Load</span>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 2 }}>
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          <button className="top-action-capsule save-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
