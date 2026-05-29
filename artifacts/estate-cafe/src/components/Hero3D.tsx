import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDir: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  'rgba(201, 139, 51,',
  'rgba(230, 180, 90,',
  'rgba(160, 120, 60,',
  'rgba(255, 210, 120,',
  'rgba(180, 200, 160,',
  'rgba(210, 160, 70,',
];

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.body.scrollHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = 280;
    const particles: Particle[] = [];

    function makeParticle(randomY = true): Particle {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.1),
        size: Math.random() * 3.5 + 0.8,
        opacity: Math.random() * 0.7 + 0.1,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(makeParticle(true));
    }

    let mistOffset1 = 0;
    let mistOffset2 = 0;

    function drawMist(offset: number, color: string, yFrac: number, bandHeight: number, alpha: number) {
      if (!ctx) return;
      const yStart = height * yFrac;
      const grad = ctx.createLinearGradient(0, yStart, 0, yStart + bandHeight);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.35, color.replace('ALPHA', String(alpha)));
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, yStart);
      for (let x = 0; x <= width; x += 4) {
        const waveY = yStart + Math.sin((x + offset) * 0.008) * 28 + Math.sin((x + offset) * 0.022) * 10;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(width, yStart + bandHeight);
      ctx.lineTo(0, yStart + bandHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      if (!ctx) return;

      // Deep forest gradient — full canvas height
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0,   '#0a1409');
      bg.addColorStop(0.3, '#111d10');
      bg.addColorStop(0.6, '#162015');
      bg.addColorStop(1,   '#0d180c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Warm amber glow — centered at top third
      const glow1 = ctx.createRadialGradient(width * 0.5, height * 0.22, 0, width * 0.5, height * 0.22, width * 0.5);
      glow1.addColorStop(0, 'rgba(180, 100, 25, 0.22)');
      glow1.addColorStop(0.5,'rgba(100, 55, 15, 0.08)');
      glow1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      // Second softer amber glow — mid page
      const glow2 = ctx.createRadialGradient(width * 0.3, height * 0.55, 0, width * 0.3, height * 0.55, width * 0.4);
      glow2.addColorStop(0, 'rgba(160, 90, 20, 0.12)');
      glow2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      // Third glow — lower page right
      const glow3 = ctx.createRadialGradient(width * 0.72, height * 0.78, 0, width * 0.72, height * 0.78, width * 0.35);
      glow3.addColorStop(0, 'rgba(140, 80, 20, 0.10)');
      glow3.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow3;
      ctx.fillRect(0, 0, width, height);

      // Mist bands at multiple depths across the full page
      mistOffset1 += 0.3;
      mistOffset2 -= 0.18;
      const mistH = height * 0.12;
      drawMist(mistOffset1,       'rgba(140, 170, 130, ALPHA)', 0.28, mistH, 0.07);
      drawMist(mistOffset2,       'rgba(160, 190, 150, ALPHA)', 0.45, mistH, 0.06);
      drawMist(mistOffset1 * 0.8, 'rgba(120, 160, 120, ALPHA)', 0.62, mistH, 0.05);
      drawMist(mistOffset2 * 0.9, 'rgba(150, 180, 140, ALPHA)', 0.80, mistH, 0.05);

      // Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        p.opacity += p.opacityDir;
        if (p.opacity > 0.82 || p.opacity < 0.04) p.opacityDir *= -1;

        const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        const pulsedSize    = p.size    * (0.8 + 0.2 * Math.sin(p.pulse * 1.3));

        // Outer glow
        const glowR = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedSize * 5);
        glowR.addColorStop(0,   p.color + String(pulsedOpacity * 0.8) + ')');
        glowR.addColorStop(0.4, p.color + String(pulsedOpacity * 0.25) + ')');
        glowR.addColorStop(1,   p.color + '0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedSize * 5, 0, Math.PI * 2);
        ctx.fillStyle = glowR;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color + String(pulsedOpacity) + ')';
        ctx.fill();

        if (p.y < -20 || p.x < -30 || p.x > width + 30) {
          particles[i] = makeParticle(false);
        }
      });

      // Edge vignette
      const vig = ctx.createRadialGradient(width / 2, height / 2, height * 0.28, width / 2, height / 2, height * 0.95);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width  = window.innerWidth;
      height = document.body.scrollHeight || window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
    }

    // Observe body height changes (content renders → page grows)
    const ro = new ResizeObserver(handleResize);
    ro.observe(document.body);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
