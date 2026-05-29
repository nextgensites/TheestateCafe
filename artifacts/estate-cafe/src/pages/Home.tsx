import React from 'react';
import { motion } from 'framer-motion';
import { Hero3D } from '@/components/Hero3D';
import { MapPin, Clock, Phone, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const GOLD = '#c9922a';
const GOLD_LIGHT = '#e8b84b';
const GOLD_DIM = '#9a6e1f';

export default function Home() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#080808', color: '#e8dcc8' }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)', backdropFilter: 'blur(2px)' }}
      >
        <div className="font-serif text-xl font-bold tracking-[0.18em]" style={{ color: GOLD }}>
          THE ESTATE CAFE
        </div>
        <div className="hidden md:flex gap-8 text-xs font-medium tracking-[0.2em] uppercase" style={{ color: 'rgba(232,220,200,0.7)' }}>
          {['Our Story', 'Menu', 'Experience', 'Visit'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}
              className="hover:opacity-100 transition-opacity"
              style={{ color: 'rgba(232,220,200,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD_LIGHT)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,220,200,0.7)')}
            >{l}</a>
          ))}
        </div>
        <button
          className="hidden md:block text-xs tracking-[0.25em] uppercase px-6 py-3 transition-all duration-300"
          style={{ border: `1px solid ${GOLD_DIM}`, color: GOLD, background: 'transparent' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
        >
          Reserve
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="block text-xs uppercase mb-6 font-light"
            style={{ color: GOLD }}
          >
            Chikkamagaluru, Karnataka
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.4, ease: 'easeOut' }}
            className="font-serif font-medium mb-8"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1.1, color: '#f5ecd8', letterSpacing: '-0.01em' }}
          >
            A Slow Breath in<br />the Coffee Hills
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            className="text-base md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'rgba(232,220,200,0.65)' }}
          >
            Honest Malnad food and estate-grown filter coffee, served in a restored planter's bungalow surrounded by mist and sprawling greenery.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <a
              href="#menu"
              className="inline-block text-xs tracking-[0.28em] uppercase px-10 py-4 transition-all duration-300"
              style={{ background: GOLD, color: '#080808', fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget.style.background = GOLD_LIGHT)}
              onMouseLeave={e => (e.currentTarget.style.background = GOLD)}
            >
              Discover the Menu
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ color: 'rgba(201,146,42,0.45)' }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(201,146,42,0.5), transparent)' }} />
        </motion.div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div className="flex items-center justify-center gap-5 py-10" style={{ background: '#0d0d0d' }}>
        <div className="h-px flex-1 max-w-xs" style={{ background: `linear-gradient(to right, transparent, ${GOLD_DIM})` }} />
        <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
        <div className="w-1 h-1 rotate-45" style={{ background: GOLD_DIM }} />
        <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
        <div className="h-px flex-1 max-w-xs" style={{ background: `linear-gradient(to left, transparent, ${GOLD_DIM})` }} />
      </div>

      {/* ── OUR STORY ── */}
      <section id="our-story" style={{ background: '#0d0d0d', padding: '7rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="relative aspect-[4/5] w-full"
          >
            <img src="/images/hills-panorama.png" alt="Chikkamagaluru hills" className="w-full h-full object-cover" style={{ filter: 'brightness(0.88) contrast(1.05)' }} />
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8" style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            <div className="absolute bottom-0 right-0 w-8 h-8" style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] mb-4 font-light" style={{ color: GOLD }}>Our Heritage</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-5 font-medium leading-tight" style={{ color: '#f5ecd8' }}>Born from<br />the Estate.</h2>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-12" style={{ background: GOLD }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
            </div>
            <p className="text-base leading-relaxed mb-5 font-light" style={{ color: 'rgba(232,220,200,0.65)' }}>
              The Estate Cafe wasn't built; it was restored. Originally a 19th-century planter's bungalow, we've kept the timber ceilings, the wide verandas, and the unhurried pace of estate life.
            </p>
            <p className="text-base leading-relaxed mb-10 font-light" style={{ color: 'rgba(232,220,200,0.65)' }}>
              Our coffee is grown on the very hills you look out upon — roasted in small batches, brewed the traditional way. Our food draws from generations of Malnad heritage: spice-rich, earthy, and deeply comforting.
            </p>
            <a href="#experience" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              style={{ color: GOLD }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD_LIGHT)}
              onMouseLeave={e => (e.currentTarget.style.color = GOLD)}
            >
              Our Philosophy <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div className="flex items-center justify-center gap-5 py-8" style={{ background: '#080808' }}>
        <div className="h-px flex-1 max-w-xs" style={{ background: `linear-gradient(to right, transparent, ${GOLD_DIM})` }} />
        <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
        <div className="w-1 h-1 rotate-45" style={{ background: GOLD_DIM }} />
        <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
        <div className="h-px flex-1 max-w-xs" style={{ background: `linear-gradient(to left, transparent, ${GOLD_DIM})` }} />
      </div>

      {/* ── MENU ── */}
      <section id="menu" style={{ background: '#080808', padding: '7rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] mb-4 block font-light" style={{ color: GOLD }}>Provisions</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6" style={{ color: '#f5ecd8' }}>From the Kitchen</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12" style={{ background: GOLD }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
              <div className="h-px w-12" style={{ background: GOLD }} />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                img: '/images/filter-coffee.png',
                tag: 'Signature Brew',
                title: 'Estate Filter Coffee',
                desc: 'Arabica & Peaberry blend grown at 4000ft, roasted over wood-fire, brewed in a traditional brass dabara set.',
                price: '₹ 250',
              },
              {
                img: null,
                tag: 'Morning Staple',
                title: 'Malnad Breakfast',
                desc: 'Soft akki rottis pressed on banana leaves, seasonal bamboo shoot curry, and fresh coconut chutney.',
                price: '₹ 450',
              },
              {
                img: null,
                tag: 'Evening Feast',
                title: 'Estate Dinner',
                desc: 'Free-range pepper chicken roasted with estate vines, curry leaves, and cold-pressed coconut oil.',
                price: '₹ 650',
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group relative flex flex-col overflow-hidden"
                style={{ background: '#111111', border: `1px solid #2a2010` }}
              >
                {/* Gold top line */}
                <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${GOLD_DIM}, ${GOLD})` }} />

                <div className="aspect-[4/3] overflow-hidden" style={{ background: '#1a1508' }}>
                  {item.img ? (
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: 'brightness(0.85) saturate(1.1)' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-8 h-8 rotate-45 mx-auto mb-4" style={{ border: `1px solid ${GOLD_DIM}` }} />
                        <p className="font-serif text-lg" style={{ color: 'rgba(201,146,42,0.6)' }}>{item.title}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] mb-3 font-light" style={{ color: GOLD_DIM }}>{item.tag}</span>
                  <h3 className="font-serif text-xl mb-3 font-medium" style={{ color: '#f0e4cc' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 flex-1 font-light" style={{ color: 'rgba(232,220,200,0.5)' }}>{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm" style={{ color: GOLD }}>{item.price}</span>
                    <div className="w-5 h-px" style={{ background: GOLD_DIM }} />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: `1px solid ${GOLD_DIM}`, borderRight: `1px solid ${GOLD_DIM}` }} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <button
              className="text-xs tracking-[0.28em] uppercase px-10 py-4 transition-all duration-300"
              style={{ border: `1px solid ${GOLD_DIM}`, color: GOLD, background: 'transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ background: '#0a0a0a', padding: '7rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <div className="p-10 md:p-12 relative" style={{ border: `1px solid #1e1608`, background: '#0e0e0e' }}>
              {/* Gold corner */}
              <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
              <div className="absolute bottom-0 right-0 w-6 h-6" style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />

              <span className="text-xs uppercase tracking-[0.3em] mb-4 block font-light" style={{ color: GOLD }}>The Atmosphere</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-5 leading-tight" style={{ color: '#f5ecd8' }}>Time moves<br />slower here.</h2>
              <div className="mb-6 h-px w-10" style={{ background: GOLD }} />
              <p className="text-sm leading-relaxed mb-5 font-light" style={{ color: 'rgba(232,220,200,0.6)' }}>
                We don't do quick turnarounds. When you claim a table on the veranda, it's yours. Read a book, watch the mist roll over the valley, or simply listen to the rain on the terracotta tiles.
              </p>
              <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(232,220,200,0.6)' }}>
                Warm amber lamps, weathered teakwood, and the constant, comforting scent of roasting coffee and damp earth.
              </p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="md:col-span-7 relative"
          >
            <div className="aspect-[16/10] w-full relative">
              <img src="/images/estate-mist.png" alt="Estate in the mist"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.82) contrast(1.05)' }}
              />
              <div className="absolute top-0 right-0 w-8 h-8" style={{ borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
              <div className="absolute bottom-0 left-0 w-8 h-8" style={{ borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div style={{ background: '#0d0900', borderTop: `1px solid #1e1608`, borderBottom: `1px solid #1e1608` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x" style={{ borderColor: '#1e1608' }}>
          {[
            { num: '19th', label: 'Century Bungalow' },
            { num: '4000', label: 'ft above sea level' },
            { num: '100%', label: 'Estate-grown coffee' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center py-10 px-6 text-center">
              <span className="font-serif text-3xl md:text-4xl font-medium mb-2" style={{ color: GOLD }}>{s.num}</span>
              <span className="text-xs uppercase tracking-[0.2em] font-light" style={{ color: 'rgba(232,220,200,0.45)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISIT ── */}
      <section id="visit" style={{ background: '#080808', padding: '7rem 1.5rem' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] mb-4 block font-light" style={{ color: GOLD }}>Find Us</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6" style={{ color: '#f5ecd8' }}>Plan Your Visit</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12" style={{ background: GOLD }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
              <div className="h-px w-12" style={{ background: GOLD }} />
            </div>
            <p className="text-base mt-8 font-light max-w-xl mx-auto" style={{ color: 'rgba(232,220,200,0.55)' }}>
              We highly recommend reserving a table, especially for weekend visits and larger groups.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="grid md:grid-cols-3 gap-6 mb-14"
          >
            {[
              { icon: <MapPin size={20} />, title: 'Location', lines: ['Kaimara Post, Chikmagalur', 'Karnataka 577101', 'India'] },
              { icon: <Clock size={20} />, title: 'Hours', lines: ['Wed – Mon: 8:00 AM – 8:00 PM', 'Tuesday: Closed'] },
              { icon: <Phone size={20} />, title: 'Contact', lines: ['+91 98765 43210', 'hello@estatecafe.in'] },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex flex-col items-center text-center p-10 relative"
                style={{ background: '#0e0e0e', border: `1px solid #1e1608` }}
              >
                <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `1px solid ${GOLD_DIM}`, borderLeft: `1px solid ${GOLD_DIM}` }} />
                <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `1px solid ${GOLD_DIM}`, borderRight: `1px solid ${GOLD_DIM}` }} />
                <div className="w-11 h-11 flex items-center justify-center mb-5 rotate-45" style={{ border: `1px solid ${GOLD_DIM}` }}>
                  <span className="-rotate-45" style={{ color: GOLD }}>{item.icon}</span>
                </div>
                <h3 className="font-serif text-lg mb-3 font-medium" style={{ color: '#f5ecd8' }}>{item.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(232,220,200,0.5)' }}>
                  {item.lines.map((l, j) => <React.Fragment key={j}>{l}{j < item.lines.length - 1 && <br />}</React.Fragment>)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="flex justify-center"
          >
            <button
              className="text-xs tracking-[0.28em] uppercase px-16 py-5 transition-all duration-300 font-semibold"
              style={{ background: GOLD, color: '#080808' }}
              onMouseEnter={e => (e.currentTarget.style.background = GOLD_LIGHT)}
              onMouseLeave={e => (e.currentTarget.style.background = GOLD)}
            >
              Book a Table
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#050505', borderTop: `1px solid #1a1408`, padding: '4rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="font-serif text-xl font-bold tracking-[0.2em] mb-1" style={{ color: GOLD }}>THE ESTATE CAFE</div>
            <div className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: 'rgba(232,220,200,0.3)' }}>Chikkamagaluru, Karnataka</div>
          </div>

          <div className="flex gap-6">
            {[<Instagram size={18} />, <Facebook size={18} />, <Twitter size={18} />].map((Icon, i) => (
              <a key={i} href="#"
                className="w-9 h-9 flex items-center justify-center rotate-45 transition-all duration-300"
                style={{ border: `1px solid #2a1f0a`, color: 'rgba(201,146,42,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a1f0a'; e.currentTarget.style.color = 'rgba(201,146,42,0.5)'; }}
              >
                <span className="-rotate-45">{Icon}</span>
              </a>
            ))}
          </div>

          <div className="text-xs font-light text-center md:text-right" style={{ color: 'rgba(232,220,200,0.25)' }}>
            &copy; {new Date().getFullYear()} The Estate Cafe.<br />All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
