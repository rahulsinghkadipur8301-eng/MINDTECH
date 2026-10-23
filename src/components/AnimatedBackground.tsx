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

    const particleCount = Math.min(Math.floor((width * height) / 11000), 125);
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

    // Drawing routines for high-level biotech molecular geometry
    const drawBenzene = (p: ParticleNode, currentAlpha: number) => {
      const r = p.radius * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Outer aromatic hexagon
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

      // Inner aromatic electron delocalization ring
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.setLineDash([]);

      // Atom node spheres on vertices with glow
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = r * Math.cos(a);
        const hy = r * Math.sin(a);
        ctx.beginPath();
        ctx.arc(hx, hy, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawSiliconeSiloxaneBond = (p: ParticleNode) => {
      const len = 14 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Si - O - Si linear chain bond
      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.lineTo(len, 0);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Silicon atom left
      ctx.beginPath();
      ctx.arc(-len, 0, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = '#047857';
      ctx.fill();

      // Central oxygen bridge atom (luminous mint)
      ctx.beginPath();
      ctx.arc(0, 0, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      // Silicon atom right
      ctx.beginPath();
      ctx.arc(len, 0, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = '#047857';
      ctx.fill();

      ctx.restore();
    };

    const drawDnaRung = (p: ParticleNode) => {
      const len = 12 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Dual helical rung bond
      ctx.beginPath();
      ctx.moveTo(-len, -4);
      ctx.lineTo(len, -4);
      ctx.moveTo(-len, 4);
      ctx.lineTo(len, 4);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Terminal nucleotide pairs
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

      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(r * Math.cos(a), r * Math.sin(a), 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawEnzymeCore = (p: ParticleNode) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      // Multi-layer pulsating aura
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = p.glowColor;
      ctx.fill();

      // Central dense nucleus
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // White-hot center
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // 1. Draw interconnected biotech filaments between proximate nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 165) {
            const alpha = (1 - dist / 165) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, `rgba(16, 124, 65, ${alpha})`);
            grad.addColorStop(1, `rgba(52, 211, 153, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }
      }

      // 2. Interactive mouse connection filaments & magnetic aura
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1.15;
            ctx.stroke();

            // Slight gentle magnetic repulsion to feel living and interactive
            const force = (1 - dist / mouse.radius) * 0.8;
            particles[i].x -= (dx / dist) * force;
            particles[i].y -= (dy / dist) * force;
          }
        }
      }

      // 3. Update particle physics & render geometries
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Smooth continuous wrap-around screen boundaries
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        const currentAlpha =
          p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulsePhase) * 0.18;

        ctx.save();
        ctx.globalAlpha = Math.max(0.18, Math.min(0.88, currentAlpha));

        switch (p.type) {
          case 'benzene':
            drawBenzene(p, currentAlpha);
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
            // High-contrast vibrant bio-node with radial glow
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

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Dynamic Generative Molecular Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-95" />

      {/* 2. High-Level Multi-Layered Bioluminescent Ambient Glow Spheres with organic breathing animation */}
      <div
        className="absolute -top-36 -left-36 w-[44rem] h-[44rem] bg-emerald-400/15 rounded-full blur-[100px] animate-pulse"
        style={{ animationDuration: '9s' }}
      />
      <div
        className="absolute top-1/4 -right-40 w-[42rem] h-[42rem] bg-teal-400/12 rounded-full blur-[110px] animate-pulse"
        style={{ animationDuration: '12s' }}
      />
      <div
        className="absolute top-1/2 -left-40 w-[46rem] h-[46rem] bg-emerald-500/12 rounded-full blur-[120px] animate-pulse"
        style={{ animationDuration: '14s' }}
      />
      <div
        className="absolute top-3/4 -right-32 w-[44rem] h-[44rem] bg-teal-500/12 rounded-full blur-[110px] animate-pulse"
        style={{ animationDuration: '11s' }}
      />

      {/* 3. Subtle Molecular Scientific Micro-Grid with Green Node Accents */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#107c41_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
    </div>
  );
};
