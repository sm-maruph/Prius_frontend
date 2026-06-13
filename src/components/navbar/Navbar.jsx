// components/navbar/Navbar.jsx
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about",    label: "About" },
    { href: "#services", label: "Services" },
    { href: "#prius",    label: "Hybrid Battery" },
    { href: "#gallery",  label: "Gallery" },
    { href: "#reviews",  label: "Reviews" },
    { href: "#contact",  label: "Contact" },
  ];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    height: "60px",
    background: scrolled
      ? "rgba(8,15,35,.97)"
      : "linear-gradient(180deg,rgba(8,15,35,.9) 0%,transparent 100%)",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(245,168,0,.2)" : "none",
    transition: "all .35s ease",
    display: "flex", alignItems: "center",
    padding: "0 24px",
  };

  return (
    <>
      <nav style={navStyle}>
        {/* Brand */}
        <a href="#hero" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none", marginRight:"auto" }}>
          <div style={{
            width:38, height:38, borderRadius:8, background:"linear-gradient(135deg,#1348B8,#0A2A6E)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 0 16px rgba(19,72,184,.5)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A800" strokeWidth="2.5">
              <rect x="3" y="10" width="18" height="7" rx="2"/>
              <line x1="7" y1="10" x2="7" y2="7"/><line x1="17" y1="10" x2="17" y2="7"/>
              <line x1="7" y1="7" x2="17" y2="7"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, lineHeight:1.1, color:"#fff" }}>
              Prius Hybrid Battery
            </div>
            <div style={{ fontSize:10, fontWeight:600, color:"#F5A800", letterSpacing:".08em", textTransform:"uppercase" }}>
              Auto Repair · Long Beach
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div style={{ display:"flex", gap:24, alignItems:"center" }} className="hide-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize:13, fontWeight:600, color:"rgba(255,255,255,.75)",
              textDecoration:"none", letterSpacing:".04em", transition:"color .2s",
            }}
            onMouseEnter={e => e.target.style.color="#F5A800"}
            onMouseLeave={e => e.target.style.color="rgba(255,255,255,.75)"}
            >{l.label}</a>
          ))}
        </div>

        <a href="tel:+15622350298" style={{
          marginLeft:24, background:"linear-gradient(135deg,#F5A800,#FF6B00)",
          color:"#080F23", fontWeight:800, fontSize:13, padding:"9px 18px",
          borderRadius:8, textDecoration:"none", letterSpacing:".04em",
          display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap",
          boxShadow:"0 4px 16px rgba(245,168,0,.4)", transition:"all .2s",
        }}
        className="hide-mobile"
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.04)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
        >
          📞 (562) 235-0298
        </a>

        {/* Burger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile"
          style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:24, marginLeft:"auto" }}>
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position:"fixed", top:60, left:0, right:0, zIndex:99,
          background:"rgba(8,15,35,.98)", backdropFilter:"blur(20px)",
          borderBottom:"2px solid rgba(245,168,0,.3)",
          padding:"20px 24px", display:"flex", flexDirection:"column", gap:4,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding:"12px 0", fontSize:16, fontWeight:600, color:"rgba(255,255,255,.8)",
                textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,.06)",
              }}>
              {l.label}
            </a>
          ))}
          <a href="tel:+15622350298" style={{
            marginTop:12, background:"linear-gradient(135deg,#F5A800,#FF6B00)",
            color:"#080F23", fontWeight:800, fontSize:16, padding:"14px",
            borderRadius:10, textDecoration:"none", textAlign:"center",
          }}>📞 (562) 235-0298</a>
        </div>
      )}

      <style>{`
        @media(max-width:768px){.hide-mobile{display:none!important}}
        @media(min-width:769px){.show-mobile{display:none!important}}
      `}</style>
    </>
  );
}
