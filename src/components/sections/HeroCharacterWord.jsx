import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { skillList, skillThemes } from '../../skills';

const CHARACTER_STYLES = skillList.map((meta) => {
  const theme = skillThemes[meta.id];
  return {
    id: meta.id,
    color: theme.tokens['--site-accent'],
    fontFamily: theme.tokens['--site-font-head'],
    fontWeight: theme.tokens['--site-hero-headline-weight'] || '600',
  };
});

const CYCLE_MS = 7000;

function measureCharacterSlotWidth(sizerEl) {
  if (!sizerEl) return null;

  const widths = [...sizerEl.children].map((el) => el.getBoundingClientRect().width);
  return widths.length ? Math.max(...widths) : null;
}

function HeroCharacterWord() {
  const sizerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [slotWidth, setSlotWidth] = useState(null);

  useEffect(() => {
    CHARACTER_STYLES.forEach(({ id }) => {
      const theme = skillThemes[id];
      if (!theme?.fontUrl || document.getElementById(`hero-char-font-${id}`)) return;

      const link = document.createElement('link');
      link.id = `hero-char-font-${id}`;
      link.rel = 'stylesheet';
      link.href = theme.fontUrl;
      document.head.appendChild(link);
    });
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;

    const updateSlotWidth = () => {
      if (cancelled) return;
      const width = measureCharacterSlotWidth(sizerRef.current);
      if (width) setSlotWidth(width);
    };

    updateSlotWidth();
    document.fonts?.ready?.then(updateSlotWidth);

    window.addEventListener('resize', updateSlotWidth);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', updateSlotWidth);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % CHARACTER_STYLES.length);
      setAnimKey((k) => k + 1);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, []);

  const style = CHARACTER_STYLES[index];

  return (
    <>
      <span ref={sizerRef} className="hero-headline-character-sizer" aria-hidden="true">
        {CHARACTER_STYLES.map((variant) => (
          <span
            key={variant.id}
            style={{
              fontFamily: variant.fontFamily,
              fontWeight: variant.fontWeight,
            }}
          >
            Character
          </span>
        ))}
      </span>
      <span
        className="hero-headline-character"
        style={{
          color: style.color,
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight,
          width: slotWidth ? `${slotWidth}px` : undefined,
        }}
      >
        <span
          key={animKey}
          className={`hero-headline-character-inner${animKey > 0 ? ' hero-headline-character-inner--animate' : ''}`}
        >
          Character
        </span>
      </span>
    </>
  );
}

export default HeroCharacterWord;
