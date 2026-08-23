import React, { useEffect, useRef } from 'react';

interface ChemicalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  type: 'green-dot' | 'benzene' | 'water-mol' | 'silicone-bond' | 'pentagon' | 'atom-node' | 'zigzag';
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
    const mouse = { x: -2000, y: -2000, radius: 220 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Color palette with vivid green dots and chemical tones
    const greenColors = [
      { fill: '#10b981', glow: 'rgba(16, 185, 129, 0.45)' }, // Emerald
      { fill: '#059669', glow: 'rgba(5, 150, 105, 0.40)' },  // Deep Emerald
      { fill: '#34d399', glow: 'rgba(52, 211, 153, 0.50)' }, // Mint Green
      { fill: '#047857', glow: 'rgba(4, 120, 87, 0.35)' },   // Forest Green
      { fill: '#0d9488', glow: 'rgba(13, 148, 136, 0.40)' },  // Teal Green
      { fill: '#22c55e', glow: 'rgba(34, 197, 94, 0.45)' },  // Vivid Green
      { fill: '#14b8a6', glow: 'rgba(20, 184, 166, 0.40)' }, // Aqua Green
    ];

    const particleCount = Math.min(Math.floor((width * height) / 12000), 110);
    const particles: ChemicalParticle[] = [];

    const types: ChemicalParticle['type'][] = [
      'green-dot',
      'green-dot',
      'green-dot',
      'benzene',
      'benzene',
      'atom-node',
      'water-mol',
      'silicone-bond',
      'pentagon',
      'zigzag'
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = greenColors[Math.floor(Math.random() * greenColors.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const isBigShape = type === 'benzene' || type === 'pentagon' || type === 'zigzag';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isBigShape ? 0.35 : 0.65),
        vy: (Math.random() - 0.5) * (isBigShape ? 0.35 : 0.65),
        radius: isBigShape ? Math.random() * 8 + 14 : Math.random() * 3.5 + 2,
        color: col.fill,
        glowColor: col.glow,
        alpha: Math.random() * 0.4 + 0.35,
        baseAlpha: Math.random() * 0.4 + 0.35,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        scale: Math.random() * 0.4 + 0.8
      });
    }

    let time = 0;

    // Helper functions to draw specific chemical shapes
    const drawBenzeneRing = (
      p: ChemicalParticle,
      ctx: CanvasRenderingContext2D,
      currentAlpha: number
    ) => {
      const r = p.radius * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Outer hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hx = r * Math.cos(angle);
        const hy = r * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Inner aromatic resonance circle or alternating double bonds
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.setLineDash([]);

      // Green dots on vertices (atoms)
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hx = r * Math.cos(angle);
        const hy = r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(hx, hy, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawPentagonRing = (
      p: ChemicalParticle,
      ctx: CanvasRenderingContext2D
    ) => {
      const r = p.radius * 0.85 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = r * Math.cos(angle);
        const py = r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Vertex green dots
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = r * Math.cos(angle);
        const py = r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawWaterMolecule = (
      p: ChemicalParticle,
      ctx: CanvasRenderingContext2D
    ) => {
      const r = 10 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Central Atom (Oxygen)
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#059669';
      ctx.fill();

      // Two Hydrogen bonds at 104.5 degrees
      const a1 = -Math.PI * 0.3;
      const a2 = Math.PI * 0.3;

      const h1x = r * Math.cos(a1);
      const h1y = r * Math.sin(a1);
      const h2x = r * Math.cos(a2);
      const h2y = r * Math.sin(a2);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(h1x, h1y);
      ctx.moveTo(0, 0);
      ctx.lineTo(h2x, h2y);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Hydrogen Green Dots
      ctx.beginPath();
      ctx.arc(h1x, h1y, 2.2, 0, Math.PI * 2);
      ctx.arc(h2x, h2y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.restore();
    };

    const drawZigzagChain = (
      p: ChemicalParticle,
      ctx: CanvasRenderingContext2D
    ) => {
      const segLen = 9 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.beginPath();
      const points = [
        { x: -segLen * 1.5, y: -segLen * 0.5 },
        { x: -segLen * 0.5, y: segLen * 0.5 },
        { x: segLen * 0.5, y: -segLen * 0.5 },
        { x: segLen * 1.5, y: segLen * 0.5 }
      ];

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Green carbon atom dots at nodes
      for (let pt of points) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawSiliconeBond = (
      p: ChemicalParticle,
      ctx: CanvasRenderingContext2D
    ) => {
      const len = 12 * p.scale;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Si - O - Si linear chain
      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.lineTo(len, 0);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.3;
      ctx.stroke();

      // Si atom
      ctx.beginPath();
      ctx.arc(-len, 0, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#047857';
      ctx.fill();

      // Oxygen central atom
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      // Si atom
      ctx.beginPath();
      ctx.arc(len, 0, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#047857';
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // 1. Draw connecting molecular chemical bonds between nearby green dots
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 155) {
            const alpha = (1 - dist / 155) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, `rgba(16, 185, 129, ${alpha})`);
            grad.addColorStop(1, `rgba(5, 150, 105, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // 2. Draw reactive bonds to user's mouse position
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // 3. Move and render green dots and chemical shapes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around viewport edges so animation is continuous and never ends
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        const currentAlpha =
          p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.18;

        ctx.save();
        ctx.globalAlpha = Math.max(0.18, Math.min(0.85, currentAlpha));

        switch (p.type) {
          case 'benzene':
            drawBenzeneRing(p, ctx, currentAlpha);
            break;
          case 'pentagon':
            drawPentagonRing(p, ctx);
            break;
          case 'water-mol':
            drawWaterMolecule(p, ctx);
            break;
          case 'zigzag':
            drawZigzagChain(p, ctx);
            break;
          case 'silicone-bond':
            drawSiliconeBond(p, ctx);
            break;
          case 'atom-node':
            // Glowing green atomic node with halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.glowColor;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            break;
          case 'green-dot':
          default:
            // High-contrast vivid green dot with subtle glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
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
      {/* 1. High-Density Green Dots & Chemical Shapes Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />

      {/* 2. Soft Ambient Emerald/Teal Glows */}
      <div
        className="absolute -top-32 -left-32 w-[38rem] h-[38rem] bg-emerald-400/12 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] bg-teal-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '11s' }}
      />
      <div
        className="absolute top-1/2 -left-32 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '13s' }}
      />
      <div
        className="absolute top-3/4 right-0 w-[38rem] h-[38rem] bg-teal-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '10s' }}
      />

      {/* 3. Subtle Molecular Micro-Grid with Green Dots */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
    </div>
  );
};
