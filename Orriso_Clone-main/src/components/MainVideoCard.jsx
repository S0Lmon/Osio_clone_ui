import BlurCard from "./BlurCard";
import "./MainVideoCard.css";

export default function MainVideoCard() {
  return (
    <div className="center-card-wrapper">
      <BlurCard className="center-card">
        <div className="video-thumbnail">
          <img src="/assets/hero-blur.jpg" alt="" />
          <button className="play-btn">▶</button>
        </div>

        <h1>Engineered Comfort,<br />Maximum Running Speed</h1>
      </BlurCard>
    </div>
  );
}
