import { useEffect, useRef } from 'react';

type StarBackgroundProps = {
  position?: 'fixed' | 'absolute';
  opacity?: number;
  zIndex?: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
  isDark?: boolean;
};

const StarBackground = ({ 
  position = 'fixed', 
  opacity = 0.7, 
  zIndex = 1, 
  blendMode = 'screen',
  isDark = true 
}: StarBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crispness
    const resizeCanvas = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    interface Star {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      twinkleAmp: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string; // rgb
      depth: number; // 0..1 (parallax)
    }

    const stars: Star[] = [];
    const palette = [
      '255,255,255', // white
      '173,216,255', // soft blue
      '255,230,150', // yellow
      '255,180,220', // pink
      '200,170,255' // faint purple
    ];

    // Meteor properties
    interface Meteor {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      opacity: number;
      life: number;
      maxLife: number;
      color: string;
    }
    
    const meteors: Meteor[] = [];

    const makeStars = () => {
      stars.length = 0;
      const area = window.innerWidth * window.innerHeight;
      // Increased density for better visibility
      const density = isDark ? 0.00035 : 0.00025;
      const total = Math.floor(area * density);
      for (let i = 0; i < total; i++) {
        const depth = Math.random();
        const size = 0.8 + (1 - depth) * 2.5; // Larger stars
        const speed = 0.08 + (1 - depth) * 0.4;
        const color = palette[(Math.random() * palette.length) | 0];
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: size,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          baseAlpha: isDark ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.4,
          twinkleAmp: 0.2 + Math.random() * 0.4,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          depth
        });
      }
    };
    makeStars();
    
    // Spawn meteors occasionally from random positions
    const spawnMeteor = () => {
      if (meteors.length < 5 && Math.random() < 0.035) {
        const meteorColors = ['255,255,255', '173,216,255', '255,230,150'];
        
        // Random spawn position: can start from any edge
        const spawnSide = Math.random();
        let startX, startY, vx, vy;
        
        if (spawnSide < 0.5) {
          // Spawn from top, moving diagonally down
          startX = Math.random() * window.innerWidth;
          startY = -50;
          vx = (Math.random() - 0.5) * 6;
          vy = 2 + Math.random() * 4;
        } else {
          // Spawn from right/top-right, moving diagonally left-down
          startX = window.innerWidth + 50;
          startY = Math.random() * window.innerHeight * 0.5;
          vx = -(3 + Math.random() * 5);
          vy = 1 + Math.random() * 4;
        }
        
        meteors.push({
          x: startX,
          y: startY,
          vx: vx,
          vy: vy,
          length: 50 + Math.random() * 70,
          opacity: 0.9 + Math.random() * 0.1,
          life: 0,
          maxLife: 2 + Math.random() * 2,
          color: meteorColors[(Math.random() * meteorColors.length) | 0]
        });
      }
    };

    // Rebuild stars after resize so density matches area
    const handleResize = () => {
      resizeCanvas();
      makeStars();
    };
    window.addEventListener('resize', handleResize);

    let last = performance.now();
    // Animation loop
    const animate = () => {
      const now = performance.now();
      const dt = Math.min(50, now - last) / 1000; // cap delta for stability
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Try to spawn meteors
      spawnMeteor();

      // Draw and update stars
      stars.forEach((star) => {
        // Update position with delta time
        star.x += star.vx * (60 * dt);
        star.y += star.vy * (60 * dt);

        // Wrap around edges
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (star.x < -5) star.x = w + 5;
        if (star.x > w + 5) star.x = -5;
        if (star.y < -5) star.y = h + 5;
        if (star.y > h + 5) star.y = -5;

        // Twinkling using smooth sinusoidal modulation
        const alpha = star.baseAlpha + Math.sin(now * 0.001 * star.twinkleSpeed + star.twinklePhase) * star.twinkleAmp;
        const a = Math.max(0.15, Math.min(1, alpha));

        // Draw star with colored glow
        const r = star.radius;
        const gx = star.x;
        const gy = star.y;
        const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, r * 3.2);
        gradient.addColorStop(0, `rgba(${star.color}, ${a})`);
        gradient.addColorStop(0.45, `rgba(${star.color}, ${a * 0.6})`);
        gradient.addColorStop(1, `rgba(${star.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(gx, gy, r * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw and update meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * (60 * dt);
        m.y += m.vy * (60 * dt);
        m.life += dt;
        
        // Remove if off-screen or expired
        if (m.x < -200 || m.y > window.innerHeight + 100 || m.life > m.maxLife) {
          meteors.splice(i, 1);
          continue;
        }
        
        // Fade out towards end of life
        const fadeAlpha = m.life < m.maxLife * 0.2 
          ? m.life / (m.maxLife * 0.2) 
          : m.life > m.maxLife * 0.8 
            ? 1 - ((m.life - m.maxLife * 0.8) / (m.maxLife * 0.2))
            : 1;
        const alpha = m.opacity * fadeAlpha;
        
        // Draw meteor trail with gradient
        const tailLength = m.length;
        const angle = Math.atan2(m.vy, m.vx);
        const endX = m.x - Math.cos(angle) * tailLength;
        const endY = m.y - Math.sin(angle) * tailLength;
        
        // Glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${m.color}, ${alpha * 0.8})`;
        
        const grad = ctx.createLinearGradient(m.x, m.y, endX, endY);
        grad.addColorStop(0, `rgba(${m.color}, ${alpha})`);
        grad.addColorStop(0.5, `rgba(${m.color}, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${m.color}, 0)`);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${position} top-0 left-0 w-full h-full pointer-events-none`}
      style={{ zIndex, opacity, mixBlendMode: blendMode }}
    />
  );
};

export default StarBackground;
