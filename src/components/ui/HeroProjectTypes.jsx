import { heroTypeList } from '../../data/heroTypes';

function HeroProjectTypes({ activeHeroType, hasSelected, onSelect }) {
  return (
    <div className="hero-project-types">
      {heroTypeList.map((type) => {
        const isActive = hasSelected && type.id === activeHeroType;

        return (
          <button
            key={type.id}
            type="button"
            className={[
              'hero-project-type-chip',
              isActive ? 'hero-project-type-chip--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={isActive}
            onClick={() => onSelect(type.id)}
          >
            {type.label}
          </button>
        );
      })}
    </div>
  );
}

export default HeroProjectTypes;
