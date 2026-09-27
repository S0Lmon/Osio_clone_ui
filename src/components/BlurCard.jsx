export default function BlurCard({ children, className, style, onClick }) {
  return (
    <div
      className={`blur-card ${className || ''}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}