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

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = 200;
    const particles: Particle[] = [];

    function makeParticle(randomY = true): Particle {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.1,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle(true));

    let mistOffset1 = 0;
    let mistOffset2 = 0;

    function drawMist(offset: number, color: string, yFrac: number, bandH: number, alpha: number) {
      if (!ctx) return;
      const yStart = height * yFrac;
      const grad = ctx.createLinearGradient(0, yStart, 0, yStart + bandH);
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
      ctx.lineTo(width, yStart + bandH);
      ctx.lineTo(0, yStart + bandH);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      if (!ctx) return;

      // Deep black-green background
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, '#060a06');
      bg.addColorStop(0.5, '#0d150c');
      bg.addColorStop(1, '#080e08');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Warm amber center glow
      const glow = ctx.createRadialGradient(width * 0.5, height * 0.42, 0, width * 0.5, height * 0.42, width * 0.52);
      glow.addColorStop(0, 'rgba(180, 100, 25, 0.20)');
      glow.addColorStop(0.5, 'rgba(100, 55, 15, 0.07)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      mistOffset1 += 0.3;
      mistOffset2 -= 0.2;
      drawMist(mistOffset1,       'rgba(140, 170, 130, ALPHA)', 0.55, height * 0.22, 0.07);
      drawMist(mistOffset2,       'rgba(160, 190, 150, ALPHA)', 0.65, height * 0.26, 0.05);
      drawMist(mistOffset1 * 0.7, 'rgba(200, 220, 180, ALPHA)', 0.75, height * 0.18, 0.04);

      // Bottom fade to black
      const fogGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      fogGrad.addColorStop(0, 'rgba(0,0,0,0)');
      fogGrad.addColorStop(1, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        p.opacity += p.opacityDir;
        if (p.opacity > 0.8 || p.opacity < 0.04) p.opacityDir *= -1;

        const po = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        const ps = p.size    * (0.8 + 0.2 * Math.sin(p.pulse * 1.3));

        const glowR = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ps * 5);
        glowR.addColorStop(0,   p.color + String(po * 0.8) + ')');
        glowR.addColorStop(0.4, p.color + String(po * 0.25) + ')');
        glowR.addColorStop(1,   p.color + '0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, ps * 5, 0, Math.PI * 2);
        ctx.fillStyle = glowR;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, ps, 0, Math.PI * 2);
        ctx.fillStyle = p.color + String(po) + ')';
        ctx.fill();

        if (p.y < -20 || p.x < -30 || p.x > width + 30) particles[i] = makeParticle(false);
      });

      const vig = ctx.createRadialGradient(width / 2, height / 2, height * 0.3, width / 2, height / 2, height * 1.0);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
}
