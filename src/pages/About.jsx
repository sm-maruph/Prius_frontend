// components/AboutSection.jsx
import { useEffect, useRef } from "react";

const POINTS = [
  { icon:"🏆", title:"Prius Hybrid Specialists", desc:"Toyota-trained technicians who know hybrid battery systems inside and out." },
  { icon:"💰", title:"Upfront Pricing",          desc:"You get a clear quote before any work begins. Zero surprise fees — ever." },
  { icon:"🛞", title:"Huge Tire Selection",       desc:"Massive stock of new & used tires with sizes marked on every tire." },
  { icon:"⚡", title:"Full Auto Repair",          desc:"Brakes, tune-up, oil change, shocks, battery service & electrical." },
];

export default function AboutSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    [[leftRef, -50], [rightRef, 50]].forEach(([ref, x]) => {
      const el = ref.current; if (!el) return;
      el.style.opacity = 0; el.style.transform = `translateX(${x}px)`;
      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        el.style.transition = "opacity .8s ease, transform .8s ease";
        el.style.opacity = 1; el.style.transform = "translateX(0)";
      }, { threshold: 0.2 });
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <section id="about" style={{ background:"#060C1C", padding:"88px 0", position:"relative", overflow:"hidden" }}>
      {/* BG accent */}
      <div style={{ position:"absolute", top:"50%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(19,72,184,.1) 0%,transparent 70%)", transform:"translateY(-50%)" }}/>

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="about-grid">

          {/* LEFT — visual */}
          <div ref={leftRef} style={{ opacity:0 }}>
            <div style={{ position:"relative", borderRadius:24, overflow:"hidden", aspectRatio:"4/3", background:"linear-gradient(135deg,#0A2A6E 0%,#1348B8 60%,#0A2A6E 100%)" }}>
              {/* Shop illustration placeholder */}
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12 }}>
                <div style={{ fontSize:80 }}>🏪</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:800, textTransform:"uppercase", color:"rgba(255,255,255,.3)" }}>
                  Replace with shop photo
                </div>
              </div>

              {/* floating badge */}
              <div style={{
                position:"absolute", bottom:20, left:20,
                background:"rgba(8,15,35,.85)", backdropFilter:"blur(12px)",
                border:"1px solid rgba(245,168,0,.3)", borderRadius:12,
                padding:"12px 18px", display:"flex", alignItems:"center", gap:12,
              }}>
                <div style={{ fontSize:28 }}>🔋</div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, color:"#F5A800" }}>500+ Batteries</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.5)" }}>Replaced in Long Beach</div>
                </div>
              </div>

              {/* top right badge */}
              <div style={{
                position:"absolute", top:16, right:16,
                background:"rgba(34,197,94,.15)", border:"1px solid rgba(34,197,94,.4)",
                borderRadius:10, padding:"10px 16px", textAlign:"center",
              }}>
                <div style={{ fontSize:24, fontWeight:900, fontFamily:"'Barlow Condensed',sans-serif", color:"#22C55E" }}>5.0★</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.5)" }}>Google</div>
              </div>
            </div>

            {/* stat row below image */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:16 }}>
              {[["12+","Years","#F5A800"],["Same Day","Service","#22C55E"],["32","Reviews","#60A5FA"]].map(([n,l,c]) => (
                <div key={l} style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${c}22`, borderRadius:12, padding:"14px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:c, lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:11, color:"#687190", marginTop:4, textTransform:"uppercase", letterSpacing:".06em", fontWeight:600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — text */}
          <div ref={rightRef} style={{ opacity:0 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:12 }}>About the Shop</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,4.5vw,56px)", textTransform:"uppercase", lineHeight:1, marginBottom:16 }}>
              Trusted Auto Repair{" "}
              <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Since Day One
              </span>
            </h2>
            <p style={{ fontSize:15, color:"#7080A0", lineHeight:1.75, marginBottom:28 }}>
              Located at 1190 E Anaheim St in Long Beach, we specialize in Toyota Prius hybrid battery systems — from full reconditioning to new module replacements. We're also your neighborhood one-stop shop for tires, brakes, oil changes, and electrical work.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {POINTS.map((p, i) => (
                <div key={p.title} style={{
                  display:"flex", alignItems:"flex-start", gap:14,
                  padding:"16px 0", borderBottom: i < POINTS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
                }}>
                  <div style={{ fontSize:24, flexShrink:0, width:42, height:42, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight:700, color:"#fff", fontSize:15, marginBottom:3 }}>{p.title}</div>
                    <div style={{ fontSize:13, color:"#7080A0", lineHeight:1.6 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="tel:+15622350298" style={{
              display:"inline-flex", alignItems:"center", gap:10,
              background:"linear-gradient(135deg,#F5A800,#FF6B00)", color:"#080F23",
              fontWeight:800, fontSize:16, padding:"15px 28px", borderRadius:10,
              textDecoration:"none", marginTop:28, boxShadow:"0 8px 28px rgba(245,168,0,.4)",
              transition:"all .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
            >📞 Call (562) 235-0298</a>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:860px){.about-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
