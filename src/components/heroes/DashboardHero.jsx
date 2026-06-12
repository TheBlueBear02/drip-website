import HeroPreviewHeader from './HeroPreviewHeader';
import HeroPreviewCopy from './HeroPreviewCopy';
import MockKpi from './mock/MockKpi';
import MockBarChart from './mock/MockBarChart';

const ACTIVITY = [
  { label: 'New signups', value: '+128' },
  { label: 'Revenue', value: '$4.2k' },
  { label: 'Active users', value: '2,841' },
];

function DashboardHero({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-preview-layout hero-preview-layout--split">
      <HeroPreviewHeader resolvedSkillId={resolvedSkillId} installCommand={installCommand} />

      <div className="hero-preview-split">
        <div className="hero-preview-copy">
          <HeroPreviewCopy resolvedSkillId={resolvedSkillId} />
        </div>

        <div className="hero-preview-media">
          <div className="mock-dashboard" aria-hidden="true">
            <aside className="mock-dashboard-sidebar">
              <span className="mock-dashboard-sidebar-icon mock-dashboard-sidebar-icon--active" />
              <span className="mock-dashboard-sidebar-icon" />
              <span className="mock-dashboard-sidebar-icon" />
              <span className="mock-dashboard-sidebar-icon" />
            </aside>
            <div className="mock-dashboard-main">
              <div className="mock-dashboard-kpis">
                <MockKpi label="MRR" value="$12.4k" delta="+8.2%" />
                <MockKpi label="Users" value="3,204" delta="+124" />
                <MockKpi label="Churn" value="1.2%" delta="-0.3%" />
              </div>
              <div className="mock-dashboard-chart-panel">
                <p className="mock-dashboard-panel-title">Weekly revenue</p>
                <MockBarChart />
              </div>
              <ul className="mock-dashboard-activity">
                {ACTIVITY.map((item) => (
                  <li key={item.label} className="mock-dashboard-activity-row">
                    <span>{item.label}</span>
                    <span className="mock-dashboard-activity-value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHero;
