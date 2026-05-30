import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Hero3D, HeroFloatCard } from '@/components/Hero3D';
import { MapPin, Clock, Phone, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { Gallery } from '@/components/Gallery';

// ── Design tokens ─────────────────────────────────────
const GLASS     = 'rgba(255,255,255,0.07)';
const GLASS_MED = 'rgba(255,255,255,0.11)';
const GLASS_LO  = 'rgba(255,255,255,0.04)';
const BORDER    = 'rgba(255,255,255,0.10)';
const BORDER_LT = 'rgba(255,255,255,0.19)';
const TEXT      = '#f2f2f7';
const TEXT_DIM  = 'rgba(242,242,247,0.56)';
const TEXT_FAINT = 'rgba(242,242,247,0.30)';
const GOLD      = '#d4a843';
const GOLD_DIM  = 'rgba(212,168,67,0.45)';

type CP = React.CSSProperties;
const gls = (bg = GLASS, br = BORDER, extra: CP = {}): CP => ({
  background: bg,
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: `1px solid ${br}`,
  ...extra,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: 'easeOut' } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export default function Home() {
  const heroRef    = useRef<HTMLElement>(null);
  const targetRef  = useRef({ rx: 0, ry: 0, mx: 0, my: 0 });
  const currentRef = useRef({ rx: 0, ry: 0, mx: 0, my: 0 });
  const frameRef   = useRef<number>(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 0, my: 0 });

  const onHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    targetRef.current = { rx: -ny * 8, ry: nx * 8, mx: nx * 18, my: ny * 10 };
  }, []);

  const onHeroMouseLeave = useCallback(() => {
    targetRef.current = { rx: 0, ry: 0, mx: 0, my: 0 };
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const c = currentRef.current; const t = targetRef.current;
      const n = { rx: lerp(c.rx,t.rx,.06), ry: lerp(c.ry,t.ry,.06), mx: lerp(c.mx,t.mx,.06), my: lerp(c.my,t.my,.06) };
      currentRef.current = n; setTilt({ ...n });
      frameRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#03030a', color: TEXT, position: 'relative', overflowX: 'hidden' }}>

      {/* ── AMBIENT GLOWS (fixed behind everything) ── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(100,55,220,0.13) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '55vw', height: '55vw', background: 'radial-gradient(circle, rgba(200,125,35,0.09) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '8%', width: '32vw', height: '32vw', background: 'radial-gradient(circle, rgba(40,90,210,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      {/* ── FLOATING GLASS PILL NAV ── */}
      <nav style={{
        position: 'fixed', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 24, padding: '9px 18px 9px 22px',
        borderRadius: 100, whiteSpace: 'nowrap',
        ...gls(GLASS_MED, BORDER_LT),
        boxShadow: '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        <span style={{ fontFamily: 'Georgia,serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', color: GOLD }}>
          THE ESTATE CAFE
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['Our Story','our-story'],['Menu','menu'],['Experience','experience'],['Visit','visit']].map(([l,id]) => (
            <a key={id} href={`#${id}`}
              style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = TEXT_DIM)}
            >{l}</a>
          ))}
        </div>
        <a href="#visit"
          style={{ ...gls(GLASS, BORDER_LT), fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 15px', borderRadius: 100, color: TEXT, textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = GLASS_MED; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = GLASS; }}
        >Reserve</a>
      </nav>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', perspective: '900px', zIndex: 1 }}
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
      >
        <Hero3D />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 880, padding: '0 24px', paddingTop: 'clamp(70px,10vh,90px)' }}>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            style={{ ...gls(GLASS_LO, 'rgba(212,168,67,0.28)'), display: 'inline-block', fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, padding: '5px 16px', borderRadius: 100, marginBottom: 20 }}
          >
            Chikkamagaluru, Karnataka
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.4 }}
            style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.9rem,4.5vw,3.4rem)', lineHeight: 1.15, color: TEXT, fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 16px' }}
          >
            A Slow Breath in<br />the Coffee Hills
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ ...gls(GLASS_LO, 'rgba(255,255,255,0.07)'), fontSize: 13, color: TEXT_DIM, lineHeight: 1.75, maxWidth: 440, padding: '10px 20px', borderRadius: 14, margin: '0 0 20px' }}
          >
            Honest Malnad food and estate-grown filter coffee, served in a restored planter's bungalow surrounded by mist and sprawling greenery.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <a href="#menu"
              style={{ ...gls(GLASS_MED, BORDER_LT), display: 'inline-block', fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', padding: '11px 30px', borderRadius: 100, color: TEXT, textDecoration: 'none', transition: 'background 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.17)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = GLASS_MED; }}
            >
              Discover the Menu
            </a>
          </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 20, marginTop: '1vh', flexShrink: 0 }}>
          <HeroFloatCard tiltRx={tilt.rx} tiltRy={tilt.ry} tiltMx={tilt.mx} tiltMy={tilt.my} />
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="our-story" style={{ position: 'relative', zIndex: 1, padding: '7rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            <div style={{ ...gls(), borderRadius: 28, padding: 'clamp(2rem,4vw,4rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden' }}>
                <img src="/images/hills-panorama.png" alt="Chikkamagaluru hills"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82) contrast(1.05)', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,3,10,0.35) 0%, transparent 35%, rgba(3,3,10,0.25) 100%)', pointerEvents: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD }}>Our Heritage</span>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,4vw,3rem)', color: TEXT, fontWeight: 500, lineHeight: 1.2, margin: 0 }}>Born from<br />the Estate.</h2>
                <div style={{ height: 1, width: 48, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT_DIM, margin: 0 }}>
                  The Estate Cafe wasn't built; it was restored. Originally a 19th-century planter's bungalow, we've kept the timber ceilings, the wide verandas, and the unhurried pace of estate life.
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT_DIM, margin: 0 }}>
                  Our coffee is grown on the very hills you look out upon — roasted in small batches, brewed the traditional way. Our food draws from generations of Malnad heritage: spice-rich, earthy, and deeply comforting.
                </p>
                <a href="#experience"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none' }}
                >Our Philosophy <ArrowRight size={12} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{ position: 'relative', zIndex: 1, padding: '2rem 2rem 7rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <span style={{ fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 14 }}>Provisions</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,4vw,3rem)', color: TEXT, fontWeight: 500, margin: 0 }}>From the Kitchen</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}
          >
            {[
              { img: '/images/filter-coffee.png',  tag: 'Signature Brew', title: 'Estate Filter Coffee', desc: 'Arabica & Peaberry blend grown at 4000ft, roasted over wood-fire, brewed in a traditional brass dabara set.',    price: '₹ 250' },
              { img: '/images/menu-breakfast.png', tag: 'Morning Staple',  title: 'Malnad Breakfast',     desc: 'Soft akki rottis pressed on banana leaves, seasonal bamboo shoot curry, and fresh coconut chutney.',         price: '₹ 450' },
              { img: '/images/menu-dinner.png',    tag: 'Evening Feast',   title: 'Estate Dinner',        desc: 'Free-range pepper chicken roasted with estate vines, curry leaves, and cold-pressed coconut oil.',         price: '₹ 650' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ ...gls(), borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'background 0.3s, border-color 0.3s', cursor: 'default' }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = GLASS_MED; d.style.borderColor = BORDER_LT; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = GLASS; d.style.borderColor = BORDER; }}
              >
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) saturate(1.1)', transition: 'transform 0.6s ease', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '1.4rem 1.6rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontSize: 8, letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD }}>{item.tag}</span>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: TEXT, fontWeight: 500, margin: 0 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: TEXT_DIM, margin: 0, flex: 1 }}>{item.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 13, color: GOLD }}>{item.price}</span>
                    <ArrowRight size={13} style={{ color: TEXT_FAINT }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              style={{ ...gls(GLASS, BORDER_LT), fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '11px 32px', borderRadius: 100, color: TEXT, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GLASS_MED; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = GLASS; }}
            >View Full Menu</button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <Gallery />

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ position: 'relative', zIndex: 1, padding: '7rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2rem', alignItems: 'stretch' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{ ...gls(), borderRadius: 24, padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, ${GOLD_DIM} 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <span style={{ fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD }}>The Atmosphere</span>
              <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: TEXT, fontWeight: 500, lineHeight: 1.2, margin: 0 }}>Time moves<br />slower here.</h2>
              <div style={{ height: 1, width: 40, background: GOLD }} />
              <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT_DIM, margin: 0 }}>
                We don't do quick turnarounds. When you claim a table on the veranda, it's yours. Read a book, watch the mist roll over the valley, or simply listen to the rain on the terracotta tiles.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: TEXT_DIM, margin: 0 }}>
                Warm amber lamps, weathered teakwood, and the constant, comforting scent of roasting coffee and damp earth.
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ ...gls(), borderRadius: 24, overflow: 'hidden', minHeight: 320 }}
          >
            <img src="/images/estate-mist.png" alt="Estate in the mist"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.05)', display: 'block' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 2rem 5rem' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          style={{ maxWidth: 900, margin: '0 auto', ...gls(), borderRadius: 20, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}
        >
          {[
            { num: '19th', label: 'Century Bungalow' },
            { num: '4000', label: 'ft above sea level' },
            { num: '100%', label: 'Estate-grown coffee' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.2rem 1rem', textAlign: 'center', borderRight: i < 2 ? `1px solid ${BORDER}` : 'none' }}
            >
              <span style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: GOLD, fontWeight: 500, marginBottom: 6 }}>{s.num}</span>
              <span style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: TEXT_FAINT }}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── VISIT ── */}
      <section id="visit" style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem 7rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <span style={{ fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 14 }}>Find Us</span>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,4vw,3rem)', color: TEXT, fontWeight: 500, margin: '0 0 14px' }}>Plan Your Visit</h2>
            <p style={{ fontSize: 14, color: TEXT_DIM, maxWidth: 440, margin: '0 auto' }}>
              We highly recommend reserving a table, especially for weekend visits and larger groups.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: '2.5rem' }}
          >
            {[
              { icon: <MapPin size={17} />, title: 'Location', lines: ['Kaimara Post, Chikmagalur','Karnataka 577101'] },
              { icon: <Clock size={17} />,  title: 'Hours',    lines: ['Wed – Mon: 8 AM – 8 PM','Tuesday: Closed'] },
              { icon: <Phone size={17} />,  title: 'Contact',  lines: ['+91 98765 43210','hello@estatecafe.in'] },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ ...gls(), borderRadius: 20, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, transition: 'background 0.3s, border-color 0.3s' }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = GLASS_MED; d.style.borderColor = BORDER_LT; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = GLASS; d.style.borderColor = BORDER; }}
              >
                <div style={{ ...gls(GLASS_MED, BORDER_LT), width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 16, color: TEXT, fontWeight: 500, margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.75, margin: 0 }}>
                  {item.lines.map((l, j) => <React.Fragment key={j}>{l}{j < item.lines.length - 1 && <br />}</React.Fragment>)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center' }}>
            <a href="#visit"
              style={{ ...gls('rgba(212,168,67,0.12)', 'rgba(212,168,67,0.38)'), display: 'inline-block', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', padding: '13px 40px', borderRadius: 100, color: GOLD, textDecoration: 'none', fontWeight: 600, transition: 'background 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,168,67,0.22)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,168,67,0.12)'; }}
            >Reserve a Table</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '2rem 2rem', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', color: GOLD, marginBottom: 4 }}>THE ESTATE CAFE</div>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEXT_FAINT }}>Chikkamagaluru, Karnataka</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {([<Instagram size={15} key="ig" />, <Facebook size={15} key="fb" />, <Twitter size={15} key="tw" />]).map((icon, i) => (
              <a key={i} href="#"
                style={{ ...gls(GLASS, BORDER), width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_DIM, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = TEXT; a.style.background = GLASS_MED; }}
                onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = TEXT_DIM; a.style.background = GLASS; }}
              >{icon}</a>
            ))}
          </div>
          <div style={{ fontSize: 11, color: TEXT_FAINT }}>© {new Date().getFullYear()} The Estate Cafe. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
