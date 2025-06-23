
import { useEffect, useState } from 'react';

const ConfettiBlast = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; color: string; left: number; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#e74c3c', '#9b59b6', '#2ecc71'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            backgroundColor: piece.color,
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiBlast;
