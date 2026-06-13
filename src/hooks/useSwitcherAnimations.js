import { useEffect, useRef, useState } from 'react';

export function useSwitcherAnimations({
  activeHeroType,
  heroProjectTypePick,
  navbarSwitcherStep,
  setNavbarSwitcherStep,
  hasSelectedProjectType,
}) {
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [anchorEntering, setAnchorEntering] = useState(false);
  const [stylesEntering, setStylesEntering] = useState(false);
  const skipNextTypeAnimRef = useRef(false);
  const prevActiveHeroTypeRef = useRef(activeHeroType);
  const prevHeroProjectTypePickRef = useRef(heroProjectTypePick);

  const triggerStylesEnterAnimation = () => {
    setStylesEntering(false);
    window.requestAnimationFrame(() => {
      setStylesEntering(true);
    });
  };

  useEffect(() => {
    if (!anchorEntering) return undefined;
    const timer = setTimeout(() => setAnchorEntering(false), 450);
    return () => clearTimeout(timer);
  }, [anchorEntering]);

  useEffect(() => {
    if (!stylesEntering) return undefined;
    const timer = setTimeout(() => setStylesEntering(false), 900);
    return () => clearTimeout(timer);
  }, [stylesEntering]);

  useEffect(() => {
    if (!hasSelectedProjectType) {
      setTypeMenuOpen(false);
    }
  }, [hasSelectedProjectType]);

  useEffect(() => {
    if (heroProjectTypePick === prevHeroProjectTypePickRef.current) return;

    prevHeroProjectTypePickRef.current = heroProjectTypePick;
    skipNextTypeAnimRef.current = true;

    if (navbarSwitcherStep === 'project-type') {
      setNavbarSwitcherStep('styles');
      setAnchorEntering(true);
    }

    triggerStylesEnterAnimation();
  }, [heroProjectTypePick, navbarSwitcherStep, setNavbarSwitcherStep]);

  useEffect(() => {
    if (activeHeroType === prevActiveHeroTypeRef.current) return;

    const externalChange = !skipNextTypeAnimRef.current;
    prevActiveHeroTypeRef.current = activeHeroType;
    skipNextTypeAnimRef.current = false;

    if (externalChange && navbarSwitcherStep === 'styles') {
      triggerStylesEnterAnimation();
    }
  }, [activeHeroType, navbarSwitcherStep]);

  return {
    typeMenuOpen,
    setTypeMenuOpen,
    anchorEntering,
    setAnchorEntering,
    stylesEntering,
    skipNextTypeAnimRef,
    triggerStylesEnterAnimation,
  };
}
