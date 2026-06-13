import { heroTypeList } from '@/data/heroTypes';

function SkillSwitcherProjectTypeRow({ hasSelectedProjectType, activeHeroType, onTypeSelect }) {
  return (
    <div className="skill-switcher-types-row">
      <span className="skill-switcher-building-label">I&apos;m building:</span>
      <div className="skill-switcher-types">
        {heroTypeList.map((type) => {
          const isActive = hasSelectedProjectType && type.id === activeHeroType;

          return (
            <button
              key={type.id}
              type="button"
              className={[
                'skill-chip skill-chip--project-type',
                isActive ? 'skill-chip-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={isActive}
              onClick={() => onTypeSelect(type.id)}
            >
              <span className="skill-chip-name">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SkillSwitcherProjectTypeRow;
