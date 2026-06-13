// components/stats/StatsSection.jsx
import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(Math.round(start));
        if (start >= target) clearInterval(timer);
      }, 16);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

const STATS = [
  { value:500, suffix:"+", label:"Hybrid Batteries", sub:"Replaced & Reconditioned", color:"#F5A800", glow:"rgba(245,168,0,.25)" },
  { value:5,   suffix:".0★", label:"Google Rating",   sub:"32 Verified Reviews",      color:"#22C55E", glow:"rgba(34,197,94,.25)" },
  { value:12,  suffix:"+",  label:"Years in Business",sub:"Serving Long Beach",        color:"#60A5FA", glow:"rgba(96,165,250,.25)" },
  { value:98,  suffix:"%",  label:"Customer Satisfaction", sub:"No Fix, No Fee Policy",color:"#A78BFA", glow:"rgba(167,139,250,.25)" },
];

function StatCard({ value, suffix, label, sub, color, glow }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} style={{
      background:"rgba(255,255,255,.03)",
      border:`1px solid ${color}33`,
      borderRadius:18, padding:"28px 20px", textAlign:"center",
      transition:"transform .3s, box-shadow .3s",
      boxShadow:`0 8px 40px ${glow}`,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 20px 50px ${glow}`; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 8px 40px ${glow}`; }}
    >
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(44px,5vw,64px)", color, lineHeight:1, marginBottom:8 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:18, textTransform:"uppercase", letterSpacing:".04em", color:"#fff", marginBottom:4 }}>
        {label}
      </div>
      <div style={{ fontSize:12, color:"#687190", fontWeight:500 }}>{sub}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section style={{ background:"#080F23", padding:"72px 0", position:"relative", overflow:"hidden" }}>
      {/* Coloured line top */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#F5A800,#1348B8,#A78BFA,#22C55E)" }}/>

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:10 }}>
            By The Numbers
          </div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(34px,5vw,56px)", textTransform:"uppercase", lineHeight:1 }}>
            Why Long Beach{" "}
            <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Trusts Us
            </span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="stats-grid">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>

      <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}
