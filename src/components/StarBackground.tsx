import { useEffect, useRef } from 'react';

type StarBackgroundProps = {
  position?: 'fixed' | 'absolute';
  opacity?: number;
  zIndex?: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
};

const StarBackground = ({ position = 'fixed', opacity = 0.6, zIndex = 1, blendMode = 'normal' }: StarBackgroundProps) => {
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

    const makeStars = () => {
      stars.length = 0;
      const area = window.innerWidth * window.innerHeight;
      // density tuned for visibility but performance-friendly
      const density = 0.00020; // stars per px
      const total = Math.floor(area * density);
      for (let i = 0; i < total; i++) {
        const depth = Math.random(); // 0 near, 1 far (we'll invert for speed)
        const size = 0.6 + (1 - depth) * 2.0; // nearer looks bigger
        const speed = 0.05 + (1 - depth) * 0.3; // nearer moves faster
        const color = palette[(Math.random() * palette.length) | 0];
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: size,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          baseAlpha: 0.35 + Math.random() * 0.45,
          twinkleAmp: 0.15 + Math.random() * 0.35,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
          depth
        });
      }
    };
    makeStars();

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
