import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GOLD = '#c9922a';
const GOLD_DIM = '#9a6e1f';

const photos = [
  { src: '/images/gallery-11.jpg', caption: 'The Estate Cafe Sign',        tag: 'Identity' },
  { src: '/images/gallery-22.jpg', caption: 'Under the Moonlight',         tag: 'Night' },
  { src: '/images/gallery-25.jpg', caption: 'Golden Sunrise View',         tag: 'Views' },
  { src: '/images/gallery-19.jpg', caption: 'Estate at Dusk',              tag: 'Evening' },
  { src: '/images/gallery-27.jpg', caption: 'The Gazebo & Lawn',           tag: 'Architecture' },
  { src: '/images/gallery-24.jpg', caption: 'Misty Morning Hills',         tag: 'Landscape' },
  { src: '/images/gallery-21.jpg', caption: 'Garden Path & Pepper Vines',  tag: 'Gardens' },
  { src: '/images/gallery-26.jpg', caption: 'The Open Pavilion',           tag: 'Architecture' },
  { src: '/images/gallery-14.jpg', caption: 'Cafe in the Mist',            tag: 'Atmosphere' },
  { src: '/images/gallery-17.jpg', caption: 'Lush Estate Grounds',         tag: 'Gardens' },
  { src: '/images/gallery-15.jpg', caption: 'Rain at the Entrance',        tag: 'Monsoon' },
  { src: '/images/gallery-16.jpg', caption: 'Stone Bench in the Rain',     tag: 'Monsoon' },
  { src: '/images/gallery-18.jpg', caption: 'Wicker Chairs at Night',      tag: 'Night' },
  { src: '/images/gallery-13.jpg', caption: 'The Party Hall',              tag: 'Events' },
  { src: '/images/gallery-23.jpg', caption: 'The Banquet Room',            tag: 'Events' },
  { src: '/images/gallery-12.jpg', caption: 'Log Chairs on the Terrace',   tag: 'Seating' },
  { src: '/images/gallery-20.jpg', caption: 'Romantic Dinner Setting',     tag: 'Dining' },
  { src: '/images/gallery-1.jpg',  caption: 'Blessed & Coffee Obsessed',   tag: 'Decor' },
  { src: '/images/gallery-2.jpg',  caption: 'Stone Walls & Bottle Caps',   tag: 'Decor' },
  { src: '/images/gallery-3.jpg',  caption: 'The Garden Fireplace',        tag: 'Outdoors' },
  { src: '/images/gallery-4.jpg',  caption: 'Fireplace at Night',          tag: 'Night' },
  { src: '/images/gallery-5.webp', caption: 'Terrace by the Trees',        tag: 'Dining' },
  { src: '/images/gallery-6.webp', caption: 'The Heritage Gazebo',         tag: 'Seating' },
  { src: '/images/gallery-7.jpg',  caption: 'Mist Over the Estate',        tag: 'Landscape' },
  { src: '/images/gallery-8.webp', caption: 'The Stone Bungalow',          tag: 'Architecture' },
  { src: '/images/gallery-9.jpg',  caption: 'Hills & Open Lawns',          tag: 'Estate' },
  { src: '/images/gallery-10.jpg', caption: 'Do What You Love',            tag: 'Decor' },
];

const VISIBLE = 3; // cards shown at once

