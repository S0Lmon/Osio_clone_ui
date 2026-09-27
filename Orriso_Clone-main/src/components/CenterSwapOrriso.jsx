import React, { useRef, useState } from "react";
import "./CenterSwapOrriso.css";
import FloatingToolbar, { TypographyFloatingTools } from "./FloatingTools";
import AIPromptBox from "./AIPromptBox";

export default function CenterSwapOrriso({ items }) {
  // Center item and side grid items
  const centerItem = items[0];
  const leftItems = items.slice(1, 7);
  const rightItems = items.slice(7, 13);

  const [center, setCenter] = useState(centerItem);
  const [left, setLeft] = useState(leftItems);
  const [right, setRight] = useState(rightItems);
  const [isPlaying, setIsPlaying] = useState(false);

  const centerRef = useRef(null);
  const slotRefs = useRef({});

  const playZoomFlyAnimation = (fromEl, toEl) => {
    if (!fromEl || !toEl) return;

    const f = fromEl.getBoundingClientRect();
    const t = toEl.getBoundingClientRect();

    const dx = f.left - t.left;
    const dy = f.top - t.top;

    const fromW = f.width;
    const fromH = f.height;
    const toW = t.width;
    const toH = t.height;

    const sx = fromW / toW;
    const sy = fromH / toH;

    toEl.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx * 1.3}, ${sy * 1.3})` },
        { transform: "translate(0,0) scale(1)" }
      ],
      { duration: 520, easing: "cubic-bezier(.23,1,.32,1)" }
    );
  };

  const handleClick = (side, index) => {
    const thumbEl = slotRefs.current[`${side}-${index}`];
    const centerEl = centerRef.current;

    playZoomFlyAnimation(thumbEl, centerEl);

    const oldCenter = center;

    if (side === "left") {
      const arr = [...left];
      setCenter(arr[index]);
      arr[index] = oldCenter;
      setLeft(arr);
    } else {
      const arr = [...right];
      setCenter(arr[index]);
      arr[index] = oldCenter;
      setRight(arr);
    }
  };

  return (
    <div className="swap-grid-wrapper">
      {/* LEFT GRID */}
      <div className="grid left-grid">
        {Array.from({ length: 6 }).map((_, i) => {
          const item = left[i];
          const isFirst = i === 0;

          return (
            <div
              key={`left-${i}`}
              className="slot"
              ref={(el) => (slotRefs.current[`left-${i}`] = el)}
              onClick={() => item && handleClick("left", i)}
            >
              {item ? (
                <div className="thumb-container">
                  <img
                    src={item.thumb || item.src}
                    className="thumb"
                    alt={`Left thumb ${i}`}
                    draggable={false}
                  />
                  {/* Overlay buttons on slot 0 matching image */}
                  {isFirst && (
                    <div className="slot-overlay-actions">
                      <div className="slot-add-pill">Add image</div>
                      <div className="slot-expand-btn">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="empty">
                  <span>+</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CENTER CARD CONTAINER */}
      <div className="center-card-container">
        {/* Floating Toolbar Dock containing Typography, Canvas Tools, and Zoom/History */}
        <FloatingToolbar />

        <div className="center-card" ref={centerRef}>
          {/* Card Top Header Meta */}
          <div className="card-top-header">
            <div className="card-brand-left">
              <span className="card-sub-brand">Vireel</span>
              <span className="card-main-title">AI AGENT APP</span>
            </div>

            <div className="card-case-toggle">
              <button className="case-btn active">Aa</button>
              <button className="case-btn">Bb</button>
            </div>

            <div className="card-brand-right">
              <span className="vireel-script-logo">Vireel</span>
            </div>
          </div>

          {/* Headline & Formatting Toolbar in Center Card */}
          <div className="card-headline-section">
            <h1 className="headline-text">
              <span className="line-1">Engineered Comfort,</span>
              <span className="line-2">
                Maximum <span className="highlight-word">Running</span> Speed
              </span>
            </h1>

            {/* Text Formatting Floating Bar */}
            <div className="text-format-bar">
              <button className="format-sparkle-btn" title="AI Text Assistant">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </button>

              <div className="format-dropdown font-dropdown">
                <span>Alex Brush</span>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>

              <div className="format-dropdown size-dropdown">
                <span>16px</span>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>

              <div className="format-color-picker">
                <span className="color-dot"></span>
                <span className="color-hex">#FFFFFF</span>
              </div>

              <div className="format-btn-group">
                <button className="fmt-btn" title="Bold">B</button>
                <button className="fmt-btn" title="Underline">U</button>
                <button className="fmt-btn" title="Italic">I</button>
                <button className="fmt-btn" title="Transform">T</button>
              </div>
            </div>
          </div>

          {/* Media Player / Glowing Runners Background */}
          <div className="center-media-wrapper">
            {center?.type === "video" ? (
              <video
                src={center.src}
                autoPlay
                muted
                loop
                playsInline
                className="media"
              />
            ) : (
              <img
                src={center?.src || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&auto=format&fit=crop&q=80"}
                className="media glow-runner-media"
                alt="Main Center Visual"
              />
            )}

            {/* Glowing runners colorful gradient ambiance overlay */}
            <div className="runners-glow-overlay"></div>

            {/* Big Frosted Glass Play Button */}
            <button
              className="center-play-button"
              onClick={() => setIsPlaying(!isPlaying)}
              title="Play / Pause"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* AI Prompt Box Floating at Bottom of Card */}
        <AIPromptBox />
      </div>

      {/* RIGHT GRID */}
      <div className="grid right-grid">
        {Array.from({ length: 6 }).map((_, i) => {
          const item = right[i];
          const isEmptySlot = i === 3; // Empty placeholder slot as in screenshot

          return (
            <div
              key={`right-${i}`}
              className={`slot ${isEmptySlot ? "slot-empty-styled" : ""}`}
              ref={(el) => (slotRefs.current[`right-${i}`] = el)}
              onClick={() => (!isEmptySlot && item) && handleClick("right", i)}
            >
              {!isEmptySlot && item ? (
                <div className="thumb-container">
                  <img
                    src={item.thumb || item.src}
                    className="thumb"
                    alt={`Right thumb ${i}`}
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="empty">
                  <span>+</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
