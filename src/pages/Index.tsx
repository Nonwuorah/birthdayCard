
import { useEffect, useState } from 'react';
import ConfettiBlast from '../components/ConfettiBlast';
import FloatingBalloons from '../components/FloatingBalloons';
import BirthdayCard from '../components/BirthdayCard';
import BirthdaySong from '../components/BirthdaySong';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playSong, setPlaySong] = useState(false);

  useEffect(() => {
    // Auto-hide initial confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    // Set up automatic confetti every 30 seconds
    const confettiInterval = setInterval(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 30000);

    // Listen for manual confetti trigger
    const handleConfettiTrigger = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    };
    window.addEventListener('triggerConfetti', handleConfettiTrigger);

    // Play birthday song every 45 seconds if not muted
    const songInterval = setInterval(() => {
      if (!isMuted) {
        console.log('Auto-triggering song');
        setPlaySong(true);
        setTimeout(() => setPlaySong(false), 1000);
      }
    }, 45000);

    // Initial song play after 2 seconds
    const initialSong = setTimeout(() => {
      if (!isMuted) {
        console.log('Initial song trigger');
        setPlaySong(true);
        setTimeout(() => setPlaySong(false), 1000);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(initialSong);
      clearInterval(confettiInterval);
      clearInterval(songInterval);
      window.removeEventListener('triggerConfetti', handleConfettiTrigger);
    };
  }, [isMuted]);

  const triggerCelebration = () => {
    console.log('Manual celebration triggered');
    setShowConfetti(true);
    if (!isMuted) {
      setPlaySong(true);
      setTimeout(() => setPlaySong(false), 1000);
    }
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-confetti-gradient opacity-20"></div>
      
      {/* Birthday Song Component */}
      <BirthdaySong isPlaying={playSong && !isMuted} />
      
      {/* Floating Balloons */}
      <FloatingBalloons />
      
      {/* Confetti Effect */}
      {showConfetti && <ConfettiBlast />}
      
      {/* Control Buttons */}
      <div className="absolute top-6 right-6 z-40 flex gap-3">
        <Button
          onClick={() => {
            console.log('Mute toggled:', !isMuted);
            setIsMuted(!isMuted);
          }}
          variant="outline"
          size="icon"
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        <Button
          onClick={triggerCelebration}
          variant="outline"
          size="icon"
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full"
        >
          <Sparkles className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header Animation */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-4">
            <span className="text-6xl">🎂</span>
          </div>
          <h1 className="text-2xl md:text-3xl text-white font-semibold mb-2 font-playfair">
            It's time to celebrate!
          </h1>
          <p className="text-white/80 text-lg">
            Another year of amazing memories begins today
          </p>
        </div>

        {/* Birthday Card */}
        <div className="w-full max-w-4xl">
          <BirthdayCard 
            name="Tiana"
            age={35}
            message="May this special day bring you endless joy, wonderful surprises, and all the happiness your heart can hold. Here's to another year of incredible adventures and beautiful moments!"
          />
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 animate-slide-up">
          <p className="text-white/90 text-lg font-dancing font-semibold">
            ✨ Make every moment magical ✨
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
};

export default Index;