function FlipCard({ photo, isCenter, onClick }: {
  photo: typeof photos[0];
  isCenter: boolean;
  onClick: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  // unflip when it leaves center
  useEffect(() => { if (!isCenter) setFlipped(false); }, [isCenter]);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{
        width: isCenter ? '340px' : '240px',
        height: isCenter ? '420px' : '300px',
        perspective: '1000px',
        transition: 'width 0.5s ease, height 0.5s ease',
        flexShrink: 0,
      }}
      onClick={() => { if (isCenter) setFlipped(f => !f); else onClick(); }}
    >
      <div
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          overflow: 'hidden',
          border: isCenter ? `1px solid ${GOLD_DIM}` : '1px solid #1e1608',
          background: '#0e0e0e',
        }}>
          <img
            src={photo.src}
            alt={photo.caption}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: isCenter ? 'brightness(0.92) contrast(1.05)' : 'brightness(0.5) saturate(0.7)',
              transition: 'filter 0.5s ease',
            }}
          />
          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)',
          }} />
          {isCenter && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.2rem 1.4rem' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '6px' }}>
                {photo.tag}
              </span>
              <p style={{ fontSize: '15px', color: '#f0e4cc', fontFamily: 'serif', margin: 0, lineHeight: 1.3 }}>
                {photo.caption}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(201,146,42,0.55)', marginTop: '8px', letterSpacing: '0.15em' }}>
                Click to flip
              </p>
            </div>
          )}
          {/* Gold corner accents on center card */}
          {isCenter && <>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
          </>}
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: '#0a0a0a',
          border: `1px solid ${GOLD_DIM}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{ width: 40, height: 40, border: `1px solid ${GOLD_DIM}`, transform: 'rotate(45deg)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, background: GOLD, transform: 'rotate(0deg)' }} />
          </div>
          <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD_DIM, display: 'block', marginBottom: '12px' }}>
            {photo.tag}
          </span>
          <p style={{ fontSize: '18px', color: '#f0e4cc', fontFamily: 'serif', marginBottom: '1rem', lineHeight: 1.4 }}>
            {photo.caption}
          </p>
          <div style={{ width: 40, height: 1, background: GOLD, marginBottom: '1rem' }} />
          <p style={{ fontSize: '12px', color: 'rgba(232,220,200,0.45)', fontWeight: 300, lineHeight: 1.7 }}>
            The Estate Cafe<br />Chikkamagaluru
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(201,146,42,0.4)', marginTop: '1.5rem', letterSpacing: '0.15em' }}>
            Click to flip back
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

  // Auto-advance every 4s
  useEffect(() => {
    timerRef.current = setTimeout(() => next(), 4000);
    return () => clearTimeout(timerRef.current);
  }, [active, next]);

  // Build the 3-card visible window: [active-1, active, active+1]
  const indices = [-1, 0, 1].map(offset => (active + offset + photos.length) % photos.length);

  return (
    <section style={{ background: '#060606', padding: '7rem 0', overflow: 'hidden' }}>
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '1rem', fontWeight: 300 }}>
            The Estate
          </span>
          <h2 style={{ fontFamily: 'serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#f5ecd8', fontWeight: 500, marginBottom: '1.5rem' }}>
            A Glimpse Inside
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ height: '1px', width: '48px', background: GOLD }} />
            <div style={{ width: '6px', height: '6px', background: GOLD, transform: 'rotate(45deg)' }} />
            <div style={{ height: '1px', width: '48px', background: GOLD }} />
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', minHeight: '460px' }}>
        {/* Prev */}
        <button
          onClick={prev}
          style={{
            position: 'absolute', left: 'clamp(12px, 4vw, 60px)', zIndex: 20,
            width: 44, height: 44, border: `1px solid ${GOLD_DIM}`, background: 'rgba(0,0,0,0.6)',
            color: GOLD, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD_DIM; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.6)'; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Cards */}
        <AnimatePresence mode="popLayout" initial={false}>
          {indices.map((photoIdx, slot) => {
            const isCenter = slot === 1;
            return (
              <motion.div
                key={`${photoIdx}-${slot}`}
                initial={{ opacity: 0, x: dir * 120, scale: 0.85 }}
                animate={{
                  opacity: isCenter ? 1 : 0.5,
                  x: 0,
                  scale: isCenter ? 1 : 0.85,
                  zIndex: isCenter ? 10 : 1,
                }}
                exit={{ opacity: 0, x: -dir * 120, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: 'flex', flexShrink: 0 }}
              >
                <FlipCard
                  photo={photos[photoIdx]}
                  isCenter={isCenter}
                  onClick={() => {
                    if (slot === 0) prev();
                    else if (slot === 2) next();
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Next */}
        <button
          onClick={next}
          style={{
            position: 'absolute', right: 'clamp(12px, 4vw, 60px)', zIndex: 20,
            width: 44, height: 44, border: `1px solid ${GOLD_DIM}`, background: 'rgba(0,0,0,0.6)',
            color: GOLD, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD; (e.currentTarget as HTMLButtonElement).style.background = GOLD; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD_DIM; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.6)'; (e.currentTarget as HTMLButtonElement).style.color = GOLD; }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '2.5rem' }}>
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > active ? 1 : -1)}
            style={{
              width: i === active ? '24px' : '6px',
              height: '6px',
              background: i === active ? GOLD : '#2a2010',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
              transform: i === active ? 'rotate(0deg)' : 'rotate(45deg)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
