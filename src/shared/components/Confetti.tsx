import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const Confetti = ({ trigger, onComplete }: ConfettiProps) => {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    color: string;
    size: number;
    delay: number;
    duration: number;
    rotation: number;
    angle: number;
    distance: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      // Generate particles that spread from center in all directions
      const newParticles = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        color: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#a855f7', '#6366f1', '#10b981', '#06b6d4', '#f97316', '#84cc16', '#eab308', '#22c55e'][Math.floor(Math.random() * 12)],
        size: Math.random() * 20 + 15, // Bigger particles: 15-35px
        delay: Math.random() * 0.3,
        duration: 2.5 + Math.random() * 1.5,
        rotation: Math.random() * 360,
        angle: Math.random() * 360, // Angle in degrees for direction (0-360)
        distance: 100 + Math.random() * 50, // Distance to travel (100-150vh)
      }));
      
      setParticles(newParticles);
      setIsActive(true);
      
      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        onComplete?.();
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setIsActive(false);
      setParticles([]);
    }
  }, [trigger, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      {particles.map((particle) => {
        // Calculate end position based on angle and distance
        // Convert angle to radians and calculate x, y offsets
        const radians = (particle.angle * Math.PI) / 180;
        const endX = 50 + Math.cos(radians) * (particle.distance / 2);
        const endY = 50 + Math.sin(radians) * (particle.distance / 2);

        return (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              rotate: particle.rotation,
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              x: `${endX - 50}vw`,
              y: `${endY - 50}vh`,
              rotate: particle.rotation + (Math.random() > 0.5 ? 1080 : -1080),
              opacity: [1, 1, 1, 0.8, 0],
              scale: [0.5, 1.2, 1, 0.9, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '6px',
              boxShadow: `0 0 ${particle.size / 2}px ${particle.color}, 0 0 ${particle.size}px ${particle.color}60`,
              left: '50%',
              top: '50%',
              marginLeft: `-${particle.size / 2}px`,
              marginTop: `-${particle.size / 2}px`,
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
};