import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; opacityDir: number;
  color: string; pulse: number; pulseSpeed: number;
}

// Mix of warm gold fireflies + cool blue-white stars for visionOS feel
const COLORS = [
  'rgba(201,139,51,',
  'rgba(230,180,90,',
  'rgba(255,255,255,',
  'rgba(180,200,255,',
  'rgba(160,120,60,',
  'rgba(210,230,255,',
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const COUNT = 130;
    const particles: Particle[] = [];

    const mkP = (randY = true): Particle => ({
      x: Math.random() * W,
      y: randY ? Math.random() * H : H + 8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.55 + 0.1,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.018 + 0.004,
    });

    for (let i = 0; i < COUNT; i++) particles.push(mkP(true));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        p.opacity += p.opacityDir;
        if (p.opacity > 0.75 || p.opacity < 0.04) p.opacityDir *= -1;

        const po = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        const ps = p.size   * (0.8 + 0.2 * Math.sin(p.pulse * 1.3));

        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ps * 5);
        gr.addColorStop(0,   p.color + String(po * 0.85) + ')');
        gr.addColorStop(0.4, p.color + String(po * 0.22) + ')');
        gr.addColorStop(1,   p.color + '0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, ps * 5, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();

        ctx.beginPath(); ctx.arc(p.x, p.y, ps, 0, Math.PI * 2);
        ctx.fillStyle = p.color + String(po) + ')'; ctx.fill();

        if (p.y < -20 || p.x < -30 || p.x > W + 30) particles[i] = mkP(false);
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20" style={{ pointerEvents: 'none' }} />
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: '#03030a' }}>
      {/* 3D photo layer */}
      <div style={{ position: 'absolute', inset: '-6%' }}>
        <img
          src="/images/hero-photo.jpg"
          alt="The Estate Cafe"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.38) saturate(1.1) contrast(1.06)',
          }}
        />
      </div>

      {/* Deep bottom-to-top fade */}
      <div className="absolute inset-0 z-10" style={{
        background: 'linear-gradient(to bottom, rgba(3,3,10,0.3) 0%, rgba(3,3,10,0.05) 35%, rgba(3,3,10,0.6) 72%, rgba(3,3,10,0.98) 100%)',
      }} />

      {/* Edge vignette */}
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 42%, rgba(3,3,10,0.75) 100%)',
      }} />

      {/* Subtle purple center glow (visionOS spatial feel) */}
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse 55% 50% at 52% 46%, rgba(80,50,180,0.12) 0%, transparent 70%)',
      }} />

      {/* Warm center bloom */}
      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse 50% 45% at 52% 48%, rgba(140,80,15,0.14) 0%, transparent 70%)',
      }} />

      <ParticleCanvas />
    </div>
  );
}

interface CardProps {
  src: string; alt: string; label: string;
  width: string; aspectRatio: string;
  rx: number; ry: number; mx: number; my: number;
  rotate?: string; translateZ?: number;
}

function FloatCard({ src, alt, label, width, aspectRatio, rx, ry, mx, my, rotate = '0deg', translateZ = 40 }: CardProps) {
  return (
    <div style={{
      width, aspectRatio, flexShrink: 0,
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.18), 0 8px 40px rgba(0,0,0,0.65), 0 0 20px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.12)',
      transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateX(${mx}px) translateY(${my}px) translateZ(${translateZ}px) rotate(${rotate})`,
      transformStyle: 'preserve-3d',
      willChange: 'transform',
      position: 'relative',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
    }}>
      <img src={src} alt={alt} style={{
        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        filter: 'brightness(0.88) saturate(1.1)',
      }} />
      {/* gradient overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '55%',
        background: 'linear-gradient(to top, rgba(3,3,10,0.85) 0%, transparent 100%)',
      }} />
      {/* glass sheen at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)',
      }} />
      {/* label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '6px 10px',
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ color: 'rgba(242,242,247,0.82)', fontSize: 'clamp(7px,0.85vw,10px)', fontFamily: 'system-ui,sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export function HeroFloatCard({ tiltRx, tiltRy, tiltMx, tiltMy }: {
  tiltRx: number; tiltRy: number; tiltMx: number; tiltMy: number;
}) {
  const L = 1.8;
  const C = 1.4;
  const R = 1.6;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px,1vw,14px)', perspective: '900px' }}>

      {/* LEFT COLUMN — 2 stacked small cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,0.6vw,8px)', flexShrink: 0 }}>
        <FloatCard
          src="/images/hero-card-1.webp" alt="Cafe exterior" label="The Cafe"
          width="clamp(100px,12vw,165px)" aspectRatio="4/3"
          rx={tiltRx * L} ry={tiltRy * L} mx={tiltMx * -L} my={tiltMy * -L}
          rotate="-1.5deg" translateZ={55}
        />
        <FloatCard
          src="/images/hero-card-2.webp" alt="The Gazebo" label="The Gazebo"
          width="clamp(100px,12vw,165px)" aspectRatio="4/3"
          rx={tiltRx * L} ry={tiltRy * L} mx={tiltMx * -L} my={tiltMy * -L}
          rotate="1.2deg" translateZ={45}
        />
      </div>

      {/* CENTER — main feature card */}
      <FloatCard
        src="/images/hero-float.jpg" alt="Estate at dusk" label="Chikkamagaluru, Karnataka"
        width="clamp(160px,20vw,280px)" aspectRatio="16/9"
        rx={tiltRx * C} ry={tiltRy * C} mx={tiltMx * -C} my={tiltMy * -C}
        rotate="0deg" translateZ={70}
      />

      {/* RIGHT — portrait food photo */}
      <FloatCard
        src="/images/hero-card-3.jpg" alt="Breakfast with a view" label="Malnad Breakfast"
        width="clamp(85px,10vw,140px)" aspectRatio="3/4"
        rx={tiltRx * R} ry={tiltRy * R} mx={tiltMx * -R} my={tiltMy * -R}
        rotate="1.8deg" translateZ={50}
      />

    </div>
  );
}
