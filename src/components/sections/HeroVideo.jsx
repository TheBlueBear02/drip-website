import { useMemo, useRef, useState } from 'react';
import './HeroVideo.css';

const VIDEO_POSTER_IMAGE = 'proof/after.png';

/** Normalize env paths (e.g. public\proof\demo.mp4 → proof/demo.mp4) */
function normalizeVideoUrl(url) {
  if (!url) return '';

  let normalized = url.trim().replace(/\\/g, '/');
  normalized = normalized.replace(/^\/?public\//i, '');
  normalized = normalized.replace(/^\/+/, '');

  return normalized;
}

/** Resolve public-folder paths with Vite base (e.g. /new-drip-site/) */
function resolveVideoSrc(url) {
  const normalized = normalizeVideoUrl(url);
  if (!normalized) return '';

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return `${import.meta.env.BASE_URL}${normalized.split('/').map(encodeURIComponent).join('/')}`;
}

function resolveAssetPath(path) {
  return `${import.meta.env.BASE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;
}

function getEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function VideoPlayOverlay({ onPlay, label = 'Play demo video', posterSrc, showPoster = false }) {
  return (
    <button type="button" className="hero-video-overlay" onClick={onPlay} aria-label={label}>
      {showPoster && posterSrc && (
        <img src={posterSrc} alt="" className="hero-video-poster" aria-hidden="true" />
      )}
      <span className="hero-video-overlay-scrim" aria-hidden="true" />
      <span className="hero-video-play" aria-hidden="true">
        <PlayIcon />
      </span>
    </button>
  );
}

function VideoPlaceholder({ title, hint, posterSrc }) {
  return (
    <div className="hero-video-placeholder" role="img" aria-label={title}>
      {posterSrc && (
        <img src={posterSrc} alt="" className="hero-video-poster" aria-hidden="true" />
      )}
      <span className="hero-video-overlay-scrim" aria-hidden="true" />
      <div className="hero-video-placeholder-inner">
        <span className="hero-video-play hero-video-play--static" aria-hidden="true">
          <PlayIcon />
        </span>
        <p className="hero-video-placeholder-text">{title}</p>
        {hint && <p className="hero-video-placeholder-hint">{hint}</p>}
      </div>
    </div>
  );
}

function getAutoplayEmbedUrl(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}autoplay=1`;
}

function HeroVideo() {
  const videoRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [embedActive, setEmbedActive] = useState(false);
  const rawVideoUrl = import.meta.env.VITE_DEMO_VIDEO_URL?.trim() || '';
  const videoSrc = resolveVideoSrc(rawVideoUrl);
  const posterSrc = resolveAssetPath(VIDEO_POSTER_IMAGE);
  const embedUrl = useMemo(() => getEmbedUrl(videoSrc), [videoSrc]);
  const isDirectVideo = videoSrc && !embedUrl && /\.(mp4|webm|ogg)(\?|$)/i.test(videoSrc);

  const handlePlay = () => {
    setOverlayVisible(false);
    videoRef.current?.play();
  };

  const handleVideoEnded = () => {
    setOverlayVisible(true);
  };

  return (
    <div className="hero-video">
      <div className="hero-video-frame">
        {embedUrl && !embedActive ? (
          <VideoPlayOverlay
            posterSrc={posterSrc}
            showPoster
            onPlay={() => setEmbedActive(true)}
          />
        ) : embedUrl ? (
          <iframe
            className="hero-video-embed"
            src={getAutoplayEmbedUrl(embedUrl)}
            title="getDRIP product demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isDirectVideo && !loadError ? (
          <>
            <video
              ref={videoRef}
              className="hero-video-player"
              src={videoSrc}
              poster={posterSrc}
              controls={!overlayVisible}
              playsInline
              preload="metadata"
              onError={() => setLoadError(true)}
              onEnded={handleVideoEnded}
            />
            {overlayVisible && <VideoPlayOverlay onPlay={handlePlay} />}
          </>
        ) : isDirectVideo && loadError ? (
          <VideoPlaceholder
            title="Could not load demo video"
            hint="Check VITE_DEMO_VIDEO_URL matches a file in public/"
            posterSrc={posterSrc}
          />
        ) : (
          <VideoPlaceholder
            title="Demo video coming soon"
            hint="Set VITE_DEMO_VIDEO_URL in .env"
            posterSrc={posterSrc}
          />
        )}
      </div>
    </div>
  );
}

export default HeroVideo;
