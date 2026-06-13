// components/GallerySection.jsx  ← NEW
import { useEffect, useRef, useState } from "react";

// Each card is a placeholder — replace src with real shop photos
const GALLERY = [
  { label:"Hybrid Battery Pack",     emoji:"🔋", color:"#F5A800", span:2 },
  { label:"Tire Mounting Station",   emoji:"🛞", color:"#22C55E", span:1 },
  { label:"Brake Service Bay",       emoji:"🛑", color:"#EF4444", span:1 },
  { label:"Electrical Diagnostics",  emoji:"⚡", color:"#60A5FA", span:1 },
  { label:"Car Lifted on Jack",      emoji:"🚗", color:"#A78BFA", span:1 },
  { label:"Our Tire Inventory",      emoji:"🏪", color:"#06B6D4", span:1 },
  { label:"Engine Repair Bay",       emoji:"🔧", color:"#F97316", span:2 },
];

function GalleryCard({ label, emoji, color, span, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = 0; el.style.transform = "scale(.9)";
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity .55s ease, transform .55s ease";
        el.style.opacity = 1; el.style.transform = "scale(1)";
      }, delay);
    }, { threshold: 0.1 });
    obs.observe(el);
  }, [delay]);

  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} style={{
      gridColumn: `span ${span}`,
      position:"relative", borderRadius:16, overflow:"hidden", cursor:"pointer",
      aspectRatio: span === 2 ? "2.2/1" : "1/1",
      background:`linear-gradient(135deg,rgba(8,15,35,.9) 0%,${color}22 100%)`,
      border:`1px solid ${color}33`,
      transition:"transform .3s, box-shadow .3s",
      transform: hovered ? "scale(1.02)" : "scale(1)",
      boxShadow: hovered ? `0 20px 50px ${color}44` : "none",
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      {/* Placeholder content — replace with <img> */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
        <div style={{
          fontSize: span === 2 ? 64 : 48,
          filter: "drop-shadow(0 4px 20px rgba(0,0,0,.5))",
          transform: hovered ? "scale(1.15) translateY(-4px)" : "scale(1)",
          transition:"transform .3s",
        }}>{emoji}</div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,.3)", textTransform:"uppercase", letterSpacing:".1em" }}>
          📸 Replace with photo
        </div>
      </div>

      {/* Hover overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:`linear-gradient(0deg,rgba(8,15,35,.85) 0%,transparent 60%)`,
        opacity: hovered ? 1 : 0, transition:"opacity .3s",
        display:"flex", alignItems:"flex-end", padding:20,
      }}>
        <div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:800, textTransform:"uppercase", color:"#fff", marginBottom:2 }}>{label}</div>
          <div style={{ width:40, height:3, background:color, borderRadius:2 }}/>
        </div>
      </div>

      {/* Corner badge */}
      <div style={{
        position:"absolute", top:12, right:12,
        background:color + "22", border:`1px solid ${color}55`,
        borderRadius:6, padding:"3px 10px", fontSize:10, fontWeight:700,
        color, textTransform:"uppercase", letterSpacing:".07em",
      }}>
        {label.split(" ")[0]}
      </div>
    </div>
  );
}

export default function GallerySection() {
  const headRef = useRef(null);
  useEffect(() => {
    const el = headRef.current; if (!el) return;
    el.style.opacity = 0; el.style.transform = "translateY(30px)";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      el.style.transition = "opacity .7s ease, transform .7s ease";
      el.style.opacity = 1; el.style.transform = "translateY(0)";
    }, { threshold: 0.2 });
    obs.observe(el);
  }, []);

  return (
    <section id="gallery" style={{ background:"linear-gradient(180deg,#060C1C 0%,#080F23 100%)", padding:"88px 0" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>

        <div ref={headRef} style={{ opacity:0, textAlign:"center", maxWidth:600, margin:"0 auto 52px" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:12 }}>Shop Gallery</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,60px)", textTransform:"uppercase", lineHeight:1, marginBottom:14 }}>
            See the Shop{" "}
            <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              In Action
            </span>
          </h2>
          <p style={{ fontSize:15, color:"#687190", lineHeight:1.7 }}>
            From hybrid battery bays to tire mounting and brake inspections — a glimpse inside Long Beach's favorite auto repair shop.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, gridAutoRows:"220px" }}>
          {GALLERY.map((item, i) => (
            <GalleryCard key={item.label} {...item} delay={i * 80} />
          ))}
        </div>

        {/* CTA below gallery */}
        <div style={{ textAlign:"center", marginTop:40, display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="tel:+15622350298" style={{
            display:"inline-flex", alignItems:"center", gap:10,
            background:"linear-gradient(135deg,#F5A800,#FF6B00)", color:"#080F23",
            fontWeight:800, fontSize:16, padding:"15px 32px", borderRadius:10,
            textDecoration:"none", boxShadow:"0 8px 28px rgba(245,168,0,.4)", transition:"all .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform="scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
          >📞 Book a Visit — (562) 235-0298</a>
          <a href="https://maps.google.com/?q=1190+E+Anaheim+St+Long+Beach+CA" target="_blank" rel="noreferrer" style={{
            display:"inline-flex", alignItems:"center", gap:10,
            background:"transparent", color:"#fff", fontWeight:600, fontSize:15,
            padding:"14px 28px", borderRadius:10, textDecoration:"none",
            border:"2px solid rgba(255,255,255,.2)", transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="#F5A800"; e.currentTarget.style.color="#F5A800"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.2)"; e.currentTarget.style.color="#fff"; }}
          >📍 Get Directions</a>
        </div>
      </div>

      <style>{`@media(max-width:700px){#gallery .gallery-grid-inner,[style*="repeat(3"]{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}
