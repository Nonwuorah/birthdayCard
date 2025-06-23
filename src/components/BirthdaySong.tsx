
import { useEffect, useRef, useState } from 'react';

interface BirthdaySongProps {
  isPlaying: boolean;
}

const BirthdaySong = ({ isPlaying }: BirthdaySongProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const birthdayMelody = [
    { note: 264, duration: 500 }, // C4 - Happy
    { note: 264, duration: 250 }, // C4 - Birth-
    { note: 297, duration: 750 }, // D4 - day
    { note: 264, duration: 750 }, // C4 - to
    { note: 352, duration: 750 }, // F4 - you
    { note: 330, duration: 1500 }, // E4 - (hold)
    
    { note: 264, duration: 500 }, // C4 - Happy
    { note: 264, duration: 250 }, // C4 - Birth-
    { note: 297, duration: 750 }, // D4 - day
    { note: 264, duration: 750 }, // C4 - to
    { note: 396, duration: 750 }, // G4 - you
    { note: 352, duration: 1500 }, // F4 - (hold)
  ];

  const initializeAudio = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log('Created new audio context');
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
        console.log('Audio context resumed');
      }
      
      setAudioEnabled(true);
      console.log('Audio initialized successfully, state:', audioContextRef.current.state);
    } catch (error) {
      console.log('Audio initialization failed:', error);
    }
  };

  const playBirthdaySong = async () => {
    console.log('playBirthdaySong called, audioEnabled:', audioEnabled);
    
    if (!audioEnabled || !audioContextRef.current) {
      console.log('Initializing audio first...');
      await initializeAudio();
    }

    if (!audioContextRef.current) {
      console.log('Failed to create audio context');
      return;
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (audioContextRef.current.state !== 'running') {
      console.log('Audio context state:', audioContextRef.current.state);
      return;
    }

    try {
      const playNote = (frequency: number, duration: number, startTime: number) => {
        const oscillator = audioContextRef.current!.createOscillator();
        const gainNode = audioContextRef.current!.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current!.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration / 1000);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration / 1000);
      };

      let currentTime = audioContextRef.current.currentTime;
      
      birthdayMelody.forEach((note) => {
        playNote(note.note, note.duration, currentTime);
        currentTime += note.duration / 1000;
      });

      console.log('🎵 Playing birthday song!');
    } catch (error) {
      console.log('Error playing song:', error);
    }
  };

  // Auto-initialize audio on component mount and user interaction
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!audioEnabled) {
        await initializeAudio();
      }
    };

    // Try to initialize immediately
    initializeAudio();

    // Also set up interaction listeners as fallback
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      console.log('Song triggered, isPlaying:', isPlaying);
      playBirthdaySong();
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything visual
};

export default BirthdaySong;
