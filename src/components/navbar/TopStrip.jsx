// components/navbar/TopStrip.jsx
export default function TopStrip() {
  const items = [
    "🔋 Prius Hybrid Battery", "🛞 New & Used Tires", "🛑 Brake Service",
    "🔧 Tune-Up", "⚡ Electrical", "🛢️ Oil Change", "📡 Diagnosis",
    "🔩 Shocks & Suspension", "🏆 5-Star Rated", "📍 Long Beach CA",
    "🔋 Prius Hybrid Battery", "🛞 New & Used Tires", "🛑 Brake Service",
    "🔧 Tune-Up", "⚡ Electrical", "🛢️ Oil Change", "📡 Diagnosis",
    "🔩 Shocks & Suspension", "🏆 5-Star Rated", "📍 Long Beach CA",
  ];

  return (
    <div style={{
      background: "linear-gradient(90deg,#F5A800,#FF8C00,#F5A800)",
      backgroundSize: "200% 100%",
      animation: "gradient-x 4s ease infinite",
      overflow: "hidden",
      padding: "9px 0",
      borderBottom: "2px solid #D48900",
    }}>
      <div style={{
        display: "flex",
        width: "max-content",
        animation: "ticker 28s linear infinite",
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "14px", fontWeight: 800,
            color: "#080F23", textTransform: "uppercase",
            letterSpacing: ".07em", padding: "0 36px", whiteSpace: "nowrap",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
