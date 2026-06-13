import { useInView } from '@/hooks/useInView';
import './Footer.css';

function Footer() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  return (
    <footer
      ref={sectionRef}
      className={`footer site-reveal-section${isInView ? ' is-visible' : ''}`}
    >
      <div className="container">
        <div className="footer-content site-reveal">
          <div className="footer-links">
            <a href="https://github.com/TheBlueBear02/drip-cli" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/getdrip" target="_blank" rel="noopener noreferrer">
              npm
            </a>
            <a href="#how-it-works">How it works</a>
            <a href="#skills">Design systems</a>
            <a
              href="https://github.com/TheBlueBear02/drip-cli/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2026 <span className="brand-get">GET</span><span className="brand-drip">DRIP</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
