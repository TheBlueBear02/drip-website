import { useState, useEffect } from 'react';
import MiniPreview from '../ui/MiniPreview';
import ImageCompare from '../ui/ImageCompare';
import { useInView } from '../../hooks/useInView';
import './BeforeAfter.css';

const BEFORE_IMAGE = 'proof/before.png';
const AFTER_IMAGE = 'proof/after.png';

const FALLBACK_AFTER_PREVIEW = 'styles preview/linear modern.png';
const SHOW_INTERACTIVE_COMPARE = false;

function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;
}

function ProofPanel({ label, imagePath, fallback, caption, isVisible, revealDelay = 0 }) {
  const [useFallback, setUseFallback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const src = assetUrl(imagePath);
  const showLoaded = useFallback || imageLoaded;

  useEffect(() => {
    if (useFallback) {
      setImageLoaded(true);
    }
  }, [useFallback]);

  const handleImageRef = (element) => {
    if (element?.complete && element.naturalHeight > 0) {
      setImageLoaded(true);
    }
  };

  return (
    <div
      className={`before-after-panel${isVisible ? ' before-after-panel--visible' : ''}`}
      style={{ '--before-after-reveal-delay': `${revealDelay}ms` }}
    >
      <p className="before-after-label">{label}</p>
      <div
        className={`before-after-frame${showLoaded ? ' before-after-frame--loaded' : ' before-after-frame--loading'}`}
      >
        {!useFallback ? (
          <img
            ref={handleImageRef}
            src={src}
            alt={label}
            className={`before-after-image${imageLoaded ? ' before-after-image--loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setUseFallback(true)}
          />
        ) : (
          <div className="before-after-fallback before-after-fallback--loaded">{fallback}</div>
        )}
      </div>
      {caption && <p className="before-after-caption">{caption}</p>}
    </div>
  );
}

function BeforeAfter() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  const [afterPreviewFailed, setAfterPreviewFailed] = useState(false);
  const fallbackAfterSrc = assetUrl(FALLBACK_AFTER_PREVIEW);
  const beforeSrc = assetUrl(BEFORE_IMAGE);
  const afterSrc = assetUrl(AFTER_IMAGE);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setAfterPreviewFailed(false);
    img.onerror = () => setAfterPreviewFailed(true);
    img.src = fallbackAfterSrc;
  }, [fallbackAfterSrc]);

  const afterFallback = afterPreviewFailed ? (
    <MiniPreview variant="styled" />
  ) : (
    <img
      src={fallbackAfterSrc}
      alt="With getDRIP skill applied"
      onError={() => setAfterPreviewFailed(true)}
    />
  );

  return (
    <section
      ref={sectionRef}
      id="proof"
      className={`before-after${isInView ? ' before-after--visible' : ''}`}
    >
      <div className="container">
        <h2 className="before-after-title">Before and after</h2>
        <p className="before-after-subtitle">
          The same app logic—with and without a design system your agent can follow.
        </p>
        <div className="before-after-grid">
          <ProofPanel
            label="Default agent output"
            imagePath={BEFORE_IMAGE}
            caption="Generic layout, default fonts, inconsistent components"
            fallback={<MiniPreview variant="generic" />}
            isVisible={isInView}
            revealDelay={320}
          />
          <ProofPanel
            label="With getDRIP skill"
            imagePath={AFTER_IMAGE}
            caption="Cohesive tokens, typography, and component patterns"
            fallback={afterFallback}
            isVisible={isInView}
            revealDelay={520}
          />
        </div>

        {SHOW_INTERACTIVE_COMPARE && (
          <div className="before-after-compare">
            <p className="before-after-compare-label">Interactive comparison</p>
            <p className="before-after-compare-hint">Drag the divider to reveal before and after in the same frame</p>
            <ImageCompare
              beforeSrc={beforeSrc}
              afterSrc={afterSrc}
              beforeAlt="Default agent output"
              afterAlt="With getDRIP skill applied"
              beforeFallback={<MiniPreview variant="generic" />}
              afterFallback={afterFallback}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default BeforeAfter;
