// components/ContactSection.jsx
import { useEffect, useRef } from "react";

const HOURS = [
  ["Monday","8:30 AM – 5:00 PM"],["Tuesday","8:30 AM – 5:00 PM"],
  ["Wednesday","8:30 AM – 5:00 PM"],["Thursday","8:30 AM – 5:00 PM"],
  ["Friday","8:30 AM – 5:00 PM"],["Saturday","8:30 AM – 5:00 PM"],
  ["Sunday","8:30 AM – 3:00 PM"],
];

export default function ContactSection() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current; if (!el) return;
    el.style.opacity = 0; el.style.transform = "translateY(40px)";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      el.style.transition = "opacity .8s ease, transform .8s ease";
      el.style.opacity = 1; el.style.transform = "translateY(0)";
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── ORANGE CTA BAND ── */}
      <div style={{
        background:"linear-gradient(135deg,#F5A800 0%,#FF8C00 50%,#FF6B00 100%)",
        padding:"72px 0", textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(-45deg,transparent 0px,transparent 14px,rgba(0,0,0,.05) 14px,rgba(0,0,0,.05) 15px)" }}/>
        <div style={{ position:"relative", zIndex:1, maxWidth:640, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(0,0,0,.45)", marginBottom:10 }}>
            Ready to Get Fixed?
          </div>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(40px,6vw,72px)", textTransform:"uppercase", lineHeight:.95, color:"#080F23", marginBottom:10 }}>
            Call Us Right Now
          </h2>
          <p style={{ color:"rgba(0,0,0,.55)", marginBottom:32, fontSize:16, lineHeight:1.6 }}>
            Real technicians. Same-day availability. Long Beach's most trusted auto repair shop.
          </p>
          <a href="tel:+15622350298" style={{
            display:"inline-flex", alignItems:"center", gap:12,
            background:"#080F23", color:"#fff", fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:900, fontSize:28, textTransform:"uppercase", letterSpacing:".04em",
            padding:"18px 44px", borderRadius:12, textDecoration:"none",
            boxShadow:"0 12px 40px rgba(0,0,0,.35)", transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="#0A2A6E"; e.currentTarget.style.transform="scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#080F23"; e.currentTarget.style.transform="scale(1)"; }}
          >
            📞 (562) 235-0298
          </a>
          <p style={{ fontSize:13, color:"rgba(0,0,0,.4)", marginTop:18 }}>Mon–Sat 8:30AM–5PM · Sun 8:30AM–3PM · 1190 E Anaheim St, Long Beach</p>
        </div>
      </div>

      {/* ── CONTACT / MAP ── */}
      <section id="contact" style={{ background:"#060C1C", padding:"88px 0" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"#F5A800", marginBottom:10 }}>Find Us</div>
            <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(36px,5vw,60px)", textTransform:"uppercase", lineHeight:1 }}>Visit the Shop</h2>
          </div>

          <div ref={gridRef} style={{ opacity:0, display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }} className="contact-grid">
            {/* Info */}
            <div>
              {[
                { icon:"📞", label:"Phone", value:<a href="tel:+15622350298" style={{ color:"#F5A800", textDecoration:"none", fontWeight:700 }}>(562) 235-0298</a> },
                { icon:"📍", label:"Address", value:<>1190 E Anaheim St<br/>Long Beach, CA 90813</> },
                { icon:"🌐", label:"Website", value:<a href="http://priushybridbatteryautorepair.com" target="_blank" rel="noreferrer" style={{ color:"#F5A800", textDecoration:"none" }}>priushybridbatteryautorepair.com</a> },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"16px 0", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ width:44, height:44, background:"rgba(19,72,184,.2)", border:"1px solid rgba(19,72,184,.4)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:"#687190", textTransform:"uppercase", letterSpacing:".07em" }}>{item.label}</div>
                    <div style={{ fontSize:15, fontWeight:600, color:"#fff", marginTop:3 }}>{item.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:28 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#687190", textTransform:"uppercase", letterSpacing:".07em", marginBottom:12 }}>Business Hours</div>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  {HOURS.map(([day, hrs]) => (
                    <tr key={day} style={{ borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                      <td style={{ padding:"9px 0", fontSize:13, color: day === today ? "#F5A800" : "rgba(255,255,255,.5)", fontWeight: day === today ? 700 : 400 }}>{day}</td>
                      <td style={{ padding:"9px 0", fontSize:13, color: day === today ? "#F5A800" : "#fff", fontWeight: day === today ? 700 : 600, textAlign:"right" }}>{hrs}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>

            {/* Map */}
            <div>
              <div style={{ borderRadius:18, overflow:"hidden", border:"1px solid rgba(255,255,255,.08)", height:320, marginBottom:16, boxShadow:"0 16px 48px rgba(0,0,0,.4)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.62!2d-118.1718!3d33.7917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd31ed9bdd1ed5%3A0x6f24b8891ef6b0d1!2s1190%20E%20Anaheim%20St%2C%20Long%20Beach%2C%20CA%2090813!5e0!3m2!1sen!2sus!4v1700000000000"
                  style={{ width:"100%", height:"100%", border:"none" }}
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Shop location"
                />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <a href="https://maps.google.com/?q=1190+E+Anaheim+St+Long+Beach+CA" target="_blank" rel="noreferrer" style={{
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  background:"transparent", color:"#fff", fontWeight:600, fontSize:14,
                  padding:"13px", borderRadius:10, textDecoration:"none",
                  border:"2px solid rgba(255,255,255,.2)", transition:"all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#F5A800"; e.currentTarget.style.color="#F5A800"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.2)"; e.currentTarget.style.color="#fff"; }}
                >📍 Get Directions</a>
                <a href="tel:+15622350298" style={{
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  background:"linear-gradient(135deg,#F5A800,#FF6B00)", color:"#080F23",
                  fontWeight:800, fontSize:14, padding:"13px", borderRadius:10,
                  textDecoration:"none", boxShadow:"0 6px 20px rgba(245,168,0,.4)",
                }}>📞 Call Now</a>
              </div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:860px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#040810", borderTop:"1px solid rgba(255,255,255,.06)", padding:"36px 24px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:800, textTransform:"uppercase", marginBottom:8 }}>
          Prius Hybrid Battery &amp; <span style={{ color:"#F5A800" }}>Auto Repair</span>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:24, marginBottom:12, flexWrap:"wrap" }}>
          {["#services","#prius","#gallery","#reviews","#contact"].map(h => (
            <a key={h} href={h} style={{ fontSize:12, color:"#687190", textDecoration:"none", textTransform:"capitalize" }}
            onMouseEnter={e => e.target.style.color="#F5A800"}
            onMouseLeave={e => e.target.style.color="#687190"}
            >{h.replace("#","")}</a>
          ))}
        </div>
        <p style={{ fontSize:12, color:"#687190" }}>1190 E Anaheim St, Long Beach, CA 90813 · (562) 235-0298</p>
        <p style={{ fontSize:12, color:"#404860", marginTop:6 }}>© 2025 Prius Hybrid Battery Auto Repair. All rights reserved.</p>
      </footer>
    </>
  );
}
