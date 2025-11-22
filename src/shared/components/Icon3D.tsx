import React from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

interface Icon3DProps {
  icon: React.ComponentType<IconProps>;
  size?: number;
  color?: string;
  className?: string;
  hover?: boolean;
  depth?: number;
}

export const Icon3D = ({ 
  icon: Icon, 
  size = 24, 
  color = 'currentColor',
  className = '',
  hover = true,
  depth = 8
}: Icon3DProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      whileHover={hover ? { scale: 1.1, rotateY: 15 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle shadow layer */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translateZ(-${depth}px) translateY(${depth / 2}px)`,
            filter: 'blur(3px)',
            background: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Main icon with 3D effect */}
        <div
          style={{
            transform: `translateZ(${depth}px)`,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
          }}
        >
          <Icon 
            size={size} 
            color={color}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced 3D icon with gradient and glow
interface Icon3DEnhancedProps extends Icon3DProps {
  gradient?: string;
  glow?: boolean;
  glowColor?: string;
}

export const Icon3DEnhanced = ({
  icon: Icon,
  size = 24,
  gradient,
  glow = false,
  glowColor = '#6366f1',
  className = '',
  hover = true,
  depth = 12,
}: Icon3DEnhancedProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      whileHover={hover ? { 
        scale: 1.15, 
        rotateY: 20,
        rotateX: -5,
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow effect - more subtle */}
        {glow && (
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: `blur(8px)`,
              background: glowColor,
              borderRadius: '50%',
              transform: `translateZ(-${depth}px)`,
              width: size * 1.5,
              height: size * 1.5,
              left: '50%',
              top: '50%',
              marginLeft: -size * 0.75,
              marginTop: -size * 0.75,
              opacity: 0.3,
            }}
          />
        )}

        {/* Single subtle shadow layer */}
        <div
          className="absolute"
          style={{
            transform: `translateZ(-${depth}px) translateY(${depth * 0.3}px)`,
            filter: `blur(3px)`,
            opacity: 0.1,
          }}
        >
          <Icon 
            size={size} 
            color={glowColor}
            style={{ opacity: 0.3 }}
          />
        </div>

        {/* Main icon */}
        <div
          style={{
            transform: `translateZ(${depth}px)`,
            filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`,
            background: gradient || 'transparent',
            WebkitBackgroundClip: gradient ? 'text' : 'unset',
            WebkitTextFillColor: gradient ? 'transparent' : 'unset',
            backgroundClip: gradient ? 'text' : 'unset',
          }}
        >
          <Icon 
            size={size} 
            color={gradient ? undefined : glowColor}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Floating 3D icon with animation
interface FloatingIcon3DProps extends Icon3DProps {
  float?: boolean;
}

export const FloatingIcon3D = ({
  icon: Icon,
  size = 24,
  color = 'currentColor',
  className = '',
  float = true,
  depth = 10,
}: FloatingIcon3DProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      animate={float ? {
        y: [0, -10, 0],
        rotateY: [0, 360],
      } : {}}
      transition={float ? {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      } : {}}
      whileHover={{
        scale: 1.2,
        rotateY: 180,
        rotateX: 10,
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateZ(${depth}px) rotateX(15deg)`,
        }}
      >
        {/* Subtle shadow */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateZ(-${depth}px) translateY(${depth * 0.3}px)`,
            filter: 'blur(4px)',
            background: 'rgba(0, 0, 0, 0.15)',
            opacity: 0.08,
          }}
        />
        
        {/* Icon */}
        <Icon 
          size={size} 
          color={color}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          }}
        />
      </div>
    </motion.div>
  );
};
