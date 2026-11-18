import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          backgroundColor: '#FAF9F8',
          color: '#0F172A',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '480px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px 24px',
            boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.08)',
            border: '1px solid rgba(226, 232, 240, 0.85)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#EF4444' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              We encountered an issue rendering this section. Please refresh or try again.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Reload Page
              </button>
              <a
                href="https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20need%20help%20with%20booking"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Book via WhatsApp
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

