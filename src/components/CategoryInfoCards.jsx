// components/CategoryInfoCards.jsx  (Prius Special + How It Works)
import { useEffect, useRef } from "react";

const STEPS = [
  { n:"01", icon:"📞", title:"Call or Visit",       desc:"Call (562) 235-0298 or drive to 1190 E Anaheim St. A real person answers instantly." },
  { n:"02", icon:"💬", title:"Describe the Problem", desc:"Tell us what's wrong. Our tech asks a few quick questions to diagnose efficiently." },
  { n:"03", icon:"🔍", title:"Free Diagnosis",       desc:"We run a full computer scan and inspect your vehicle. No guesswork." },
  { n:"04", icon:"💰", title:"Upfront Quote",        desc:"Clear itemized price before any work starts. You approve — we work." },
  { n:"05", icon:"✅", title:"Drive Away Fixed",     desc:"Most repairs done same-day. No Fix, No Fee — guaranteed." },
];

const BATTERY_FEATURES = [
  "Hybrid battery diagnostic scan (all Prius generations)",
  "Individual module replacement — fix only what's bad",
  "Full pack reconditioning with capacity testing",
  "New OEM and aftermarket battery packs in stock",
  "Cooling fan cleaning & inverter inspection",
  "90-day to 1-year warranty on all battery work",
];

export default function CategoryInfoCards() {
  const priusRef = useRef(null);
  const howRef   = useRef(null);

  useEffect(() => {
    [priusRef, howRef].forEach(ref => {
      const el = ref.current; if (!el) return;
      el.style.opacity = 0; el.style.transform = "translateY(40px)";
      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        el.style.transition = "opacity .8s ease, transform .8s ease";
        el.style.opacity = 1; el.style.transform = "translateY(0)";
      }, { threshold: 0.1 });
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <>
      {/* ── PRIUS SPECIAL ── */}
      <section id="prius" style={{ background:"linear-gradient(135deg,#0A2A6E 0%,#0E1E50 50%,#050B1A 100%)", padding:"88px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:"-4%", bottom:"-8%", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(120px,18vw,280px)", color:"rgba(255,255,255,.04)", userSelect:"none", lineHeight:1 }}>PRIUS</div>

        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 }}>
          <div ref={priusRef} style={{ opacity:0, display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }} className="prius-grid">

            {/* LEFT */}
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:12 }}>Specialist Service</div>
              <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,58px)", textTransform:"uppercase", lineHeight:1, marginBottom:16 }}>
                Toyota Prius<br/>
                <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Hybrid Battery</span><br/>
                System LB
              </h2>
              <p style={{ fontSize:15, color:"#7080A0", lineHeight:1.75, marginBottom:24 }}>
                Long Beach's dedicated Prius hybrid battery service center. Whether your battery needs reconditioning, module replacement, or a complete swap — we've done it hundreds of times.
              </p>

              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {BATTERY_FEATURES.map((f, i) => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom: i < BATTERY_FEATURES.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(245,168,0,.15)", border:"1px solid rgba(245,168,0,.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ color:"#F5A800", fontSize:11, fontWeight:900 }}>✓</span>
                    </div>
                    <span style={{ fontSize:14, color:"#9BB0D0" }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+15622350298" style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:"linear-gradient(135deg,#F5A800,#FF6B00)", color:"#080F23",
                fontWeight:800, fontSize:16, padding:"15px 28px", borderRadius:10,
                textDecoration:"none", marginTop:28, boxShadow:"0 8px 28px rgba(245,168,0,.4)",
              }}>🔋 Book a Battery Check</a>
            </div>

            {/* RIGHT — pricing */}
            <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(245,168,0,.2)", borderRadius:22, padding:32, boxShadow:"0 24px 60px rgba(0,0,0,.35)" }}>
              <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26, fontWeight:800, textTransform:"uppercase", marginBottom:24 }}>Battery Services</h3>

              {[
                { label:"Reconditioning", price:"$299", sub:"starting from", features:["Full capacity test","Module balancing","Fan cleaning","90-day warranty"] },
                { label:"New Battery Pack", price:"$799", sub:"starting from", features:["OEM & aftermarket","Gen 2 / 3 / 4 / 5","Labor included","1-year warranty"] },
              ].map((pkg, i) => (
                <div key={pkg.label} style={{ paddingBottom:20, marginBottom:20, borderBottom: i === 0 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                  <div style={{ fontSize:11, color:"#687190", textTransform:"uppercase", letterSpacing:".07em", fontWeight:600, marginBottom:6 }}>{pkg.label}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:14 }}>
                    <span style={{ fontSize:13, color:"#687190" }}>{pkg.sub}</span>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:52, fontWeight:900, color:"#F5A800", lineHeight:1 }}>{pkg.price}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {pkg.features.map(f => (
                      <div key={f} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#7080A0" }}>
                        <span style={{ color:"#F5A800", fontWeight:700 }}>✓</span>{f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ background:"rgba(245,168,0,.08)", border:"1px solid rgba(245,168,0,.22)", borderRadius:10, padding:14, textAlign:"center", fontSize:13, color:"rgba(255,255,255,.65)" }}>
                💡 Free hybrid battery diagnostic with any service appointment.
              </div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:860px){.prius-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ background:"#060C1C", padding:"88px 0" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>
          <div ref={howRef} style={{ opacity:0 }}>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:12 }}>The Process</div>
              <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,60px)", textTransform:"uppercase", lineHeight:1 }}>
                How It{" "}
                <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Works</span>
              </h2>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0, position:"relative" }} className="how-grid">
              {/* connector line */}
              <div style={{ position:"absolute", top:40, left:"10%", right:"10%", height:2, background:"linear-gradient(90deg,#0A2A6E,#F5A800,#0A2A6E)", zIndex:0 }}/>

              {STEPS.map((s, i) => (
                <div key={s.n} style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 12px" }}>
                  <div style={{
                    width:64, height:64, borderRadius:"50%", margin:"0 auto 20px",
                    background:"#060C1C", border:"3px solid #F5A800",
                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 0 0 6px rgba(245,168,0,.1), 0 8px 24px rgba(245,168,0,.25)",
                    fontSize:22,
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:800, color:"#F5A800", letterSpacing:".12em", textTransform:"uppercase", marginBottom:6 }}>Step {s.n}</div>
                  <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:800, textTransform:"uppercase", marginBottom:8, color:"#fff" }}>{s.title}</h3>
                  <p style={{ fontSize:12, color:"#506080", lineHeight:1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media(max-width:900px){.how-grid{grid-template-columns:1fr 1fr!important}} @media(max-width:500px){.how-grid{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  );
}
