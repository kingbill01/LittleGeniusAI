import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp as ArrowUpIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ScrollToTopButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  showThreshold?: number; // Seuil en pixels pour afficher le bouton
  bottom?: number;
  right?: number;
}

/**
 * Bouton flottant "Retour en haut" qui apparaît quand l'utilisateur
 * fait défiler vers le bas et permet de remonter en douceur
 */
export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollContainerRef,
  showThreshold = 300,
  bottom = 24,
  right = 24,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        setIsVisible(scrollTop > showThreshold);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollContainerRef, showThreshold]);

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Zoom in={isVisible}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom,
          right,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          size="medium"
          onClick={handleScrollToTop}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          }}
        >
          <ArrowUpIcon />
        </Fab>
      </motion.div>
    </Zoom>
  );
};

export default ScrollToTopButton;