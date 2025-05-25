"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface MobileOptimizedHeroProps {
  onGetStarted: () => void;
}

export default function MobileOptimizedHero({ onGetStarted }: MobileOptimizedHeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      // On mobile, don't autoplay to save data and battery
      if (!isMobile) {
        video.play().catch(() => {
          setShowPlayButton(true);
        });
      } else {
        setShowPlayButton(true);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isMobile]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {
        console.log('Video play failed');
      });
    }
  };

  return (
    <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/emineon/video/upload/f_auto,q_auto/Homepage_hero_video_dsn3zo.mp4"
        autoPlay={!isMobile}
        loop
        muted
        playsInline
        preload={isMobile ? "metadata" : "auto"}
        poster="/hero-poster.jpg" // Add a poster image for better loading experience
      />

      {/* Fallback Background for when video fails to load */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-emineon-blue via-emineon-light to-emineon-blue z-0 transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Play Button for Mobile */}
      {showPlayButton && (
        <button
          onClick={togglePlay}
          className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
      )}

      {/* Content */}
      <div className="container relative z-20 flex flex-col lg:flex-row items-center gap-12 py-20 md:py-28">
        <div className="space-y-6 lg:w-1/2 text-center lg:text-left">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            Your partner in growth<br className="hidden md:block" /> and innovation
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-xl mx-auto lg:mx-0 drop-shadow-md"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            At Emineon Consulting, we specialize in optimizing operations, driving sustainable growth, and delivering tailored services across industries.
          </motion.p>
          <motion.div 
            className="pt-4"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          >
            <p className="text-base sm:text-lg font-medium text-emineon-orange tracking-widest lowercase mb-2">forge your edge.</p>
            <p className="text-sm text-white/80 italic">
              [fɔːdʒ] verb – create (something) strong, enduring, or successful.
            </p>
          </motion.div>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4 items-center lg:items-start justify-center lg:justify-start"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-emineon-orange hover:bg-emineon-orange/90 text-white rounded-none px-8 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={onGetStarted}
            >
              Get started
            </Button>
          </motion.div>
        </div>
        <div className="lg:w-1/2 hidden lg:block" />
      </div>

      {/* Mobile Data Usage Warning */}
      {isMobile && !isPlaying && (
        <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/50 backdrop-blur-sm text-white text-xs p-3 rounded-lg">
          <p className="text-center">
            Tap the play button to watch the background video. Data charges may apply.
          </p>
        </div>
      )}
    </section>
  );
} 