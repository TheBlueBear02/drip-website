import { createPortal } from 'react-dom';
import { heroTypeList } from '@/data/heroTypes';

function SkillSwitcherTypeMenu({
  menuRef,
  activeHeroType,
  position,
  onTypeSelect,
}) {
  return createPortal(
    <ul
      ref={menuRef}
      className="skill-switcher-type-menu skill-switcher-type-menu--portal"
      role="listbox"
      aria-label="Project type"
      style={{ top: position.top, left: position.left }}
    >
      {heroTypeList.map((type) => (
        <li key={type.id} role="presentation">
          <button
            type="button"
            role="option"
            aria-selected={type.id === activeHeroType}
            className={[
              'skill-switcher-type-option',
              type.id === activeHeroType ? 'skill-switcher-type-option--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onTypeSelect(type.id)}
          >
            {type.label}
          </button>
        </li>
      ))}
    </ul>,
    document.body,
  );
}

export default SkillSwitcherTypeMenu;
