import React from "react";
import TopBar from "../components/TopBar";
import LeftSideBar from "../components/LeftSideBar";
import CenterSwapOrriso from "../components/CenterSwapOrriso";
import BottomToolset from "../components/BottomToolset";
import { ZoomHistoryControls } from "../components/FloatingTools";
import "./Workspace.css";

export default function Workspace() {
  // Curated items collection matching the sports/runner neon theme in the reference design
  const items = [
    // 0. Center Initial Item: Glowing neon runners silhouette
    {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },

    // 1-6. Left Grid Slots:
    // Slot 0 (Top-left): Orange glowing runner / shoe
    {
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 1 (Top-center): Group of runners with vibrant neon lighting
    {
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 2 (Bottom-left): Green soccer / football player
    {
      src: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 3 (Bottom-center): B&W vintage track runner
    {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 4: Additional sport athlete
    {
      src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 5: Neon night runner
    {
      src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },

    // 7-12. Right Grid Slots:
    // Slot 6 (Top-left of right grid): Runner in motion with green jersey
    {
      src: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 7: Placeholder (rendered as empty + slot in CenterSwapOrriso)
    null,
    // Slot 8: Abstract blurred runner
    {
      src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 9: Red track with white lane markings
    {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 10: Runner
    {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&auto=format&fit=crop&q=80",
      type: "image"
    },
    // Slot 11: Athlete silhouette
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
      thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80",
      type: "image"
    }
  ];

  return (
    <div className="workspace-container">
      {/* Top Bar with Browser Window Header & Orriso Nav */}
      <TopBar />

      {/* Back to Homebase Button */}
      <LeftSideBar />

      {/* Zoom / History Floating Pill (Top Right) */}
      <ZoomHistoryControls />

      {/* Center Interactive Swap Workspace */}
      <main className="workspace-canvas">
        <CenterSwapOrriso items={items} />
      </main>

      {/* Bottom Toolset (AI Agent & Files Vireel) */}
      <BottomToolset />
    </div>
  );
}
