import {
  BarChart2,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import MockKpi from './MockKpi';
import MockBarChart from './MockBarChart';

const GENERAL_NAV = ['Dashboard', 'Payment', 'Customers', 'Message'];
const TOOLS_NAV = ['Product', 'Invoice', 'Analytics', 'Automation'];
const SUPPORT_NAV = ['Settings', 'Security', 'Help'];

const NAV_ICONS = {
  Dashboard: LayoutDashboard,
  Payment: CreditCard,
  Customers: Users,
  Message: MessageSquare,
  Product: Package,
  Invoice: FileText,
  Analytics: BarChart2,
  Automation: Zap,
  Settings,
  Security: Shield,
  Help: HelpCircle,
};

const SALES_STACKS = [
  [72, 58, 45, 38, 28],
  [68, 52, 48, 42, 32],
  [78, 62, 50, 40, 30],
];

const STACK_COLORS = [
  'var(--mock-dash-stack-1, #7c6cf0)',
  'var(--mock-dash-stack-2, #6b8af7)',
  'var(--mock-dash-stack-3, #5ba4e8)',
  'var(--mock-dash-stack-4, #4ec4c4)',
  'var(--mock-dash-stack-5, #8b9cf6)',
];

const INTEGRATIONS = [
  { name: 'Stripe', type: 'Finance', rate: 40, profit: '$650.00' },
  { name: 'Zapier', type: 'CRM', rate: 80, profit: '$720.50' },
  { name: 'Shopify', type: 'Marketplace', rate: 20, profit: '$432.25' },
];

const SUBSCRIBER_BARS = [38, 52, 88, 44, 56, 48, 42];

function MockNexusDashboard() {
  return (
    <div className="mock-dashboard" aria-hidden="true">
      <aside className="mock-dashboard-sidebar">
        <div className="mock-dashboard-brand">
          <span className="mock-dashboard-brand-icon" />
          <span className="mock-dashboard-brand-name">GetDRIP</span>
        </div>

        <nav className="mock-dashboard-nav">
          <div className="mock-dashboard-nav-group">
            <p className="mock-dashboard-nav-label">General</p>
            {GENERAL_NAV.map((item) => {
              const NavIcon = NAV_ICONS[item];

              return (
              <div
                key={item}
                className={[
                  'mock-dashboard-nav-item',
                  item === 'Dashboard' ? 'mock-dashboard-nav-item--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {NavIcon ? (
                  <NavIcon className="mock-dashboard-nav-icon" size={14} strokeWidth={1.75} aria-hidden />
                ) : (
                  <span className="mock-dashboard-nav-icon" />
                )}
                <span>{item}</span>
                {item === 'Message' && <span className="mock-dashboard-nav-badge">8</span>}
              </div>
              );
            })}
          </div>

          <div className="mock-dashboard-nav-group">
            <p className="mock-dashboard-nav-label">Tools</p>
            {TOOLS_NAV.map((item) => {
              const NavIcon = NAV_ICONS[item];

              return (
              <div key={item} className="mock-dashboard-nav-item">
                {NavIcon ? (
                  <NavIcon className="mock-dashboard-nav-icon" size={14} strokeWidth={1.75} aria-hidden />
                ) : (
                  <span className="mock-dashboard-nav-icon" />
                )}
                <span>{item}</span>
                {item === 'Automation' && (
                  <span className="mock-dashboard-nav-tag">Beta</span>
                )}
              </div>
              );
            })}
          </div>

          <div className="mock-dashboard-nav-group">
            <p className="mock-dashboard-nav-label">Support</p>
            {SUPPORT_NAV.map((item) => {
              const NavIcon = NAV_ICONS[item];

              return (
              <div key={item} className="mock-dashboard-nav-item">
                {NavIcon ? (
                  <NavIcon className="mock-dashboard-nav-icon" size={14} strokeWidth={1.75} aria-hidden />
                ) : (
                  <span className="mock-dashboard-nav-icon" />
                )}
                <span>{item}</span>
              </div>
              );
            })}
          </div>
        </nav>

        <div className="mock-dashboard-sidebar-footer">
          <div className="mock-dashboard-team">
            <span className="mock-dashboard-team-icon" />
            <span>Marketing</span>
          </div>
          <button type="button" className="mock-dashboard-upgrade">
            Upgrade Plan
          </button>
        </div>
      </aside>

      <div className="mock-dashboard-body">
        <header className="mock-dashboard-topbar">
          <div className="mock-dashboard-search">
            <span className="mock-dashboard-search-icon" />
            <span className="mock-dashboard-search-text">Search</span>
            <kbd className="mock-dashboard-search-kbd">⌘ F</kbd>
          </div>
          <div className="mock-dashboard-topbar-actions">
            <span className="mock-dashboard-topbar-icon" />
            <span className="mock-dashboard-topbar-icon" />
            <span className="mock-dashboard-topbar-icon" />
          </div>
          <div className="mock-dashboard-user">
            <span className="mock-dashboard-avatar" />
            <div className="mock-dashboard-user-meta">
              <span className="mock-dashboard-user-name">Your Name</span>
              <span className="mock-dashboard-user-role">Business</span>
            </div>
          </div>
        </header>

        <main className="mock-dashboard-content">
          <div className="mock-dashboard-page-header">
            <h2 className="mock-dashboard-page-title">Dashboard</h2>
            <div className="mock-dashboard-page-filters">
              <span className="mock-dashboard-filter mock-dashboard-filter--date">Oct 18 – Nov 18</span>
              <span className="mock-dashboard-filter">Monthly</span>
              <span className="mock-dashboard-filter mock-dashboard-filter--btn">Filter</span>
              <span className="mock-dashboard-filter mock-dashboard-filter--btn mock-dashboard-filter--primary">
                Export
              </span>
            </div>
          </div>

          <div className="mock-dashboard-kpis">
            <MockKpi label="Page Views" value="12,450" delta="+15.8% ↑" trend="up" />
            <MockKpi label="Total Revenue" value="$363.95" delta="34.0% ↓" trend="down" />
            <MockKpi label="Bounce Rate" value="86.5%" delta="+24.2% ↑" trend="up" />
          </div>

          <div className="mock-dashboard-mid-grid">
            <div className="mock-dashboard-card mock-dashboard-card--sales">
              <div className="mock-dashboard-card-header">
                <div>
                  <p className="mock-dashboard-card-title">Sales Overview</p>
                  <p className="mock-dashboard-card-metric">$ 9,257.51</p>
                  <p className="mock-dashboard-card-sub">+ $143.50 increased</p>
                </div>
              </div>
              <div className="mock-dashboard-sales-chart">
                {SALES_STACKS.map((stack, monthIndex) => (
                  <div key={monthIndex} className="mock-dashboard-sales-col">
                    <div className="mock-dashboard-sales-stack">
                      {stack.map((value, segmentIndex) => (
                        <span
                          key={segmentIndex}
                          className="mock-dashboard-sales-segment"
                          style={{
                            flexGrow: value,
                            background: STACK_COLORS[segmentIndex],
                          }}
                        />
                      ))}
                    </div>
                    <span className="mock-dashboard-sales-month">
                      {['Oct', 'Nov', 'Dec'][monthIndex]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mock-dashboard-legend">
                {['China', 'UE', 'USA', 'Canada', 'Other'].map((label, index) => (
                  <span key={label} className="mock-dashboard-legend-item">
                    <span
                      className="mock-dashboard-legend-swatch"
                      style={{ background: STACK_COLORS[index] }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mock-dashboard-card mock-dashboard-card--subscribers">
              <div className="mock-dashboard-card-header">
                <div>
                  <p className="mock-dashboard-card-title">Total Subscriber</p>
                  <p className="mock-dashboard-card-metric">24,473</p>
                  <p className="mock-dashboard-card-sub">+ 749 increased</p>
                </div>
              </div>
              <MockBarChart
                bars={SUBSCRIBER_BARS}
                className="mock-bar-chart--subscriber"
                highlightIndex={2}
                labels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              />
            </div>
          </div>

          <div className="mock-dashboard-bottom-grid">
            <div className="mock-dashboard-card mock-dashboard-card--distribution">
              <p className="mock-dashboard-card-title">Sales Distribution</p>
              <ul className="mock-dashboard-distribution-list">
                <li>
                  <span>Website</span>
                  <span>$ 374.82</span>
                </li>
                <li>
                  <span>Mobile App</span>
                  <span>$ 241.60</span>
                </li>
                <li>
                  <span>Other</span>
                  <span>$ 213.42</span>
                </li>
              </ul>
              <div className="mock-dashboard-donut" />
            </div>

            <div className="mock-dashboard-card mock-dashboard-card--integrations">
              <div className="mock-dashboard-card-header mock-dashboard-card-header--row">
                <p className="mock-dashboard-card-title">List of Integration</p>
                <span className="mock-dashboard-see-all">See All</span>
              </div>
              <table className="mock-dashboard-table">
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Type</th>
                    <th>Rate</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {INTEGRATIONS.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>
                        <span className="mock-dashboard-type-pill">{row.type}</span>
                      </td>
                      <td>
                        <span className="mock-dashboard-rate">
                          <span
                            className="mock-dashboard-rate-bar"
                            style={{ width: `${row.rate}%` }}
                          />
                        </span>
                      </td>
                      <td className="mock-dashboard-profit">{row.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MockNexusDashboard;
