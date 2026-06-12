function MockBrowserChrome({ children, className = '' }) {
  return (
    <div className={`mock-browser ${className}`.trim()} aria-hidden="true">
      <div className="mock-browser-bar">
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <span className="mock-browser-dot" />
        <div className="mock-browser-url" />
      </div>
      <div className="mock-browser-body">{children}</div>
    </div>
  );
}

export default MockBrowserChrome;
