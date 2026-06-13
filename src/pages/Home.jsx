import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));

    // Highlight today's hours row
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = days[new Date().getDay()];
    document.querySelectorAll(".hours-table tr").forEach((row) => {
      if (row.cells[0] && row.cells[0].textContent.trim() === today) {
        row.classList.add("today");
      }
    });

    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue:    #0A2A6E;
          --blue-mid:#1348B8;
          --blue-lt: #1E5ED8;
          --orange:  #F5A800;
          --orange-d:#D48900;
          --red:     #CC1111;
          --white:   #FFFFFF;
          --off:     #F4F7FC;
          --gray:    #687190;
          --dark:    #080F23;
          --card:    #111827;
          --ff-head: 'Barlow Condensed', sans-serif;
          --ff-body: 'Inter', sans-serif;
          --r:       10px;
          --r-lg:    18px;
          --shadow:  0 8px 40px rgba(0,0,0,.28);
        }

        html { scroll-behavior: smooth; }
        body { font-family: var(--ff-body); background: var(--dark); color: var(--white); overflow-x: hidden; }
        a { color: inherit; text-decoration: none; }
        img { display: block; max-width: 100%; }
        button { font-family: var(--ff-body); cursor: pointer; border: none; }

        .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
        .section    { padding: 80px 0; }
        .eyebrow    { font-family: var(--ff-head); font-size: 23px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--orange); margin-bottom: 12px; }
        .h1         { font-family: var(--ff-head); font-size: clamp(48px, 7vw, 88px); font-weight: 900; line-height: .95; text-transform: uppercase; }
        .h2         { font-family: var(--ff-head); font-size: clamp(36px, 5vw, 60px); font-weight: 800; line-height: 1; text-transform: uppercase; }
        .h3         { font-family: var(--ff-head); font-size: 22px; font-weight: 700; text-transform: uppercase; line-height: 1.1; }
        .tag        { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); border-radius: 99px; padding: 4px 14px; font-size: 12px; font-weight: 600; color: #CBD5F0; }

        /* TOPBAR */
        .topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: var(--blue); border-bottom: 3px solid var(--orange); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 66px; box-shadow: 0 4px 24px rgba(0,0,0,.4); }
        .topbar-brand { display: flex; align-items: center; gap: 10px; }
        .topbar-brand svg { width: 28px; height: 28px; }
        .topbar-brand span { font-family: var(--ff-head); font-weight: 800; font-size: 27px; letter-spacing: .03em; line-height: 1.2; }
        .topbar-brand small { display: block; font-size: 15px; font-weight: 500; color: var(--orange); letter-spacing: .08em; text-transform: uppercase; }
        .topbar-nav { display: flex; align-items: center; gap: 24px; }
        .topbar-nav a { font-size: 13px; font-weight: 600; letter-spacing: .04em; color: rgba(255,255,255,.8); transition: color .2s; }
        .topbar-nav a:hover { color: var(--orange); }
        .topbar-cta { background: var(--orange); color: var(--dark); border-radius: 6px; padding: 8px 18px; font-size: 13px; font-weight: 700; letter-spacing: .04em; display: flex; align-items: center; gap: 6px; white-space: nowrap; transition: background .2s, transform .1s; }
        .topbar-cta:hover { background: var(--orange-d); transform: scale(1.03); }

        /* HERO */
        .hero { min-height: 100vh; padding-top: 5px; position: relative; display: flex; align-items: center; overflow: hidden; background: linear-gradient(145deg, #050D1F 0%, #0A1A4A 55%, #0E2E6B 100%); }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, transparent 0px, transparent 18px, rgba(255,255,255,.018) 18px, rgba(255,255,255,.018) 19px); pointer-events: none; }
        .hero-word { position: absolute; right: -30px; bottom: -40px; font-family: var(--ff-head); font-size: clamp(180px, 24vw, 380px); font-weight: 900; line-height: 1; text-transform: uppercase; color: rgba(30,94,216,.14); pointer-events: none; user-select: none; letter-spacing: -.02em; }
        .hero-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 420px; gap: 48px; align-items: center; padding: 80px 0 60px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(245,168,0,.12); border: 1px solid rgba(245,168,0,.4); border-radius: 4px; padding: 6px 14px; margin-bottom: 20px; font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--orange); }
        .hero-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); animation: blink 1.4s ease-in-out infinite; display: inline-block; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .hero-title { margin-bottom: 16px; }
        .hero-title .accent { color: var(--orange); display: block; }
        .hero-sub { font-size: 16px; line-height: 1.65; color: #A4B4D8; max-width: 520px; margin-bottom: 32px; }
        .hero-cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }
        .btn-primary { display: inline-flex; align-items: center; gap: 10px; background: var(--orange); color: var(--dark); font-weight: 700; font-size: 16px; letter-spacing: .03em; padding: 16px 30px; border-radius: var(--r); box-shadow: 0 6px 28px rgba(245,168,0,.45); transition: all .2s; }
        .btn-primary:hover { background: var(--orange-d); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(245,168,0,.5); }
        .btn-secondary { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: var(--white); font-weight: 600; font-size: 15px; padding: 15px 28px; border-radius: var(--r); border: 2px solid rgba(255,255,255,.25); transition: all .2s; }
        .btn-secondary:hover { border-color: var(--orange); color: var(--orange); }
        .hero-trust { display: flex; gap: 28px; flex-wrap: wrap; }
        .hero-trust-item { display: flex; flex-direction: column; }
        .hero-trust-item .num { font-family: var(--ff-head); font-size: 28px; font-weight: 900; color: var(--white); line-height: 1; }
        .hero-trust-item .lbl { font-size: 11px; font-weight: 600; color: var(--gray); letter-spacing: .06em; text-transform: uppercase; margin-top: 2px; }
        .hero-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(14px); border-radius: var(--r-lg); padding: 28px; box-shadow: var(--shadow); }
        .hero-card-top { background: var(--blue); border-radius: var(--r); padding: 18px; margin-bottom: 18px; text-align: center; }
        .hero-card-top .big-num { font-family: var(--ff-head); font-size: 40px; font-weight: 900; color: var(--orange); }
        .hero-card-top p { font-size: 12px; color: rgba(255,255,255,.6); margin-top: 2px; }
        .stars { color: var(--orange); font-size: 18px; letter-spacing: 2px; margin-bottom: 4px; }
        .service-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .service-pill { background: rgba(19,72,184,.25); border: 1px solid rgba(19,72,184,.5); border-radius: 6px; padding: 6px 12px; font-size: 12px; font-weight: 600; color: #9BB4F0; white-space: nowrap; }
        .hero-card-divider { border-top: 1px solid rgba(255,255,255,.08); margin: 18px 0; }
        .hero-card-hours { font-size: 12px; color: rgba(255,255,255,.5); text-align: center; line-height: 1.7; }
        .hero-card-hours strong { color: var(--white); }
        .open-badge { display: inline-block; background: rgba(34,197,94,.15); border: 1px solid rgba(34,197,94,.4); color: #4ADE80; border-radius: 99px; padding: 3px 12px; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 10px; }

        /* TICKER */
        .ticker { background: var(--orange); overflow: hidden; padding: 10px 0; border-top: 2px solid var(--orange-d); }
        .ticker-track { display: flex; gap: 0; animation: ticker 28s linear infinite; width: max-content; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track span { font-family: var(--ff-head); font-size: 15px; font-weight: 800; color: var(--dark); text-transform: uppercase; letter-spacing: .06em; padding: 0 40px; white-space: nowrap; }
        .ticker-track span::after { content: ' ★ '; }

        /* ABOUT */
        .about { background: #080F23; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .about-img-wrap { position: relative; border-radius: var(--r-lg); overflow: hidden; aspect-ratio: 4/3; background: linear-gradient(135deg, #0A2A6E 0%, #1348B8 100%); display: flex; align-items: center; justify-content: center; }
        .about-img-placeholder { text-align: center; padding: 40px; }
        .about-img-placeholder svg { width: 100px; height: 100px; opacity: .6; margin: 0 auto 16px; display: block; }
        .about-img-placeholder p { font-size: 13px; color: rgba(255,255,255,.4); }
        .about-badge-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 24px 0; }
        .about-badge { display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: var(--r); padding: 16px 20px; min-width: 110px; text-align: center; }
        .about-badge .n { font-family: var(--ff-head); font-size: 32px; font-weight: 900; color: var(--orange); line-height: 1; }
        .about-badge .l { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.5); margin-top: 4px; text-transform: uppercase; letter-spacing: .06em; }
        .about-list { list-style: none; margin-top: 20px; }
        .about-list li { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.06); font-size: 14px; color: #A4B4D8; line-height: 1.5; }
        .about-list li:last-child { border: none; }
        .about-list li svg { flex-shrink: 0; margin-top: 2px; color: var(--orange); width: 18px; height: 18px; }
        .about-list strong { color: var(--white); }

        /* SERVICES */
        .services { background: linear-gradient(180deg, #080F23 0%, #0A1230 100%); }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
        .service-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: var(--r-lg); padding: 28px; transition: border-color .25s, background .25s, transform .25s; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--orange); transform: scaleX(0); transform-origin: left; transition: transform .3s; }
        .service-card:hover { border-color: rgba(245,168,0,.3); background: rgba(19,72,184,.12); transform: translateY(-4px); }
        .service-card:hover::before { transform: scaleX(1); }
        .service-icon { width: 48px; height: 48px; background: rgba(19,72,184,.25); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .service-icon svg { width: 24px; height: 24px; color: var(--orange); }
        .service-card .h3 { margin-bottom: 10px; font-size: 18px; }
        .service-card p { font-size: 13px; color: #8090B0; line-height: 1.65; }

        /* HOW IT WORKS */
        .how { background: #060C1C; }
        .how-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-top: 52px; position: relative; }
        .how-steps::before { content: ''; position: absolute; top: 28px; left: 10%; right: 10%; height: 2px; background: linear-gradient(90deg, var(--blue-mid), var(--orange)); z-index: 0; }
        .how-step { position: relative; z-index: 1; text-align: center; padding: 0 12px; }
        .how-step-num { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-family: var(--ff-head); font-size: 22px; font-weight: 900; background: var(--blue); border: 3px solid var(--orange); color: var(--orange); box-shadow: 0 0 0 6px rgba(245,168,0,.1); }
        .how-step .h3 { font-size: 14px; margin-bottom: 8px; }
        .how-step p { font-size: 12px; color: #6070A0; line-height: 1.6; }

        /* PRIUS */
        .prius { background: linear-gradient(135deg, #0A2A6E 0%, #0E1E50 50%, #050B1A 100%); position: relative; overflow: hidden; }
        .prius::after { content: 'PRIUS'; position: absolute; right: -60px; bottom: -80px; font-family: var(--ff-head); font-weight: 900; font-size: clamp(140px, 20vw, 300px); color: rgba(255,255,255,.04); pointer-events: none; user-select: none; }
        .prius-inner { position: relative; z-index: 1; }
        .prius-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .prius-list { list-style: none; margin-top: 24px; }
        .prius-list li { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.07); font-size: 15px; color: #B0C2E0; }
        .prius-list li:last-child { border: none; }
        .prius-list li svg { width: 20px; height: 20px; color: var(--orange); flex-shrink: 0; }
        .prius-box { background: rgba(255,255,255,.04); border: 1px solid rgba(245,168,0,.25); border-radius: var(--r-lg); padding: 32px; }
        .prius-box-title { font-family: var(--ff-head); font-size: 28px; font-weight: 800; text-transform: uppercase; margin-bottom: 20px; }
        .prius-price-row { display: flex; align-items: baseline; gap: 8px; margin: 16px 0; }
        .prius-price-row .from { font-size: 13px; color: var(--gray); }
        .prius-price-row .price { font-family: var(--ff-head); font-size: 52px; font-weight: 900; color: var(--orange); line-height: 1; }
        .prius-features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .prius-feature { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #8090B0; }
        .prius-feature::before { content: '✓'; color: var(--orange); font-weight: 700; }

        /* TESTIMONIALS */
        .testimonials { background: #080F23; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
        .testimonial-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: var(--r-lg); padding: 28px; }
        .testimonial-stars { color: var(--orange); font-size: 14px; letter-spacing: 2px; margin-bottom: 14px; }
        .testimonial-text { font-size: 14px; color: #9BB0D0; line-height: 1.7; font-style: italic; margin-bottom: 20px; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--blue-mid), var(--orange)); display: flex; align-items: center; justify-content: center; font-family: var(--ff-head); font-size: 18px; font-weight: 800; color: var(--white); flex-shrink: 0; }
        .testimonial-author .tname { font-size: 14px; font-weight: 700; color: var(--white); }
        .testimonial-author .tmeta { font-size: 11px; color: var(--gray); margin-top: 2px; }

        /* TRUST */
        .trust { background: var(--blue); padding: 40px 0; }
        .trust-row { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
        .trust-item { display: flex; align-items: center; gap: 12px; }
        .trust-item svg { width: 32px; height: 32px; color: var(--orange); flex-shrink: 0; }
        .trust-item .tl { font-family: var(--ff-head); font-size: 16px; font-weight: 800; text-transform: uppercase; }
        .trust-item .ts { font-size: 11px; color: rgba(255,255,255,.55); }

        /* CTA BAND */
        .ctaband { background: linear-gradient(135deg, var(--orange) 0%, #FF8C00 100%); padding: 72px 0; text-align: center; position: relative; overflow: hidden; }
        .ctaband::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(-45deg, transparent 0px, transparent 14px, rgba(0,0,0,.05) 14px, rgba(0,0,0,.05) 15px); }
        .ctaband > .container { position: relative; z-index: 1; }
        .ctaband .h2 { color: var(--dark); margin-bottom: 8px; }
        .ctaband .ctaband-p { color: rgba(0,0,0,.55); margin-bottom: 32px; font-size: 16px; }
        .btn-dark { display: inline-flex; align-items: center; gap: 10px; background: var(--dark); color: var(--white); font-weight: 700; font-size: 20px; padding: 18px 40px; border-radius: var(--r); box-shadow: 0 8px 32px rgba(0,0,0,.35); transition: all .2s; font-family: var(--ff-head); letter-spacing: .04em; text-transform: uppercase; }
        .btn-dark:hover { background: var(--blue); transform: translateY(-2px); }
        .ctaband-sub { font-size: 13px; color: rgba(0,0,0,.4); margin-top: 18px; }

        /* CONTACT */
        .contact { background: #060C1C; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .contact-info-list { list-style: none; margin-top: 24px; }
        .contact-info-list li { display: flex; align-items: flex-start; gap: 14px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
        .contact-info-list li:last-child { border: none; }
        .contact-info-list .icon { width: 40px; height: 40px; background: rgba(19,72,184,.25); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .contact-info-list .icon svg { width: 18px; height: 18px; color: var(--orange); }
        .contact-info-list .cl { font-size: 11px; color: var(--gray); text-transform: uppercase; letter-spacing: .07em; font-weight: 600; }
        .contact-info-list .cv { font-size: 15px; font-weight: 600; color: var(--white); margin-top: 2px; }
        .hours-table { width: 100%; margin-top: 24px; border-collapse: collapse; }
        .hours-table td { padding: 9px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,.05); }
        .hours-table td:first-child { color: rgba(255,255,255,.55); }
        .hours-table td:last-child { text-align: right; color: var(--white); font-weight: 600; }
        .hours-table .today td { color: var(--orange) !important; }
        .map-placeholder { height: 280px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: var(--r-lg); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; margin-top: 24px; overflow: hidden; }
        .map-placeholder iframe { width: 100%; height: 100%; border: none; border-radius: var(--r-lg); }

        /* FOOTER */
        .footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,.07); padding: 40px 0; text-align: center; }
        .footer-brand { font-family: var(--ff-head); font-size: 20px; font-weight: 800; text-transform: uppercase; margin-bottom: 8px; }
        .footer-brand span { color: var(--orange); }
        .footer p { font-size: 12px; color: var(--gray); }
        .footer-links { display: flex; justify-content: center; gap: 24px; margin: 16px 0; flex-wrap: wrap; }
        .footer-links a { font-size: 12px; color: var(--gray); transition: color .2s; }
        .footer-links a:hover { color: var(--orange); }

        /* FLOATING CALL */
        .float-call { position: fixed; bottom: 28px; right: 28px; z-index: 200; background: var(--orange); color: var(--dark); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(245,168,0,.5); animation: pulse-btn 2.5s ease-in-out infinite; transition: transform .2s; }
        .float-call:hover { transform: scale(1.12); }
        .float-call svg { width: 26px; height: 26px; }
        @keyframes pulse-btn { 0%,100%{box-shadow:0 8px 32px rgba(245,168,0,.5)} 50%{box-shadow:0 8px 48px rgba(245,168,0,.8), 0 0 0 12px rgba(245,168,0,.12)} }

        /* SCROLL REVEAL */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .55s ease, transform .55s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .topbar-nav { display: none; }
          .topbar-brand span { font-size: 14px; }
          .hero-inner { grid-template-columns: 1fr; }
          .hero-word { font-size: 140px; bottom: 0; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .how-steps { grid-template-columns: 1fr 1fr; gap: 28px; }
          .how-steps::before { display: none; }
          .how-steps .how-step:last-child { grid-column: span 2; }
          .prius-grid, .about-grid, .contact-grid, .testimonials-grid { grid-template-columns: 1fr; }
          .section { padding: 56px 0; }
          .trust-row { gap: 28px; }
        }

        @media (max-width: 600px) {
          .topbar { padding: 0 16px; }
          .topbar-cta { padding: 7px 12px; font-size: 12px; }
          .topbar-brand span { font-size: 13px; }
          .container { padding: 0 16px; }
          .services-grid { grid-template-columns: 1fr; }
          .how-steps { grid-template-columns: 1fr; }
          .how-steps .how-step:last-child { grid-column: span 1; }
          .hero-cta-row { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .hero-trust { gap: 16px; }
          .about-badge-row { justify-content: center; }
          .prius-features { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .btn-dark { font-size: 16px; padding: 15px 24px; }
          .trust-row { flex-direction: column; align-items: center; gap: 24px; }
          .footer-links { gap: 14px; }
          .section { padding: 48px 0; }
        }

        @media (max-width: 400px) {
          .hero-badge { font-size: 10px; padding: 5px 10px; }
          .topbar-brand small { display: none; }
          .about-badge-row { flex-direction: column; align-items: flex-start; }
          .hero-trust { flex-wrap: wrap; gap: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track, .float-call { animation: none; }
          .reveal { opacity: 1; transform: none; }
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <a href="#hero" className="topbar-brand">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#1348B8"/>
            <path d="M8 10h3v8H8zM13 10h3v8h-3zM7 10h10v2H7zM7 16h10v2H7z" fill="#F5A800"/>
            <path d="M10 8h8v2h-8z" fill="#F5A800" opacity=".6"/>
          </svg>
          <span>Prius Hybrid Battery<small>Auto Repair · Long Beach, CA</small></span>
        </a>
        <nav className="topbar-nav">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#prius">Hybrid Battery</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="tel:+15622350298" className="topbar-cta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          (562) 235-0298
        </a>
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-word">REPAIR</div>
        <div className="container">
          <div className="hero-inner">
            <div>
              <div className="hero-badge">
                <span className="dot"></span>
                {" "}5.0 Stars · 32 Reviews · Google Verified
              </div>
              <h1 className="h1 hero-title">
                Long Beach's<br/>
                <span className="accent">Prius &amp; Hybrid</span><br/>
                Battery Experts
              </h1>
              <p className="hero-sub">
                Specialized in Toyota Prius hybrid battery reconditioning, new &amp; used tire sales, brake service, oil changes, electrical diagnostics, and full auto repair — right here on East Anaheim St.
              </p>
              <div className="hero-cta-row">
                <a href="tel:+15622350298" className="btn-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Call (562) 235-0298
                </a>
                <a href="#services" className="btn-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  See All Services
                </a>
              </div>
              <div className="hero-trust">
                <div className="hero-trust-item"><span className="num">12+</span><span className="lbl">Years in Business</span></div>
                <div className="hero-trust-item"><span className="num">5.0★</span><span className="lbl">Google Rating</span></div>
                <div className="hero-trust-item"><span className="num">500+</span><span className="lbl">Prius Batteries</span></div>
                <div className="hero-trust-item"><span className="num">Same Day</span><span className="lbl">Service Available</span></div>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-top">
                <div className="stars">★★★★★</div>
                <div className="big-num">5.0 / 5</div>
                <p>32 verified Google reviews</p>
              </div>
              <div className="service-pills">
                <span className="service-pill">🔋 Hybrid Battery</span>
                <span className="service-pill">🛞 New Tires</span>
                <span className="service-pill">🛞 Used Tires</span>
                <span className="service-pill">🛑 Brakes</span>
                <span className="service-pill">🔧 Tune-Up</span>
                <span className="service-pill">⚡ Electrical</span>
                <span className="service-pill">🛢️ Oil Change</span>
                <span className="service-pill">📡 Diagnosis</span>
              </div>
              <div className="hero-card-divider"></div>
              <div className="hero-card-hours">
                <div className="open-badge">● Open Now</div><br/>
                <strong>Mon – Fri</strong>&nbsp;&nbsp;8:30 AM – 5:00 PM<br/>
                <strong>Saturday</strong>&nbsp;&nbsp;8:30 AM – 5:00 PM<br/>
                <strong>Sunday</strong>&nbsp;&nbsp;&nbsp;&nbsp;8:30 AM – 3:00 PM<br/><br/>
                <span style={{color:"#F5A800", fontWeight:600}}>1190 E Anaheim St, Long Beach CA 90813</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Prius Hybrid Battery</span>
          <span>New &amp; Used Tires</span>
          <span>Brake Service</span>
          <span>Oil Change</span>
          <span>Tune-Up</span>
          <span>Electrical</span>
          <span>Battery Service</span>
          <span>Shocks &amp; Suspension</span>
          <span>Diagnosis</span>
          <span>Long Beach CA</span>
          {/* duplicated for seamless loop */}
          <span>Prius Hybrid Battery</span>
          <span>New &amp; Used Tires</span>
          <span>Brake Service</span>
          <span>Oil Change</span>
          <span>Tune-Up</span>
          <span>Electrical</span>
          <span>Battery Service</span>
          <span>Shocks &amp; Suspension</span>
          <span>Diagnosis</span>
          <span>Long Beach CA</span>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-wrap">
              <div className="about-img-placeholder">
                {/* Replace with: <img src="your-shop-photo.jpg" alt="Prius Hybrid Battery shop exterior" /> */}
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="60" width="80" height="30" rx="4" fill="#1348B8" opacity=".7"/>
                  <rect x="20" y="30" width="60" height="35" rx="3" fill="#1E5ED8" opacity=".6"/>
                  <circle cx="30" cy="75" r="8" fill="#F5A800" opacity=".8"/>
                  <circle cx="70" cy="75" r="8" fill="#F5A800" opacity=".8"/>
                  <rect x="35" y="40" width="30" height="18" rx="2" fill="#F5A800" opacity=".4"/>
                </svg>
                <p>Place your shop photo here</p>
              </div>
            </div>

            <div className="reveal">
              <div className="eyebrow">About the Shop</div>
              <h2 className="h2" style={{marginBottom:16}}>
                Trusted Auto Repair<br/><span style={{color:"var(--orange)"}}>Since Day One</span>
              </h2>
              <p style={{color:"#8090B0", fontSize:15, lineHeight:1.7, marginBottom:24}}>
                Located at 1190 E Anaheim St in Long Beach, we specialize in Toyota Prius hybrid battery systems — from full reconditioning to new module replacements. We're also your neighborhood one-stop shop for tires, brakes, oil changes, and electrical work.
              </p>
              <div className="about-badge-row">
                <div className="about-badge"><span className="n">5.0</span><span className="l">Google Stars</span></div>
                <div className="about-badge"><span className="n">500+</span><span className="l">Batteries</span></div>
                <div className="about-badge"><span className="n">Same</span><span className="l">Day Service</span></div>
              </div>
              <ul className="about-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <div><strong>Prius Hybrid Specialists</strong> — Toyota-trained technicians who know hybrid systems inside and out.</div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <div><strong>Upfront Pricing</strong> — You get a clear quote before any work begins. No surprise fees.</div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <div><strong>New &amp; Used Tires</strong> — Huge selection of stacked tires at competitive prices with sizes marked on each one.</div>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <div><strong>Full Auto Repair</strong> — Brakes, tune-up, oil change, shocks, battery service, and electrical diagnostics.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services section" id="services">
        <div className="container">
          <div className="reveal" style={{textAlign:"center", maxWidth:600, margin:"0 auto"}}>
            <div className="eyebrow">What We Do</div>
            <h2 className="h2">Complete Auto Services<br/><span style={{color:"var(--orange)"}}>One Location</span></h2>
          </div>
          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="10" width="18" height="7" rx="2"/><line x1="7" y1="10" x2="7" y2="7"/><line x1="17" y1="10" x2="17" y2="7"/><line x1="7" y1="7" x2="17" y2="7"/>
                </svg>
              </div>
              <h3 className="h3">Prius Hybrid Battery</h3>
              <p>New, used, and reconditioned Toyota Prius hybrid battery systems. Diagnostic testing, module replacement, and full pack reconditioning by certified technicians.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="h3">New &amp; Used Tires</h3>
              <p>Massive selection of new and used tires with sizes marked on each. We install, balance, and rotate all tire brands. Budget-friendly options always available.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h-2M6 12H4M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 4V2M12 22v-2"/>
                </svg>
              </div>
              <h3 className="h3">Brake Service</h3>
              <p>Pad replacement, rotor resurfacing, caliper repair, and brake fluid flush. We make sure your vehicle stops safely every time. Safety inspection included.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="h3">Electrical &amp; Diagnosis</h3>
              <p>Check engine light, battery service, alternator, starter, wiring faults. Full computer diagnostic scan to pinpoint the exact problem before any repair.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v10l4 4M12 22a10 10 0 110-20 10 10 0 010 20z"/>
                </svg>
              </div>
              <h3 className="h3">Oil Change &amp; Tune-Up</h3>
              <p>Full synthetic and conventional oil changes with filter replacement. Spark plugs, air filters, fluid top-ups, and a multi-point inspection to keep you running smooth.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="h3">Shocks &amp; Suspension</h3>
              <p>Worn shocks and struts affect handling and tire wear. We diagnose and replace suspension components to restore ride comfort and vehicle stability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how section" id="how">
        <div className="container">
          <div className="reveal" style={{textAlign:"center", maxWidth:600, margin:"0 auto"}}>
            <div className="eyebrow">The Process</div>
            <h2 className="h2">How It Works</h2>
            <p style={{color:"#6070A0", marginTop:12, fontSize:15}}>Getting your car repaired is simple. Here's what to expect.</p>
          </div>
          <div className="how-steps">
            <div className="how-step reveal">
              <div className="how-step-num">1</div>
              <h3 className="h3">Call or Visit</h3>
              <p>Call (562) 235-0298 or drive to 1190 E Anaheim St. A real person answers — no menus or hold music.</p>
            </div>
            <div className="how-step reveal">
              <div className="how-step-num">2</div>
              <h3 className="h3">Describe the Problem</h3>
              <p>Tell us what's wrong. Our technician asks a few quick questions to understand the issue.</p>
            </div>
            <div className="how-step reveal">
              <div className="how-step-num">3</div>
              <h3 className="h3">Free Diagnosis</h3>
              <p>We run a full diagnostic scan and inspect your vehicle. No guesswork — we pinpoint the issue.</p>
            </div>
            <div className="how-step reveal">
              <div className="how-step-num">4</div>
              <h3 className="h3">Upfront Quote</h3>
              <p>You get a clear, itemized price before any work starts. Approve it, and we get to work.</p>
            </div>
            <div className="how-step reveal">
              <div className="how-step-num">5</div>
              <h3 className="h3">Drive Away Fixed</h3>
              <p>Most repairs are completed same-day. If we can't fix it, you don't pay — guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIUS SPECIAL ── */}
      <section className="prius section" id="prius">
        <div className="container prius-inner">
          <div className="prius-grid">
            <div className="reveal">
              <div className="eyebrow">Specialist Service</div>
              <h2 className="h2">
                Toyota Prius<br/><span style={{color:"var(--orange)"}}>Hybrid Battery</span><br/>System LB
              </h2>
              <p style={{color:"#8090B0", marginTop:16, fontSize:15, lineHeight:1.7}}>
                We are Long Beach's dedicated Prius hybrid battery service center. Whether your battery needs reconditioning, individual module replacement, or a complete pack swap — we've done it hundreds of times.
              </p>
              <ul className="prius-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Hybrid battery diagnostic scan (all Prius generations)
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Individual module replacement — fix only what's bad
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Full pack reconditioning with capacity testing
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  New OEM and aftermarket battery packs in stock
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Cooling fan cleaning and inverter inspection
                </li>
              </ul>
              <a href="tel:+15622350298" className="btn-primary" style={{marginTop:28, width:"fit-content"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Book a Battery Check
              </a>
            </div>

            <div className="prius-box reveal">
              <div className="prius-box-title">Battery Services</div>
              <div style={{borderBottom:"1px solid rgba(255,255,255,.08)", paddingBottom:20, marginBottom:20}}>
                <div style={{fontSize:12, color:"var(--gray)", textTransform:"uppercase", letterSpacing:".07em", fontWeight:600, marginBottom:6}}>Reconditioning</div>
                <div className="prius-price-row">
                  <span className="from">starting from</span>
                  <span className="price">$299</span>
                </div>
                <div className="prius-features">
                  <span className="prius-feature">Full capacity test</span>
                  <span className="prius-feature">Module balancing</span>
                  <span className="prius-feature">Fan cleaning</span>
                  <span className="prius-feature">90-day warranty</span>
                </div>
              </div>
              <div style={{borderBottom:"1px solid rgba(255,255,255,.08)", paddingBottom:20, marginBottom:20}}>
                <div style={{fontSize:12, color:"var(--gray)", textTransform:"uppercase", letterSpacing:".07em", fontWeight:600, marginBottom:6}}>New Battery Pack</div>
                <div className="prius-price-row">
                  <span className="from">starting from</span>
                  <span className="price">$799</span>
                </div>
                <div className="prius-features">
                  <span className="prius-feature">OEM &amp; aftermarket</span>
                  <span className="prius-feature">Gen 2 / 3 / 4 / 5</span>
                  <span className="prius-feature">Labor included</span>
                  <span className="prius-feature">1-year warranty</span>
                </div>
              </div>
              <div style={{background:"rgba(245,168,0,.08)", border:"1px solid rgba(245,168,0,.25)", borderRadius:8, padding:14, textAlign:"center", fontSize:13, color:"rgba(255,255,255,.7)"}}>
                💡 Free hybrid battery diagnostic with any service appointment. Call to schedule.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials section" id="reviews">
        <div className="container">
          <div className="reveal" style={{textAlign:"center", maxWidth:560, margin:"0 auto"}}>
            <div className="eyebrow">What Customers Say</div>
            <h2 className="h2">5-Star Reviews<br/><span style={{color:"var(--orange)"}}>From Real Drivers</span></h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"They replaced my Prius hybrid battery for a fraction of the dealer price. The car runs better than ever. Quick, honest, and great value. Will not go anywhere else."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">M</div>
                <div>
                  <div className="tname">Maria S.</div>
                  <div className="tmeta">Toyota Prius owner · Long Beach</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Got four used tires mounted same day for a great price. The prices on each tire are written in chalk — very transparent. Friendly crew, fast service."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">J</div>
                <div>
                  <div className="tname">James R.</div>
                  <div className="tmeta">Verified Google Review</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Brought my 2012 Prius in with the red triangle warning. They diagnosed the battery issue in 20 minutes and fixed it same day. Saved me $3,000 compared to the Toyota dealer."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">K</div>
                <div>
                  <div className="tname">Kevin T.</div>
                  <div className="tmeta">Prius Gen 3 · Verified Review</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{textAlign:"center", marginTop:36, display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", alignItems:"center"}}>
            <div className="tag">⭐ 5.0 Average on Google</div>
            <div className="tag">💬 32 Verified Reviews</div>
            <div className="tag">🏆 Trusted Since Opening</div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust">
        <div className="container">
          <div className="trust-row">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div><div className="tl">Licensed &amp; Insured</div><div className="ts">Fully certified California shop</div></div>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <div><div className="tl">Same-Day Service</div><div className="ts">Most repairs done in one visit</div></div>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
              <div><div className="tl">Upfront Pricing</div><div className="ts">Quote before work starts</div></div>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <div><div className="tl">No Fix, No Fee</div><div className="ts">100% satisfaction guarantee</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA BAND ── */}
      <section className="ctaband">
        <div className="container">
          <div className="eyebrow" style={{color:"rgba(0,0,0,.45)"}}>Ready to Get Fixed?</div>
          <h2 className="h2">Call Us Right Now</h2>
          <p className="ctaband-p">Real technicians. Same-day availability. Long Beach's trusted auto repair shop.</p>
          <a href="tel:+15622350298" className="btn-dark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            (562) 235-0298
          </a>
          <p className="ctaband-sub">Mon–Fri 8:30AM–5PM · Sat 8:30AM–5PM · Sun 8:30AM–3PM · 1190 E Anaheim St, Long Beach</p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact section" id="contact">
        <div className="container">
          <div className="reveal" style={{textAlign:"center", maxWidth:540, margin:"0 auto 52px"}}>
            <div className="eyebrow">Find Us</div>
            <h2 className="h2">Visit the Shop</h2>
          </div>
          <div className="contact-grid">
            <div className="reveal">
              <ul className="contact-info-list">
                <li>
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cl">Phone</div>
                    <div className="cv"><a href="tel:+15622350298" style={{color:"var(--orange)"}}>(562) 235-0298</a></div>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cl">Address</div>
                    <div className="cv">1190 E Anaheim St<br/>Long Beach, CA 90813</div>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cl">Website</div>
                    <div className="cv">
                      <a href="http://priushybridbatteryautorepair.com" target="_blank" rel="noreferrer" style={{color:"var(--orange)"}}>
                        priushybridbatteryautorepair.com
                      </a>
                    </div>
                  </div>
                </li>
              </ul>

              <div style={{marginTop:8}}>
                <div style={{fontSize:12, fontWeight:700, color:"var(--gray)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:12}}>Business Hours</div>
                <table className="hours-table">
                  <tbody>
                    <tr><td>Monday</td><td>8:30 AM – 5:00 PM</td></tr>
                    <tr><td>Tuesday</td><td>8:30 AM – 5:00 PM</td></tr>
                    <tr><td>Wednesday</td><td>8:30 AM – 5:00 PM</td></tr>
                    <tr><td>Thursday</td><td>8:30 AM – 5:00 PM</td></tr>
                    <tr><td>Friday</td><td>8:30 AM – 5:00 PM</td></tr>
                    <tr><td>Saturday</td><td>8:30 AM – 5:00 PM</td></tr>
                    <tr><td>Sunday</td><td>8:30 AM – 3:00 PM</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="reveal">
              <div className="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.62!2d-118.1718!3d33.7917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd31ed9bdd1ed5%3A0x6f24b8891ef6b0d1!2s1190%20E%20Anaheim%20St%2C%20Long%20Beach%2C%20CA%2090813!5e0!3m2!1sen!2sus!4v1700000000000"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prius Hybrid Battery Auto Repair on Google Maps"
                />
              </div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:16}}>
                <a
                  href="https://maps.google.com/?q=1190+E+Anaheim+St+Long+Beach+CA"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{justifyContent:"center", fontSize:13, padding:12}}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Get Directions
                </a>
                <a href="tel:+15622350298" className="btn-primary" style={{justifyContent:"center", fontSize:13, padding:12}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">Prius Hybrid Battery &amp; <span>Auto Repair</span></div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#prius">Hybrid Battery</a>
            <a href="#how">How It Works</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </div>
          <p>1190 E Anaheim St, Long Beach, CA 90813 &nbsp;·&nbsp; (562) 235-0298</p>
          <p style={{marginTop:8}}>© 2025 Prius Hybrid Battery Auto Repair. All rights reserved.</p>
        </div>
      </footer>

      {/* ── FLOATING CALL BUTTON ── */}
      <a href="tel:+15622350298" className="float-call" title="Call us now" aria-label="Call (562) 235-0298">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </a>
    </>
  );
}
