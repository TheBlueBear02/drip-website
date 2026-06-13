function MockKpi({ label, value, delta, trend = 'up' }) {
  const deltaClass = [
    'mock-kpi-delta',
    trend === 'down' ? 'mock-kpi-delta--down' : 'mock-kpi-delta--up',
  ].join(' ');

  return (
    <div className="mock-kpi">
      <p className="mock-kpi-label">{label}</p>
      <p className="mock-kpi-value">{value}</p>
      {delta && <p className={deltaClass}>{delta}</p>}
    </div>
  );
}

export default MockKpi;
