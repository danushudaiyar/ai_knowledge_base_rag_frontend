import { useState } from 'react';
import Loader from '../components/Loader';
import SkeletonLoader from '../components/SkeletonLoader';

/**
 * LoadingStateDemo - Showcase page for all loading state components
 * This page demonstrates all available loader variants and skeleton types
 * Useful for development and design review
 */
const LoadingStateDemo = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <div className="demo-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="demo-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1>Loading States Demo</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Showcase of all available loading indicators and skeleton screens
        </p>
      </div>

      {/* Loader Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Loader Variants
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Spinner */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Spinner</h3>
            <Loader variant="spinner" size="small" />
            <Loader variant="spinner" size="medium" />
            <Loader variant="spinner" size="large" />
          </div>

          {/* Dots */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Dots</h3>
            <Loader variant="dots" size="small" />
            <Loader variant="dots" size="medium" />
            <Loader variant="dots" size="large" />
          </div>

          {/* Pulse */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Pulse</h3>
            <Loader variant="pulse" size="small" />
            <Loader variant="pulse" size="medium" />
            <Loader variant="pulse" size="large" />
          </div>

          {/* Bars */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Bars</h3>
            <Loader variant="bars" size="small" />
            <Loader variant="bars" size="medium" />
            <Loader variant="bars" size="large" />
          </div>
        </div>

        {/* With Text */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>With Loading Text</h3>
          <Loader variant="spinner" text="Loading your documents..." />
          <div style={{ marginTop: '1rem' }}>
            <Loader variant="dots" text="Processing query..." />
          </div>
        </div>

        {/* Full Screen Demo */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Full Screen Loader</h3>
          <button 
            onClick={() => {
              setShowFullScreen(true);
              setTimeout(() => setShowFullScreen(false), 3000);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Show Full Screen Loader (3s)
          </button>
          {showFullScreen && (
            <Loader variant="spinner" fullScreen text="Loading application..." />
          )}
        </div>
      </section>

      {/* Skeleton Loaders */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Skeleton Loaders
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Text Skeletons */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Text Skeletons</h3>
            <SkeletonLoader variant="title" />
            <SkeletonLoader variant="text" count={3} />
          </div>

          {/* Card Skeleton */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Card Skeleton</h3>
            <SkeletonLoader variant="card" count={2} />
          </div>

          {/* File Item Skeletons */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>File List Skeleton</h3>
            <SkeletonLoader variant="file-item" count={4} />
          </div>

          {/* Answer Card Skeleton */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Answer Card Skeleton</h3>
            <SkeletonLoader variant="answer-card" />
          </div>

          {/* Custom Shapes */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Custom Shapes</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <SkeletonLoader variant="circle" width={60} height={60} />
              <div style={{ flex: 1 }}>
                <SkeletonLoader variant="text" width="70%" />
                <SkeletonLoader variant="text" width="50%" height={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Indicators */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Progress Indicators
        </h2>

        <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Determinate Progress (50%)</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '50%' }}></div>
          </div>
          <p className="progress-text">Uploading... 50%</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Indeterminate Progress</h3>
          <div className="progress-bar-container">
            <div className="progress-bar indeterminate"></div>
          </div>
          <p className="progress-text">Preparing upload...</p>
        </div>
      </section>

      {/* Button States */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Button Loading States
        </h2>

        <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="upload-button btn-loading" disabled style={{ width: 'auto' }}>
            <span className="btn-loader"></span>
            Uploading...
          </button>

          <button className="delete-button btn-loading" disabled style={{ width: 'auto' }}>
            <span className="btn-loader"></span>
            Deleting...
          </button>

          <button className="refresh-button btn-loading" disabled style={{ width: 'auto' }}>
            <span className="btn-loader"></span>
            Refreshing...
          </button>

          <button className="query-submit-button btn-loading" disabled>
            <span className="btn-loader"></span>
            Searching...
          </button>
        </div>
      </section>

      {/* Usage Notes */}
      <section style={{ padding: '2rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
        <h3 style={{ marginBottom: '1rem', color: '#0369a1' }}>📘 Usage Guidelines</h3>
        <ul style={{ color: '#0c4a6e', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li><strong>Spinners:</strong> Use for general-purpose loading states</li>
          <li><strong>Dots:</strong> Great for inline loading and subtle indicators</li>
          <li><strong>Pulse:</strong> Perfect for continuous/real-time processes</li>
          <li><strong>Bars:</strong> Good for rhythmic or audio/video processing</li>
          <li><strong>Skeletons:</strong> Use when loading structured content (lists, cards, etc.)</li>
          <li><strong>Progress Bars:</strong> Use when you can track actual progress percentage</li>
        </ul>
      </section>
    </div>
  );
};

export default LoadingStateDemo;
