import { useRef, useState, useCallback } from 'react';
import './ImageCompare.css';

function ImageCompare({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforeFallback = null,
  afterFallback = null,
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = (event) => {
    containerRef.current?.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event) => {
    if (!isDragging && event.buttons === 0) return;
    updatePosition(event.clientX);
  };

  const handlePointerUp = (event) => {
    setIsDragging(false);
    if (containerRef.current?.hasPointerCapture(event.pointerId)) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((prev) => Math.max(0, prev - step));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((prev) => Math.min(100, prev + step));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`image-compare${isDragging ? ' image-compare--dragging' : ''}`}
      role="slider"
      tabIndex={0}
      aria-label="Compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div className="image-compare-layer image-compare-layer--after">
        {!afterFailed ? (
          <img
            src={afterSrc}
            alt={afterAlt}
            className="image-compare-image"
            draggable={false}
            onError={() => setAfterFailed(true)}
          />
        ) : (
          afterFallback
        )}
        <span className="image-compare-badge image-compare-badge--after">After</span>
      </div>

      <div
        className="image-compare-layer image-compare-layer--before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {!beforeFailed ? (
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="image-compare-image"
            draggable={false}
            onError={() => setBeforeFailed(true)}
          />
        ) : (
          beforeFallback
        )}
        <span className="image-compare-badge image-compare-badge--before">Before</span>
      </div>

      <div className="image-compare-divider" style={{ left: `${position}%` }} aria-hidden="true">
        <span className="image-compare-line" />
        <span className="image-compare-handle">
          <svg
            className="image-compare-handle-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14M5 12l3-3M5 12l3 3M19 12l-3-3M19 12l-3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default ImageCompare;
