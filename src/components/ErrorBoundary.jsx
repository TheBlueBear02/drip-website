import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="error-boundary"
          role="alert"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            fontFamily: 'var(--site-font-body, system-ui, sans-serif)',
          }}
        >
          <h1 style={{ marginBottom: '12px' }}>Something went wrong</h1>
          <p style={{ color: 'var(--site-text-muted, #666)' }}>
            Please refresh the page to try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
