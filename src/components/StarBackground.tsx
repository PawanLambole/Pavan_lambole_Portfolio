import { useEffect, useRef } from 'react';

type StarBackgroundProps = {
  position?: 'fixed' | 'absolute';
  opacity?: number;
  zIndex?: number;
};

const StarBackground = ({ position = 'fixed', opacity = 0.8, zIndex = 1 }: StarBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      opacity: number;
      fadeDirection: number;
      color: string;
    }

    const stars: Star[] = [];
    // Increase star count for visibility
    const starCount = 350;
    const palette = [
      '255, 255, 255', // white
      '255, 153, 51', // saffron/orange
      '66, 133, 244', // light blue
      '19, 136, 8' // light green-ish
    ];

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() * 3 + 1.2; // larger stars
      const color = palette[Math.floor(Math.random() * palette.length)];
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.5,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        color
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Update opacity for twinkling effect
        star.opacity += star.fadeDirection * 0.015;
        if (star.opacity <= 0.3 || star.opacity >= 1) {
          star.fadeDirection *= -1;
        }

  // Draw star with glow effect and color
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

  // Add colored glow
  const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
  gradient.addColorStop(0, `rgba(${star.color}, ${Math.min(1, star.opacity)})`);
  gradient.addColorStop(0.4, `rgba(${star.color}, ${Math.min(0.6, star.opacity * 0.6)})`);
  gradient.addColorStop(1, `rgba(${star.color}, 0)`);

  ctx.fillStyle = gradient;
  ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${position} top-0 left-0 w-full h-full pointer-events-none`}
      style={{ zIndex, opacity }}
    />
  );
};

export default StarBackground;
