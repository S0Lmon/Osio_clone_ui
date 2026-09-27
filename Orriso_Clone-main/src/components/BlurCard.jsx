import "./BlurCard.css";

export default function BlurCard({ children, className }) {
  return (
    <div className={`blur-card ${className}`}>
      {children}
    </div>
  );
}
