
import { Gift, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BirthdayCardProps {
  name?: string;
  age?: number;
  message?: string;
}

const BirthdayCard = ({ name = "Tiana", age = 35, message = "Wishing you a day filled with happiness and joy!" }: BirthdayCardProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto animate-bounce-in border border-white/20">
      <div className="text-center space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src="/lovable-uploads/f153e137-a5f1-4967-b7af-d88ea76c804c.png" 
              alt="Tiana" 
              className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-purple-400 to-pink-400 shadow-lg"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2 animate-pulse-glow">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Birthday Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="bg-gradient-to-r from-pink-400 to-red-400 p-3 rounded-full animate-pulse-glow">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full animate-pulse-glow">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full animate-pulse-glow">
            <Star className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Main Birthday Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-dancing font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Happy Birthday
          </h1>
          <h2 className="text-4xl font-playfair font-bold text-gray-800">
            {name}!
          </h2>
          
          {/* Age Display */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-8xl font-playfair font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {age}
            </span>
            <div className="text-2xl text-gray-600">
              <div>Years of</div>
              <div className="font-semibold text-pink-500">Awesome!</div>
            </div>
          </div>
        </div>

        {/* Birthday Message */}
        <p className="text-xl text-gray-700 font-medium leading-relaxed px-4">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => {
              console.log("🎉 Celebration time!");
              // Trigger more confetti
              window.dispatchEvent(new CustomEvent('triggerConfetti'));
            }}
          >
            🎉 Let's Celebrate!
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              console.log("💝 Sending wishes...");
              alert("💝 Your birthday wishes have been sent! 🎂✨");
            }}
          >
            💝 Send Wishes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
