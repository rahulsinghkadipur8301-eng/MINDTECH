import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  type: 'green-node' | 'benzene' | 'silicone-bond' | 'dna-rung' | 'enzyme-core' | 'pentagon';
  rotation: number;
  rotSpeed: number;
  scale: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -3000, y: -3000, radius: 260, targetRadius: 260 };

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -3000;
      mouse.y = -3000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // High-end scientific biotech color palette:
    const palette = [
      { fill: '#107c41', glow: 'rgba(16, 124, 65, 0.45)' },   // Primary Mindtech Emerald
      { fill: '#059669', glow: 'rgba(5, 150, 105, 0.40)' },   // Deep Emerald
      { fill: '#10b981', glow: 'rgba(16, 185, 129, 0.50)' },  // Vibrant Mint Green
      { fill: '#34d399', glow: 'rgba(52, 211, 153, 0.55)' },  // Luminous Spring Mint
      { fill: '#0d9488', glow: 'rgba(13, 148, 136, 0.42)' },  // Botanical Teal
      { fill: '#047857', glow: 'rgba(4, 120, 87, 0.38)' },    // Forest Bio-Green
    ];

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const particleCount = Math.min(Math.floor((width * height) / 16000), 68);
    const maxConnDist = 155;
    const maxConnDistSq = maxConnDist * maxConnDist;
    const mouseRadiusSq = mouse.radius * mouse.radius;
    const particles: ParticleNode[] = [];

    const types: ParticleNode['type'][] = [
      'green-node',
      'green-node',
      'green-node',
      'benzene',
      'benzene',
      'silicone-bond',
      'silicone-bond',
      'dna-rung',
      'pentagon',
      'enzyme-core'
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = palette[Math.floor(Math.random() * palette.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const isLargeShape = type === 'benzene' || type === 'pentagon' || type === 'dna-rung';

      const x = Math.random() * width;
      const y = Math.random() * height;

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * (isLargeShape ? 0.35 : 0.6),
        vy: (Math.random() - 0.5) * (isLargeShape ? 0.35 : 0.6),
        radius: isLargeShape ? Math.random() * 8 + 14 : Math.random() * 3.5 + 2,
        color: col.fill,
        glowColor: col.glow,
        alpha: Math.random() * 0.45 + 0.35,
        baseAlpha: Math.random() * 0.45 + 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        scale: Math.random() * 0.35 + 0.85
      });
    }

    let time = 0;
    let isPageVisible = !document.hidden;

    // Drawing routines for high-level biotech molecular geometry
    const drawBenzene = (p: ParticleNode) => {
      const r = p.radius * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = r * Math.cos(a);
        const hy = r * Math.sin(a);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = p.color;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.arc(r * Math.cos(a), r * Math.sin(a), 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawSiliconeSiloxaneBond = (p: ParticleNode) => {
      const len = 14 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.lineTo(len, 0);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-len, 0, 3.4, 0, Math.PI * 2);
      ctx.arc(len, 0, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = '#047857';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      ctx.restore();
    };

    const drawDnaRung = (p: ParticleNode) => {
      const len = 12 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();
      ctx.moveTo(-len, -4);
      ctx.lineTo(len, -4);
      ctx.moveTo(-len, 4);
      ctx.lineTo(len, 4);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-len, -4, 2.2, 0, Math.PI * 2);
      ctx.arc(len, -4, 2.2, 0, Math.PI * 2);
      ctx.arc(-len, 4, 2.2, 0, Math.PI * 2);
      ctx.arc(len, 4, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.restore();
    };

    const drawPentagon = (p: ParticleNode) => {
      const r = p.radius * 0.9 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = r * Math.cos(a);
        const py = r * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = p.color;
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(r * Math.cos(a), r * Math.sin(a), 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawEnzymeCore = (p: ParticleNode) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = p.glowColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // 1. Draw interconnected biotech filaments between proximate nodes (squared dist check avoids needless sqrt/gradients)
      ctx.lineWidth = 0.95;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxConnDist) * 0.26;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(16, 150, 100, ${alpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // 2. Interactive mouse connection filaments & gentle magnetic repulsion
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.lineWidth = 1.15;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouse.radius) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha.toFixed(3)})`;
            ctx.stroke();

            const force = (1 - dist / mouse.radius) * 0.8;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }
      }

      // 3. Update particle physics & render geometries
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          if (p.x < -50) p.x = width + 50;
          else if (p.x > width + 50) p.x = -50;
          if (p.y < -50) p.y = height + 50;
          else if (p.y > height + 50) p.y = -50;
        }

        const currentAlpha =
          p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase) * 0.18;

        ctx.globalAlpha = Math.max(0.18, Math.min(0.88, currentAlpha));

        switch (p.type) {
          case 'benzene':
            drawBenzene(p);
            break;
          case 'silicone-bond':
            drawSiliconeSiloxaneBond(p);
            break;
          case 'dna-rung':
            drawDnaRung(p);
            break;
          case 'pentagon':
            drawPentagon(p);
            break;
          case 'enzyme-core':
            drawEnzymeCore(p);
            break;
          case 'green-node':
          default:
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = p.glowColor;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            break;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!isPageVisible) return;
      drawFrame();
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Dynamic Generative Molecular Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-95" />

      {/* 2. Hardware-Friendly Radial Ambient Glow Layers (avoids expensive real-time CSS blur filters) */}
      <div
        className="absolute -top-36 -left-36 w-[44rem] h-[44rem] rounded-full opacity-75"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.16) 0%, rgba(52,211,153,0) 68%)' }}
      />
      <div
        className="absolute top-1/4 -right-40 w-[42rem] h-[42rem] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.13) 0%, rgba(45,212,191,0) 68%)' }}
      />
      <div
        className="absolute top-1/2 -left-40 w-[46rem] h-[46rem] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.13) 0%, rgba(16,185,129,0) 68%)' }}
      />
      <div
        className="absolute top-3/4 -right-32 w-[44rem] h-[44rem] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0) 68%)' }}
      />

      {/* 3. Subtle Molecular Scientific Micro-Grid with Green Node Accents */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#107c41_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
    </div>
  );
};
