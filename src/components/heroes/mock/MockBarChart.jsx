const DEFAULT_BARS = [42, 68, 55, 82, 61, 74, 90];

function MockBarChart({ bars = DEFAULT_BARS, className = '' }) {
  const max = Math.max(...bars);

  return (
    <div className={`mock-bar-chart ${className}`.trim()} aria-hidden="true">
      {bars.map((height, index) => (
        <div
          key={index}
          className="mock-bar-chart-col"
          style={{ '--bar-height': `${(height / max) * 100}%` }}
        >
          <div className="mock-bar-chart-bar" />
        </div>
      ))}
    </div>
  );
}

export default MockBarChart;
