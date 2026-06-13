// components/CategoryGrid.jsx  (Services)
import { useEffect, useRef } from "react";

const SERVICES = [
  { emoji:"🔋", title:"Prius Hybrid Battery", desc:"Full reconditioning, module replacement & new pack installation. All generations — Gen 2, 3, 4 & 5.", color:"#F5A800", glow:"rgba(245,168,0,.2)" },
  { emoji:"🛞", title:"New & Used Tires",      desc:"Huge selection in all sizes. Prices written on every tire. Mounted, balanced & rotated on-site.", color:"#22C55E", glow:"rgba(34,197,94,.2)" },
  { emoji:"🛑", title:"Brake Service",          desc:"Pad replacement, rotor resurfacing, caliper repair & fluid flush. Safety inspection included.", color:"#EF4444", glow:"rgba(239,68,68,.2)" },
  { emoji:"⚡", title:"Electrical & Diagnosis", desc:"Check engine light, alternator, starter, wiring & full computer diagnostic scan.", color:"#60A5FA", glow:"rgba(96,165,250,.2)" },
  { emoji:"🛢️", title:"Oil Change & Tune-Up",  desc:"Full synthetic & conventional oil changes, spark plugs, air filters & multi-point inspection.", color:"#A78BFA", glow:"rgba(167,139,250,.2)" },
  { emoji:"🔩", title:"Shocks & Suspension",   desc:"Diagnose & replace worn shocks, struts & suspension parts to restore ride comfort.", color:"#06B6D4", glow:"rgba(6,182,212,.2)" },
];

function ServiceCard({ emoji, title, desc, color, glow, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = 0; el.style.transform = "translateY(36px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => {
        el.style.transition = "opacity .6s ease, transform .6s ease";
        el.style.opacity = 1; el.style.transform = "translateY(0)";
      }, delay);
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{
      background:"rgba(255,255,255,.03)", border:`1px solid rgba(255,255,255,.08)`,
      borderRadius:18, padding:28, position:"relative", overflow:"hidden",
      transition:"border-color .3s, background .3s, transform .3s, box-shadow .3s",
      cursor:"default",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = color + "55";
      e.currentTarget.style.background = `${glow.replace(",.2",",.07")}`;
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = `0 20px 50px ${glow}`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
      e.currentTarget.style.background = "rgba(255,255,255,.03)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      {/* top accent bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${color},transparent)`, borderRadius:"18px 18px 0 0" }}/>

      <div style={{
        width:52, height:52, borderRadius:12, marginBottom:18,
        background:`linear-gradient(135deg,${glow},rgba(255,255,255,.04))`,
        border:`1px solid ${color}33`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:26,
      }}>{emoji}</div>

      <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, fontWeight:800, textTransform:"uppercase", letterSpacing:".03em", color:"#fff", marginBottom:10 }}>{title}</h3>
      <p style={{ fontSize:13, color:"#7080A0", lineHeight:1.7 }}>{desc}</p>

      <div style={{ marginTop:20, display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".06em" }}>
        Learn More
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </div>
  );
}

export default function CategoryGrid() {
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
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ background:"linear-gradient(180deg,#080F23 0%,#0A1230 100%)", padding:"88px 0" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>
        <div ref={headRef} style={{ textAlign:"center", maxWidth:600, margin:"0 auto 52px" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:12 }}>What We Do</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,60px)", textTransform:"uppercase", lineHeight:1, marginBottom:14 }}>
            Complete Auto Services{" "}
            <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              One Location
            </span>
          </h2>
          <p style={{ fontSize:15, color:"#687190", lineHeight:1.7 }}>From your Prius hybrid battery to a simple oil change — we handle it all under one roof, same day.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="cat-grid">
          {SERVICES.map((s,i) => <ServiceCard key={s.title} {...s} delay={i * 100} />)}
        </div>
      </div>

      <style>{`@media(max-width:900px){.cat-grid{grid-template-columns:1fr 1fr!important}} @media(max-width:580px){.cat-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
