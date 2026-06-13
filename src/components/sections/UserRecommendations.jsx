import { userRecommendations } from '@/data/userRecommendations';
import { useInView } from '@/hooks/useInView';
import './UserRecommendations.css';

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function UserRecommendations() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  const hasRecommendations = userRecommendations.length > 0;

  return (
    <section
      ref={sectionRef}
      className={`user-recommendations site-reveal-section${isInView ? ' is-visible' : ''}`}
      aria-label="User recommendations"
    >
      <div className="container">
        <h2 className="user-recommendations-title site-reveal">
          People who <span className="brand-get">GOT</span><span className="brand-drip">DRIP</span> Recommend:
        </h2>
        <p className="user-recommendations-subtitle site-reveal" style={{ '--site-reveal-delay': '120ms' }}>
          What builders say after giving their agent a design system to follow.
        </p>

        {hasRecommendations ? (
          <div className="user-recommendations-grid">
            {userRecommendations.map((item, index) => {
              const attribution = [item.role, item.company].filter(Boolean).join(' · ');

              return (
                <blockquote
                  key={item.id}
                  className="user-recommendation-card site-reveal"
                  style={{ '--site-reveal-delay': `${240 + index * 120}ms` }}
                >
                  <p className="user-recommendation-quote">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="user-recommendation-author">
                    {item.avatarUrl ? (
                      <img
                        className="user-recommendation-avatar"
                        src={item.avatarUrl}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <span className="user-recommendation-avatar user-recommendation-avatar--initials" aria-hidden="true">
                        {getInitials(item.name)}
                      </span>
                    )}
                    <cite className="user-recommendation-cite">
                      <span className="user-recommendation-name">{item.name}</span>
                      {attribution ? (
                        <span className="user-recommendation-meta">{attribution}</span>
                      ) : null}
                    </cite>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        ) : (
          <p className="user-recommendations-empty site-reveal" style={{ '--site-reveal-delay': '240ms' }}>
            Recommendations from users will appear here.
          </p>
        )}
      </div>
    </section>
  );
}

export default UserRecommendations;
