import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ── Design tokens ──────────────────────────────────────
const GLASS     = 'rgba(255,255,255,0.07)';
const GLASS_MED = 'rgba(255,255,255,0.11)';
const GLASS_LO  = 'rgba(255,255,255,0.04)';
const BORDER    = 'rgba(255,255,255,0.10)';
const BORDER_LT = 'rgba(255,255,255,0.20)';
const TEXT      = '#f2f2f7';
const TEXT_DIM  = 'rgba(242,242,247,0.55)';
const TEXT_FAINT = 'rgba(242,242,247,0.30)';
const GOLD      = '#d4a843';

type CP = React.CSSProperties;
const gls = (bg = GLASS, br = BORDER, extra: CP = {}): CP => ({
  background: bg,
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: `1px solid ${br}`,
  ...extra,
});

const photos = [
  { src: '/images/gallery-11.jpg',  caption: 'The Estate Cafe Sign',       tag: 'Identity' },
  { src: '/images/gallery-22.jpg',  caption: 'Under the Moonlight',        tag: 'Night' },
  { src: '/images/gallery-25.jpg',  caption: 'Golden Sunrise View',        tag: 'Views' },
  { src: '/images/gallery-19.jpg',  caption: 'Estate at Dusk',             tag: 'Evening' },
  { src: '/images/gallery-27.jpg',  caption: 'The Gazebo & Lawn',          tag: 'Architecture' },
  { src: '/images/gallery-24.jpg',  caption: 'Misty Morning Hills',        tag: 'Landscape' },
  { src: '/images/gallery-21.jpg',  caption: 'Garden Path & Pepper Vines', tag: 'Gardens' },
  { src: '/images/gallery-26.jpg',  caption: 'The Open Pavilion',          tag: 'Architecture' },
  { src: '/images/gallery-14.jpg',  caption: 'Cafe in the Mist',           tag: 'Atmosphere' },
  { src: '/images/gallery-17.jpg',  caption: 'Lush Estate Grounds',        tag: 'Gardens' },
  { src: '/images/gallery-15.jpg',  caption: 'Rain at the Entrance',       tag: 'Monsoon' },
  { src: '/images/gallery-16.jpg',  caption: 'Stone Bench in the Rain',    tag: 'Monsoon' },
  { src: '/images/gallery-18.jpg',  caption: 'Wicker Chairs at Night',     tag: 'Night' },
  { src: '/images/gallery-13.jpg',  caption: 'The Party Hall',             tag: 'Events' },
  { src: '/images/gallery-23.jpg',  caption: 'The Banquet Room',           tag: 'Events' },
  { src: '/images/gallery-12.jpg',  caption: 'Log Chairs on the Terrace',  tag: 'Seating' },
  { src: '/images/gallery-20.jpg',  caption: 'Romantic Dinner Setting',    tag: 'Dining' },
  { src: '/images/gallery-1.jpg',   caption: 'Blessed & Coffee Obsessed',  tag: 'Decor' },
  { src: '/images/gallery-2.jpg',   caption: 'Stone Walls & Bottle Caps',  tag: 'Decor' },
  { src: '/images/gallery-3.jpg',   caption: 'The Garden Fireplace',       tag: 'Outdoors' },
  { src: '/images/gallery-4.jpg',   caption: 'Fireplace at Night',         tag: 'Night' },
  { src: '/images/gallery-5.webp',  caption: 'Terrace by the Trees',       tag: 'Dining' },
  { src: '/images/gallery-6.webp',  caption: 'The Heritage Gazebo',        tag: 'Seating' },
  { src: '/images/gallery-7.jpg',   caption: 'Mist Over the Estate',       tag: 'Landscape' },
  { src: '/images/gallery-8.webp',  caption: 'The Stone Bungalow',         tag: 'Architecture' },
  { src: '/images/gallery-9.jpg',   caption: 'Hills & Open Lawns',         tag: 'Estate' },
  { src: '/images/gallery-10.jpg',  caption: 'Do What You Love',           tag: 'Decor' },
];

