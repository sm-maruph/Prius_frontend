// components/TestimonialCEO.jsx
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  { name:"Maria S.", meta:"Toyota Prius Owner · Long Beach", avatar:"M", color:"#F5A800",
    text:"They replaced my Prius hybrid battery for a fraction of the dealer price. The car runs better than ever. Quick, honest, and great value. Won't go anywhere else." },
  { name:"James R.",  meta:"Verified Google Review",          avatar:"J", color:"#22C55E",
    text:"Got four used tires mounted same day for a great price. The prices on each tire are written in chalk — very transparent. Friendly crew, incredibly fast service." },
  { name:"Kevin T.",  meta:"Prius Gen 3 · Verified Review",   avatar:"K", color:"#60A5FA",
    text:"Brought my 2012 Prius in with the red triangle warning. Battery diagnosed in 20 minutes, fixed same day. Saved me $3,000 compared to the Toyota dealer!" },
  { name:"Sarah M.",  meta:"Long Beach Resident",              avatar:"S", color:"#A78BFA",
    text:"Best mechanic shop in Long Beach! They fixed my brakes and did an oil change while I waited. Fair prices and they explained everything before starting." },
  { name:"David L.",  meta:"Prius Gen 2 Owner",                avatar:"D", color:"#06B6D4",
    text:"Honest, fast, affordable. My Prius battery was failing and they reconditioned it for $299. Toyota wanted $4,000. These guys are lifesavers." },
];

export default function TestimonialCEO() {
  const [active, setActive] = useState(0);
  const headRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

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

  const t = TESTIMONIALS[active];

  return (
    <section id="reviews" style={{ background:"#080F23", padding:"88px 0", position:"relative", overflow:"hidden" }}>
      {/* BG orb */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,168,0,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 }}>
        <div ref={headRef} style={{ opacity:0, textAlign:"center", maxWidth:560, margin:"0 auto 56px" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:12 }}>What Customers Say</div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,60px)", textTransform:"uppercase", lineHeight:1 }}>
            5-Star Reviews{" "}
            <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              From Real Drivers
            </span>
          </h2>
        </div>

        {/* All 5 cards grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:48 }} className="review-grid">
          {TESTIMONIALS.slice(0,3).map((r, i) => (
            <div key={r.name} style={{
              background:"rgba(255,255,255,.03)", border:`1px solid ${r.color}22`,
              borderRadius:18, padding:28,
              boxShadow: active % 3 === i ? `0 8px 40px ${r.color}22` : "none",
              transition:"box-shadow .3s",
            }}>
              <div style={{ fontSize:16, letterSpacing:3, color:"#F5A800", marginBottom:14 }}>★★★★★</div>
              <p style={{ fontSize:14, color:"#8090B0", lineHeight:1.7, fontStyle:"italic", marginBottom:20 }}>"{r.text}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${r.color},${r.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, color:"#fff", flexShrink:0 }}>{r.avatar}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{r.name}</div>
                  <div style={{ fontSize:11, color:"#687190", marginTop:2 }}>{r.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured rotating quote */}
        <div style={{
          background:"linear-gradient(135deg,rgba(19,72,184,.15),rgba(245,168,0,.08))",
          border:"1px solid rgba(245,168,0,.2)", borderRadius:22, padding:"40px",
          textAlign:"center", transition:"all .4s ease",
        }}>
          <div style={{ fontSize:60, color:`${t.color}55`, fontFamily:"Georgia,serif", lineHeight:.7, marginBottom:16 }}>"</div>
          <p style={{ fontSize:"clamp(18px,2.5vw,24px)", color:"#C0D0E8", lineHeight:1.6, fontStyle:"italic", maxWidth:700, margin:"0 auto 28px", fontWeight:400 }}>
            {t.text}
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${t.color},${t.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color:"#fff" }}>{t.avatar}</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontWeight:800, color:"#fff", fontSize:16 }}>{t.name}</div>
              <div style={{ fontSize:12, color:"#687190" }}>{t.meta}</div>
            </div>
          </div>

          {/* dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:24 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 24 : 8, height:8, borderRadius:4,
                background: i === active ? "#F5A800" : "rgba(255,255,255,.2)",
                border:"none", cursor:"pointer", transition:"all .3s",
              }}/>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", marginTop:36 }}>
          {[["⭐","5.0 Average on Google"],["💬","32 Verified Reviews"],["🏆","Trusted Since Opening"],["🔒","Licensed & Insured"]].map(([icon,label]) => (
            <div key={label} style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)", borderRadius:99, padding:"7px 16px", fontSize:13, fontWeight:600, color:"#9BB0D0" }}>
              {icon} {label}
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:860px){.review-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
