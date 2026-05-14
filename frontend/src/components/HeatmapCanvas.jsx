import { useEffect, useRef } from 'react';

const CANVAS_W = 1280;
const CANVAS_H = 720;
const DOT_RADIUS = 10;

export default function HeatmapCanvas({ clicks }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // light grid background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (!clicks.length) return;

    clicks.forEach(({ x, y }) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, DOT_RADIUS);
      grad.addColorStop(0,   'rgba(233, 69, 96, 0.6)');
      grad.addColorStop(0.5, 'rgba(233, 69, 96, 0.25)');
      grad.addColorStop(1,   'rgba(233, 69, 96, 0)');

      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }, [clicks]);

  return (
    <div className="overflow-auto border border-gray-200 rounded-lg bg-white">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="block"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}
