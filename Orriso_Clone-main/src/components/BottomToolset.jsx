import React from "react";
import "./BottomToolset.css";

export default function BottomToolset() {
  return (
    <div className="bottom-toolset-container">
      {/* 1. Left Widget: AI Agent */}
      <div className="ai-agent-panel">
        <div className="agent-tab-bubble">AI Agent</div>

        <div className="ai-agent-grid">
          {/* Tile 1: Storyboarder */}
          <div className="agent-tile tile-storyboarder">
            <span className="agent-name">Storyboarder</span>
          </div>

          {/* Tile 2: Optimizer */}
          <div className="agent-tile tile-optimizer">
            <span className="agent-name">Optimizer</span>
          </div>

          {/* Tile 3: Visualizer */}
          <div className="agent-tile tile-visualizer">
            <span className="agent-name">Visualizer</span>
          </div>

          {/* Tile 4: Copywriter */}
          <div className="agent-tile tile-copywriter">
            <span className="agent-name">Copywriter</span>
          </div>
        </div>
      </div>

      {/* 2. Right Widget: Files Vireel */}
      <div className="files-vireel-panel">
        <div className="files-tab-bubble">Files Vireel</div>

        <div className="files-cards-row">
          {/* Card 1: Documents */}
          <div className="file-widget-card">
            <div className="file-doc-stack-icon">
              {/* 3D layered document stack */}
              <div className="doc-sheet sheet-3"></div>
              <div className="doc-sheet sheet-2"></div>
              <div className="doc-sheet sheet-1">
                <div className="doc-line line-short"></div>
                <div className="doc-line"></div>
                <div className="doc-line"></div>
                <div className="doc-line line-mid"></div>
              </div>
            </div>
            <div className="file-meta">
              <span className="file-title">Documents</span>
              <span className="file-count">3 files</span>
            </div>
          </div>

          {/* Card 2: Recent */}
          <div className="file-widget-card">
            <div className="file-recent-thumb">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                alt="Recent thumbnail"
              />
            </div>
            <div className="file-meta">
              <span className="file-title">Recent</span>
              <span className="file-count">6 files</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
