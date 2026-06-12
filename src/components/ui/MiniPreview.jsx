import './MiniPreview.css';

function MiniPreview({ variant = 'generic' }) {
  if (variant === 'styled') {
    return (
      <div className="mini-preview mini-preview--styled">
        <div className="mini-preview-bar">
          <span className="mini-preview-dot" />
          <span className="mini-preview-dot" />
          <span className="mini-preview-dot" />
        </div>
        <div className="mini-preview-body">
          <div className="mini-preview-line mini-preview-line--short" />
          <div className="mini-preview-line" />
          <div className="mini-preview-line" />
          <div className="mini-preview-btn" />
        </div>
      </div>
    );
  }

  return (
    <div className="mini-preview mini-preview--generic">
      <div className="mini-preview-bar mini-preview-bar--plain">
        <span />
        <span />
        <span />
      </div>
      <div className="mini-preview-body mini-preview-body--plain">
        <div className="mini-preview-block" />
        <div className="mini-preview-block mini-preview-block--sm" />
        <div className="mini-preview-block mini-preview-block--sm" />
        <div className="mini-preview-block mini-preview-block--btn" />
      </div>
    </div>
  );
}

export default MiniPreview;
