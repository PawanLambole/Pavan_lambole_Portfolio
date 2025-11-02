import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  formationTime: number;
}

interface Planet {
  angle: number;
  distance: number;
  size: number;
  color: string;
  speed: number;
}

const BigBangAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Animation phases
    let phase = 0; // 0: Big Bang, 1: Nebula, 2: Star Formation, 3: Solar System
    let phaseTime = 0;
    const PHASE_DURATIONS = [3000, 4000, 5000, 10000]; // Duration of each phase in ms
    let startTime = Date.now();

    // Particles for Big Bang explosion
    const particles: Particle[] = [];
    const MAX_PARTICLES = 500;

    // Stars forming from nebula
    const formingStars: Star[] = [];
    const MAX_STARS = 150;

    // Solar system
    const sun = { x: centerX, y: centerY, size: 0, maxSize: 40 };
    const planets: Planet[] = [
      { angle: 0, distance: 80, size: 8, color: '#8B7355', speed: 0.02 }, // Mercury
      { angle: Math.PI / 3, distance: 110, size: 12, color: '#FFA500', speed: 0.015 }, // Venus
      { angle: Math.PI, distance: 150, size: 14, color: '#4169E1', speed: 0.01 }, // Earth
      { angle: Math.PI * 1.5, distance: 190, size: 10, color: '#CD5C5C', speed: 0.008 }, // Mars
      { angle: Math.PI / 6, distance: 280, size: 28, color: '#DAA520', speed: 0.005 }, // Jupiter
      { angle: Math.PI * 0.8, distance: 350, size: 24, color: '#F4A460', speed: 0.004 }, // Saturn
    ];

    // Initialize Big Bang particles
    const createBigBangParticles = () => {
      particles.length = 0;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          color: ['#FFD700', '#FF6B35', '#F7931E', '#FFFFFF', '#FFA500'][Math.floor(Math.random() * 5)],
          alpha: 1,
          life: 1,
        });
      }
    };

    // Create nebula clouds
    const createNebulaClouds = () => {
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * Math.min(width, height) * 0.4;
        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 20 + 10,
          color: ['#9370DB', '#8A2BE2', '#4B0082', '#6A5ACD'][Math.floor(Math.random() * 4)],
          alpha: 0.3,
          life: 1,
        });
      }
    };

    // Create forming stars
    const createFormingStars = () => {
      formingStars.length = 0;
      for (let i = 0; i < MAX_STARS; i++) {
        formingStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          color: Math.random() > 0.7 ? '#FFD700' : '#FFFFFF',
          alpha: 0,
          formationTime: Math.random() * 2000,
        });
      }
    };

    createBigBangParticles();

    const drawGlow = (x: number, y: number, size: number, color: string, alpha: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
      gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      phaseTime = elapsed;

      // Clear canvas with very dark background
      ctx.fillStyle = 'rgba(5, 5, 15, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Update phase
      let totalDuration = 0;
      for (let i = 0; i < PHASE_DURATIONS.length; i++) {
        totalDuration += PHASE_DURATIONS[i];
        if (elapsed < totalDuration) {
          if (phase !== i) {
            phase = i;
            if (phase === 1) createNebulaClouds();
            if (phase === 2) createFormingStars();
          }
          break;
        }
      }

      // Reset animation after all phases
      if (elapsed > totalDuration) {
        startTime = currentTime;
        phase = 0;
        createBigBangParticles();
        particles.length = MAX_PARTICLES; // Keep only Big Bang particles
      }

      // PHASE 0: Big Bang Explosion
      if (phase === 0) {
        // Draw initial flash
        const flashAlpha = Math.max(0, 1 - elapsed / 500);
        if (flashAlpha > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
          ctx.fillRect(0, 0, width, height);
        }

        // Draw and update explosion particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.005;
          p.alpha = Math.max(0, p.life);

          if (p.alpha > 0) {
            drawGlow(p.x, p.y, p.size * 3, p.color, p.alpha * 0.5);
            ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // PHASE 1: Nebula Formation
      if (phase === 1) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle swirling motion
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 50) {
            p.vx += (dx / distance) * 0.01;
            p.vy += (dy / distance) * 0.01;
          }

          // Draw nebula clouds
          drawGlow(p.x, p.y, p.size * 2, p.color, p.alpha);
          ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // PHASE 2: Star Formation
      if (phase === 2) {
        const phaseElapsed = elapsed - PHASE_DURATIONS[0] - PHASE_DURATIONS[1];
        
        // Fade out nebula
        particles.forEach((p) => {
          p.alpha = Math.max(0, p.alpha - 0.002);
          if (p.alpha > 0) {
            drawGlow(p.x, p.y, p.size, p.color, p.alpha * 0.5);
          }
        });

        // Form stars
        formingStars.forEach((star) => {
          if (phaseElapsed > star.formationTime) {
            star.alpha = Math.min(1, star.alpha + 0.01);
            
            if (star.alpha > 0) {
              // Star glow
              drawGlow(star.x, star.y, star.size * 4, star.color, star.alpha * 0.3);
              
              // Star core
              ctx.fillStyle = star.color.replace(')', `, ${star.alpha})`).replace('rgb', 'rgba');
              ctx.beginPath();
              ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      }

      // PHASE 3: Solar System Formation
      if (phase === 3) {
        const phaseElapsed = elapsed - PHASE_DURATIONS[0] - PHASE_DURATIONS[1] - PHASE_DURATIONS[2];
        
        // Keep distant stars twinkling
        formingStars.forEach((star) => {
          star.alpha = 0.3 + Math.sin(Date.now() * 0.001 + star.x) * 0.2;
          ctx.fillStyle = star.color.replace(')', `, ${star.alpha})`).replace('rgb', 'rgba');
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Grow the sun
        sun.size = Math.min(sun.maxSize, (phaseElapsed / 2000) * sun.maxSize);
        
        if (sun.size > 0) {
          // Sun glow
          drawGlow(sun.x, sun.y, sun.size * 3, '#FFA500', 0.6);
          
          // Sun core
          const sunGradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.size);
          sunGradient.addColorStop(0, '#FFF4E6');
          sunGradient.addColorStop(0.5, '#FFD700');
          sunGradient.addColorStop(1, '#FF8C00');
          ctx.fillStyle = sunGradient;
          ctx.beginPath();
          ctx.arc(sun.x, sun.y, sun.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Orbit and draw planets
        if (phaseElapsed > 1000) {
          planets.forEach((planet) => {
            planet.angle += planet.speed;

            const px = sun.x + Math.cos(planet.angle) * planet.distance;
            const py = sun.y + Math.sin(planet.angle) * planet.distance;

            // Orbit path
            ctx.strokeStyle = 'rgba(100, 100, 150, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, planet.distance, 0, Math.PI * 2);
            ctx.stroke();

            // Planet glow
            drawGlow(px, py, planet.size * 1.5, planet.color, 0.3);

            // Planet
            ctx.fillStyle = planet.color;
            ctx.beginPath();
            ctx.arc(px, py, planet.size, 0, Math.PI * 2);
            ctx.fill();

            // Planet highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(px - planet.size * 0.3, py - planet.size * 0.3, planet.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default BigBangAnimation;
