import { Home } from 'lucide-react';
import ChevronIcon from '@/components/ui/icons/ChevronIcon';
import SkillSwitcherTypeMenu from '@/components/ui/SkillSwitcherTypeMenu';

function SkillSwitcherStylesRow({
  typeAnchorButtonRef,
  typeMenuRef,
  selectedTypeLabel,
  anchorEntering,
  typeMenuOpen,
  menuPosition,
  stylesEntering,
  activeHeroType,
  isBrandActive,
  isDarkTheme,
  visibleSkills,
  activeSkill,
  onTypeAnchorClick,
  onTypeSelect,
  onBrandClick,
  onSkillClick,
  onSeeMoreClick,
}) {
  return (
    <div className="skill-switcher-body">
      <div className="skill-switcher-type-anchor-wrap">
        <button
          ref={typeAnchorButtonRef}
          type="button"
          className={[
            'skill-switcher-type-anchor',
            anchorEntering ? 'skill-switcher-type-anchor--enter' : '',
            typeMenuOpen ? 'skill-switcher-type-anchor--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onTypeAnchorClick}
          aria-expanded={typeMenuOpen}
          aria-haspopup="listbox"
          aria-label={`Project type: ${selectedTypeLabel}. Change project type`}
        >
          <span className="skill-switcher-type-anchor-label">{selectedTypeLabel}</span>
          <ChevronIcon open={typeMenuOpen} />
        </button>

        {typeMenuOpen && (
          <SkillSwitcherTypeMenu
            menuRef={typeMenuRef}
            activeHeroType={activeHeroType}
            position={menuPosition}
            onTypeSelect={onTypeSelect}
          />
        )}
      </div>

      <div
        className={[
          'skill-switcher-scroll',
          stylesEntering ? 'skill-switcher-scroll--enter' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          className={`skill-chip skill-chip--brand ${isBrandActive ? 'skill-chip-active' : ''}`}
          onClick={onBrandClick}
          aria-label="Default site theme"
        >
          <span
            className={[
              'skill-chip-icon-wrap',
              'skill-chip-icon--home',
              isDarkTheme ? 'skill-chip-icon--home-on-dark' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <Home className="skill-chip-icon" size={12} strokeWidth={2.5} aria-hidden />
          </span>
        </button>

        {visibleSkills.map((skill) => {
          const isActive = activeSkill === skill.id;

          return (
            <button
              key={skill.id}
              type="button"
              className={[
                'skill-chip',
                isActive ? 'skill-chip-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSkillClick(skill.id)}
            >
              <span
                className="skill-chip-swatch"
                style={{
                  backgroundColor: skill.swatchColor ?? skill.accentColor,
                }}
              />
              <span className="skill-chip-name">{skill.name}</span>
            </button>
          );
        })}

        <a href="#skills" className="skill-switcher-see-more" onClick={onSeeMoreClick}>
          See more
        </a>
      </div>
    </div>
  );
}

export default SkillSwitcherStylesRow;
