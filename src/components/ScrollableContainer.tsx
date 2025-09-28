import React, { forwardRef } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import ScrollToTopButton from './ScrollToTopButton';
import useScroll from '../hooks/useScroll';

interface ScrollableContainerProps {
  children: React.ReactNode;
  maxHeight?: string | number;
  sx?: SxProps<Theme>;
  className?: string;
  showScrollToTop?: boolean;
  scrollToTopThreshold?: number;
}

/**
 * Composant conteneur scrollable réutilisable pour uniformiser
 * le comportement de scroll dans toute l'application LittleGenius AI
 */
export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  maxHeight = '80vh',
  sx = {},
  className,
  showScrollToTop = false,
  scrollToTopThreshold = 300,
}) => {
  const { scrollContainerRef } = useScroll();

  return (
    <>
      <Box
        ref={scrollContainerRef}
        className={className}
        sx={{
          maxHeight,
          overflowY: 'auto',
          overflowX: 'hidden',
          // Style personnalisé pour la scrollbar
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(102, 126, 234, 0.6)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(102, 126, 234, 0.8)',
            },
          },
          // Style pour Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(102, 126, 234, 0.6) rgba(0,0,0,0.1)',
          // Padding pour éviter que le contenu touche la scrollbar
          pr: 1,
          // Smooth scrolling
          scrollBehavior: 'smooth',
          ...sx,
        }}
      >
        {children}
      </Box>
      
      {showScrollToTop && (
        <ScrollToTopButton 
          scrollContainerRef={scrollContainerRef} 
          showThreshold={scrollToTopThreshold}
        />
      )}
    </>
  );
};

export default ScrollableContainer;