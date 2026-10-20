import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(x?: number, y?: number) {
        this.x = x ?? Math.random() * canvasEl.width;
        this.y = y ?? Math.random() * canvasEl.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.2 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce gently off walls
        if (this.x < 0) {
          this.x = 0;
          this.vx = Math.abs(this.vx);
        } else if (this.x > canvasEl.width) {
          this.x = canvasEl.width;
          this.vx = -Math.abs(this.vx);
        }

        if (this.y < 0) {
          this.y = 0;
          this.vy = Math.abs(this.vy);
        } else if (this.y > canvasEl.height) {
          this.y = canvasEl.height;
          this.vy = -Math.abs(this.vy);
        }

        // Gentle mouse interaction without aggressive clustering
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 140;

        if (distance < maxDistance && distance > 0) {
          const force = ((maxDistance - distance) / maxDistance) * 0.7;
          this.x += (dx / distance) * force;
          this.y += (dy / distance) * force;
        }
      }

      draw(isDark: boolean) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(147, 197, 253, 0.32)' : 'rgba(37, 99, 235, 0.18)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 28 : 65;
      const cols = Math.ceil(Math.sqrt(particleCount * (canvasEl.width / (canvasEl.height || 1))));
      const rows = Math.ceil(particleCount / cols);
      const cellW = canvasEl.width / cols;
      const cellH = canvasEl.height / rows;

      let created = 0;
      for (let r = 0; r < rows && created < particleCount; r++) {
        for (let c = 0; c < cols && created < particleCount; c++) {
          const px = c * cellW + Math.random() * cellW;
          const py = r * cellH + Math.random() * cellH;
          particles.push(new Particle(px, py));
          created++;
        }
      }
    };

    const applySoftRepulsion = () => {
      const minDist = 45;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDist && dist > 0) {
            const push = ((minDist - dist) / minDist) * 0.35;
            const nx = dx / dist;
            const ny = dy / dist;
            particles[i].x += nx * push;
            particles[i].y += ny * push;
            particles[j].x -= nx * push;
            particles[j].y -= ny * push;
          }
        }
      }
    };

    const drawLines = (isDark: boolean) => {
      const lineCounts = new Uint8Array(particles.length);
      const maxLines = 3;
      const maxDist = 95;

      for (let i = 0; i < particles.length; i++) {
        if (lineCounts[i] >= maxLines) continue;

        for (let j = i + 1; j < particles.length; j++) {
          if (lineCounts[j] >= maxLines) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            lineCounts[i]++;
            lineCounts[j]++;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${Math.max(0, 0.16 - (dist / maxDist) * 0.14)})`
              : `rgba(37, 99, 235, ${Math.max(0, 0.10 - (dist / maxDist) * 0.08)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = themeRef.current === 'dark';

      if (isDark) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#070b14');
        gradient.addColorStop(0.5, '#05080f');
        gradient.addColorStop(1, '#020305');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#eef2f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const radTR = ctx.createRadialGradient(
          canvas.width * 0.85, canvas.height * 0.12, 0,
          canvas.width * 0.85, canvas.height * 0.12, Math.max(canvas.width * 0.6, 500)
        );
        radTR.addColorStop(0, 'rgba(37, 99, 235, 0.08)');
        radTR.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = radTR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const radBL = ctx.createRadialGradient(
          canvas.width * 0.15, canvas.height * 0.88, 0,
          canvas.width * 0.15, canvas.height * 0.88, Math.max(canvas.width * 0.6, 500)
        );
        radBL.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
        radBL.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = radBL;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (mouse.x !== -1000 && mouse.y !== -1000) {
        const glowGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350);
        if (isDark) {
          glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        } else {
          glowGradient.addColorStop(0, 'rgba(37, 99, 235, 0.04)');
          glowGradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        }
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      applySoftRepulsion();

      particles.forEach(p => {
        p.update();
        p.draw(isDark);
      });
      drawLines(isDark);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] transition-colors duration-300"
      style={{ background: theme === 'dark' ? '#020305' : '#eef2f9' }}
    />
  );
};