function FlipCard({ photo, isCenter, onClick }: {
  photo: typeof photos[0];
  isCenter: boolean;
  onClick: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { if (!isCenter) setFlipped(false); }, [isCenter]);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{
        width:  isCenter ? '340px' : '240px',
        height: isCenter ? '420px' : '300px',
        perspective: '1000px',
        transition: 'width 0.5s ease, height 0.5s ease',
        flexShrink: 0,
      }}
      onClick={() => { if (isCenter) setFlipped(f => !f); else onClick(); }}
    >
      <div style={{
        width: '100%', height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          overflow: 'hidden',
          borderRadius: 16,
          ...gls(
            isCenter ? 'rgba(255,255,255,0.06)' : GLASS_LO,
            isCenter ? BORDER_LT : 'rgba(255,255,255,0.07)',
          ),
          boxShadow: isCenter
            ? '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          <img
            src={photo.src}
            alt={photo.caption}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: isCenter ? 'brightness(0.92) contrast(1.04)' : 'brightness(0.38) saturate(0.5)',
              transition: 'filter 0.5s ease',
            }}
          />
          {/* gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,3,10,0.88) 0%, transparent 55%)', pointerEvents: 'none' }} />

          {isCenter && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.2rem 1.4rem' }}>
              <span style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 6 }}>
                {photo.tag}
              </span>
              <p style={{ fontSize: 15, color: TEXT, fontFamily: 'Georgia,serif', margin: 0, lineHeight: 1.3 }}>
                {photo.caption}
              </p>
              <p style={{ fontSize: 10, color: TEXT_FAINT, marginTop: 8, letterSpacing: '0.15em' }}>
                Tap to flip
              </p>
            </div>
          )}

          {/* glass top edge sheen */}
          {isCenter && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)', pointerEvents: 'none' }} />
          )}
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 16,
          ...gls('rgba(255,255,255,0.08)', BORDER_LT),
          boxShadow: '0 8px 48px rgba(0,0,0,0.55)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          overflow: 'hidden',
          position: 'absolute',
        } as CP}>
          {/* ambient glow */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
          </div>
          <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 12 }}>
            {photo.tag}
          </span>
          <p style={{ fontSize: 17, color: TEXT, fontFamily: 'Georgia,serif', marginBottom: '1rem', lineHeight: 1.4 }}>
            {photo.caption}
          </p>
          <div style={{ width: 32, height: 1, background: 'rgba(212,168,67,0.5)', marginBottom: '1rem' }} />
          <p style={{ fontSize: 12, color: TEXT_DIM, fontWeight: 300, lineHeight: 1.7 }}>
            The Estate Cafe<br />Chikkamagaluru
          </p>
          <p style={{ fontSize: 9, color: TEXT_FAINT, marginTop: '1.2rem', letterSpacing: '0.15em' }}>
            Tap to flip back
          </p>
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback((newIdx: number, direction: 1 | -1) => {
    setDir(direction);
    setActive((newIdx + photos.length) % photos.length);
  }, []);

  const prev = useCallback(() => go(active - 1, -1), [active, go]);
  const next = useCallback(() => go(active + 1,  1), [active, go]);

  useEffect(() => {
    timerRef.current = setTimeout(() => next(), 4500);
    return () => clearTimeout(timerRef.current);
  }, [active, next]);

  const indices = [-1, 0, 1].map(offset => (active + offset + photos.length) % photos.length);

  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '7rem 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', padding: '0 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '1rem' }}>
            The Estate
          </span>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2rem,5vw,3.2rem)', color: TEXT, fontWeight: 500, margin: '0 0 1.2rem' }}>
            A Glimpse Inside
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.6))' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD, opacity: 0.7 }} />
            <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.6))' }} />
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, minHeight: 460 }}>

        {/* Prev button */}
        <button
          onClick={prev}
          style={{
            position: 'absolute', left: 'clamp(12px,4vw,60px)', zIndex: 20,
            width: 42, height: 42, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: TEXT_DIM, transition: 'color 0.2s, background 0.2s, border-color 0.2s',
            ...gls(),
          }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.color = TEXT; b.style.background = GLASS_MED; b.style.borderColor = BORDER_LT; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.color = TEXT_DIM; b.style.background = GLASS; b.style.borderColor = BORDER; }}
        >
          <ChevronLeft size={17} />
        </button>

        {/* Cards */}
        <AnimatePresence mode="popLayout" initial={false}>
          {indices.map((photoIdx, slot) => {
            const isCenter = slot === 1;
            return (
              <motion.div
                key={`${photoIdx}-${slot}`}
                initial={{ opacity: 0, x: dir * 120, scale: 0.85 }}
                animate={{ opacity: isCenter ? 1 : 0.45, x: 0, scale: isCenter ? 1 : 0.84, zIndex: isCenter ? 10 : 1 }}
                exit={{ opacity: 0, x: -dir * 120, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.4,0,0.2,1] }}
                style={{ display: 'flex', flexShrink: 0 }}
              >
                <FlipCard
                  photo={photos[photoIdx]}
                  isCenter={isCenter}
                  onClick={() => { if (slot === 0) prev(); else if (slot === 2) next(); }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Next button */}
        <button
          onClick={next}
          style={{
            position: 'absolute', right: 'clamp(12px,4vw,60px)', zIndex: 20,
            width: 42, height: 42, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: TEXT_DIM, transition: 'color 0.2s, background 0.2s, border-color 0.2s',
            ...gls(),
          }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.color = TEXT; b.style.background = GLASS_MED; b.style.borderColor = BORDER_LT; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.color = TEXT_DIM; b.style.background = GLASS; b.style.borderColor = BORDER; }}
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: '2.5rem' }}>
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > active ? 1 : -1)}
            style={{
              width: i === active ? '20px' : '5px',
              height: '5px',
              background: i === active ? TEXT : 'rgba(255,255,255,0.2)',
              borderRadius: 100,
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
