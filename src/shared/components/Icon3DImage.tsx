import React from 'react';
import { motion } from 'framer-motion';

// Import 3D icons
import calendarIcon from '../../assets/3d_icons/calender.png';
import giftIcon from '../../assets/3d_icons/gift.png';
import notebookIcon from '../../assets/3d_icons/notebook.png';
import starIcon from '../../assets/3d_icons/star.png';
import targetIcon from '../../assets/3d_icons/target.png';
import trophyIcon from '../../assets/3d_icons/trophy.png';
import zapIcon from '../../assets/3d_icons/zap.png';

export type Icon3DType = 'calendar' | 'gift' | 'notebook' | 'star' | 'target' | 'trophy' | 'zap';

interface Icon3DImageProps {
  type: Icon3DType;
  size?: number;
  className?: string;
  hover?: boolean;
  float?: boolean;
}

const iconMap: Record<Icon3DType, string> = {
  calendar: calendarIcon,
  gift: giftIcon,
  notebook: notebookIcon,
  star: starIcon,
  target: targetIcon,
  trophy: trophyIcon,
  zap: zapIcon,
};

export const Icon3DImage = ({ 
  type, 
  size = 48, 
  className = '',
  hover = true,
  float = false
}: Icon3DImageProps) => {
  const iconSrc = iconMap[type];

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ perspective: '1000px' }}
      animate={float ? {
        y: [0, -8, 0],
        rotateY: [0, 5, -5, 0],
      } : {}}
      transition={float ? {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      } : {}}
      whileHover={hover ? {
        scale: 1.1,
        rotateY: 10,
        rotateX: -5,
      } : {}}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(10px)',
        }}
      >
        {/* Subtle shadow */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'translateZ(-5px) translateY(3px)',
            filter: 'blur(4px)',
            opacity: 0.15,
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%',
            width: size,
            height: size,
          }}
        />
        
        {/* Main icon */}
        <img
          src={iconSrc}
          alt={type}
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
            transform: 'translateZ(10px)',
          }}
          className="relative"
        />
      </div>
    </motion.div>
  );
};
