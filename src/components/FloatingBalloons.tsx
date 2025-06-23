
const FloatingBalloons = () => {
  const balloons = [
    { color: '#ff6b6b', delay: 0 },
    { color: '#4ecdc4', delay: 1 },
    { color: '#45b7d1', delay: 2 },
    { color: '#f9ca24', delay: 3 },
    { color: '#e74c3c', delay: 4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {balloons.map((balloon, index) => (
        <div
          key={index}
          className="absolute animate-balloon-float"
          style={{
            left: `${10 + index * 20}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        >
          <div
            className="w-16 h-20 rounded-full relative shadow-lg"
            style={{ backgroundColor: balloon.color }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gray-400"></div>
            <div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full opacity-30"
              style={{ backgroundColor: 'white' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
