// components/hero/HeroBanner.jsx
import { useEffect, useRef } from "react";

const SERVICES = [
  "🔋 Hybrid Battery","🛞 Tires","🛑 Brakes","⚡ Electrical",
  "🛢️ Oil Change","🔧 Tune-Up","📡 Diagnosis","🔩 Suspension",
];

export default function HeroBanner() {
  const titleRef  = useRef(null);
  const cardRef   = useRef(null);
  const subRef    = useRef(null);
  const btnsRef   = useRef(null);
  const statsRef  = useRef(null);

  useEffect(() => {
    const els = [titleRef, subRef, btnsRef, statsRef];
    els.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.style.opacity = 0;
      ref.current.style.transform = "translateY(40px)";
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.transition = "opacity .7s ease, transform .7s ease";
        ref.current.style.opacity = 1;
        ref.current.style.transform = "translateY(0)";
      }, 200 + i * 140);
    });
    if (cardRef.current) {
      cardRef.current.style.opacity = 0;
      cardRef.current.style.transform = "translateX(60px)";
      setTimeout(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = "opacity .8s ease, transform .8s ease";
        cardRef.current.style.opacity = 1;
        cardRef.current.style.transform = "translateX(0)";
      }, 500);
    }
  }, []);

  return (
    <section id="hero" style={{
      minHeight:"100vh", paddingTop:60, position:"relative",
      display:"flex", alignItems:"center", overflow:"hidden",
      background:"linear-gradient(145deg,#050D1F 0%,#0A1A4A 55%,#0E2E6B 100%)",
    }}>
      {/* Animated orbs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        {[
          { size:500, x:"70%", y:"10%", c:"rgba(245,168,0,.07)", delay:"0s" },
          { size:380, x:"5%",  y:"60%", c:"rgba(19,72,184,.12)", delay:"2s" },
          { size:260, x:"50%", y:"80%", c:"rgba(139,92,246,.08)", delay:"1s" },
        ].map((o,i) => (
          <div key={i} style={{
            position:"absolute", width:o.size, height:o.size, borderRadius:"50%",
            background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,
            left:o.x, top:o.y, transform:"translate(-50%,-50%)",
            animation:`float ${5+i}s ease-in-out infinite`,
            animationDelay:o.delay,
          }}/>
        ))}
        {/* Grid texture */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
        }}/>
        {/* Ghost word */}
        <div style={{
          position:"absolute", right:"-4%", bottom:"-6%",
          fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
          fontSize:"clamp(180px,22vw,380px)", lineHeight:1, textTransform:"uppercase",
          color:"rgba(30,94,216,.1)", userSelect:"none", letterSpacing:"-.02em",
        }}>REPAIR</div>
      </div>

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"80px 24px 60px", position:"relative", zIndex:2, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:48, alignItems:"center" }} className="hero-grid">

          {/* LEFT */}
          <div>
            <div ref={titleRef} style={{ opacity:0 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:8,
                background:"rgba(245,168,0,.1)", border:"1px solid rgba(245,168,0,.35)",
                borderRadius:4, padding:"6px 14px", marginBottom:20,
                fontSize:11, fontWeight:700, letterSpacing:".15em",
                textTransform:"uppercase", color:"#F5A800",
              }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#22C55E", animation:"blink 1.4s ease-in-out infinite", display:"inline-block" }}/>
                Open Now · 5.0 ★ Google Verified · 32 Reviews
              </div>

              <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, lineHeight:.93, textTransform:"uppercase", fontSize:"clamp(50px,7.5vw,92px)", marginBottom:16 }}>
                Long Beach's<br/>
                <span style={{ background:"linear-gradient(135deg,#F5A800,#FF6B00,#EF4444)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Prius &amp; Hybrid
                </span><br/>
                Battery Experts
              </h1>
            </div>

            <div ref={subRef} style={{ opacity:0 }}>
              <p style={{ fontSize:16, lineHeight:1.7, color:"#A4B4D8", maxWidth:520, marginBottom:28 }}>
                Specialized in Toyota Prius hybrid battery reconditioning, new &amp; used tires, brake service, oil changes, electrical diagnostics — right here on East Anaheim St, Long Beach.
              </p>
            </div>

            <div ref={btnsRef} style={{ opacity:0, display:"flex", gap:14, flexWrap:"wrap", marginBottom:40 }}>
              <a href="tel:+15622350298" style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:"linear-gradient(135deg,#F5A800,#FF6B00)",
                color:"#080F23", fontWeight:800, fontSize:16, padding:"16px 30px",
                borderRadius:10, textDecoration:"none",
                boxShadow:"0 6px 28px rgba(245,168,0,.5)",
                transition:"all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(245,168,0,.65)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 28px rgba(245,168,0,.5)"; }}
              >
                📞 Call (562) 235-0298
              </a>
              <a href="#services" style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:"transparent", color:"#fff", fontWeight:600, fontSize:15,
                padding:"15px 28px", borderRadius:10, textDecoration:"none",
                border:"2px solid rgba(255,255,255,.2)", transition:"all .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#F5A800"; e.currentTarget.style.color="#F5A800"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.2)"; e.currentTarget.style.color="#fff"; }}
              >
                🔍 All Services
              </a>
            </div>

            <div ref={statsRef} style={{ opacity:0, display:"flex", gap:32, flexWrap:"wrap" }}>
              {[["12+","Years in Business"],["5.0★","Google Rating"],["500+","Batteries Fixed"],["Same Day","Service Available"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:"#fff", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:"#687190", letterSpacing:".06em", textTransform:"uppercase", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating card */}
          <div ref={cardRef} style={{ opacity:0 }}>
            <div style={{
              background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.1)",
              backdropFilter:"blur(16px)", borderRadius:20, padding:28,
              boxShadow:"0 24px 64px rgba(0,0,0,.4)",
            }}>
              {/* Stars */}
              <div style={{
                background:"linear-gradient(135deg,#0A2A6E,#1348B8)", borderRadius:12,
                padding:"18px", marginBottom:18, textAlign:"center",
              }}>
                <div style={{ fontSize:22, letterSpacing:4, color:"#F5A800", marginBottom:4 }}>★★★★★</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:42, fontWeight:900, color:"#F5A800", lineHeight:1 }}>5.0</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.55)", marginTop:2 }}>32 verified Google reviews</div>
              </div>

              {/* Pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:18 }}>
                {SERVICES.map(s => (
                  <span key={s} style={{
                    background:"rgba(19,72,184,.2)", border:"1px solid rgba(19,72,184,.4)",
                    borderRadius:6, padding:"5px 11px", fontSize:11, fontWeight:700,
                    color:"#9BB4F0", whiteSpace:"nowrap",
                  }}>{s}</span>
                ))}
              </div>

              <div style={{ borderTop:"1px solid rgba(255,255,255,.07)", margin:"0 0 16px" }}/>

              <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", textAlign:"center", lineHeight:1.9 }}>
                <div style={{
                  display:"inline-block", background:"rgba(34,197,94,.15)", border:"1px solid rgba(34,197,94,.35)",
                  color:"#4ADE80", borderRadius:99, padding:"3px 12px", fontSize:11, fontWeight:700,
                  letterSpacing:".08em", textTransform:"uppercase", marginBottom:10,
                }}>● Open Today</div><br/>
                <strong style={{ color:"#fff" }}>Mon–Sat</strong> 8:30 AM – 5:00 PM<br/>
                <strong style={{ color:"#fff" }}>Sunday</strong> 8:30 AM – 3:00 PM<br/><br/>
                <span style={{ color:"#F5A800", fontWeight:600 }}>1190 E Anaheim St · Long Beach CA 90813</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave divider */}
      <div style={{ position:"absolute", bottom:-1, left:0, right:0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", display:"block" }}>
          <path d="M0 60L480 20L960 50L1440 10V60H0Z" fill="#080F23"/>
        </svg>
      </div>

      <style>{`
        @media(max-width:860px){.hero-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
