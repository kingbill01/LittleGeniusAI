import { useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour gérer le scroll automatique et les fonctionnalités
 * liées au défilement dans l'application LittleGenius AI
 */
export const useScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Fait défiler automatiquement vers le haut du conteneur
   */
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Fait défiler automatiquement vers le bas du conteneur
   */
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Fait défiler vers un élément spécifique dans le conteneur
   */
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const elementTop = element.offsetTop;
      const containerTop = container.offsetTop;
      
      container.scrollTo({
        top: elementTop - containerTop - 20, // 20px de marge
        behavior: 'smooth'
      });
    }
  };

  /**
   * Vérifie si l'utilisateur est en bas du conteneur
   */
  const isAtBottom = (): boolean => {
    if (!scrollContainerRef.current) return false;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    return Math.abs(scrollHeight - clientHeight - scrollTop) < 5;
  };

  /**
   * Vérifie si l'utilisateur est en haut du conteneur
   */
  const isAtTop = (): boolean => {
    if (!scrollContainerRef.current) return false;
    return scrollContainerRef.current.scrollTop < 5;
  };

  /**
   * Obtient la position de scroll actuelle en pourcentage (0-100)
   */
  const getScrollPercentage = (): number => {
    if (!scrollContainerRef.current) return 0;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    
    if (maxScroll <= 0) return 0;
    return Math.round((scrollTop / maxScroll) * 100);
  };

  return {
    scrollContainerRef,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    isAtBottom,
    isAtTop,
    getScrollPercentage,
  };
};

export default useScroll;