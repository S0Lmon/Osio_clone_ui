import React, { useState } from "react";
import "./AIPromptBox.css";

export default function AIPromptBox() {
  const [prompt, setPrompt] = useState(
    "Replace the 'Running' font with a more creative serif font to make it more elegant, expressive, and visually striking, sophisticated, and brand-defining than the current one..."
  );

  return (
    <div className="ai-prompt-box">
      {/* Top Attachment Row */}
      <div className="prompt-attachments-row">
        <div className="attachment-thumb">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=160&auto=format&fit=crop&q=80"
            alt="Attached Runner"
          />
        </div>
        <div className="attachment-thumb">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&auto=format&fit=crop&q=80"
            alt="Attached Shoe"
          />
        </div>
        <button className="add-attachment-btn" title="Add attachment">
          <span>+</span>
        </button>
      </div>

      {/* Prompt Text Input Area */}
      <div className="prompt-text-area">
        <p className="prompt-content-text">
          {prompt}
          <span className="blinking-cursor">|</span>
        </p>
      </div>

      {/* Bottom Tool Actions */}
      <div className="prompt-actions-bottom">
        <div className="prompt-left-tools">
          <button className="prompt-circle-btn" title="Add">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
            </svg>
          </button>

          <button className="prompt-circle-btn sparkle-btn" title="Enhance prompt">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </button>

          <button className="prompt-media-pill active">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span>Image</span>
          </button>

          <button className="prompt-media-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="14" x="2" y="5" rx="2" />
              <path d="m10 9 5 3-5 3V9z" />
            </svg>
            <span>Video</span>
          </button>
        </div>

        <div className="prompt-right-tools">
          <button className="prompt-voice-btn" title="Voice input">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>

          <button className="prompt-submit-btn" title="Generate">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Glowing bottom gradient accent line */}
      <div className="prompt-rainbow-line"></div>
    </div>
  );
}
