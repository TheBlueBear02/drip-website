function MockKpi({ label, value, delta }) {
  return (
    <div className="mock-kpi">
      <p className="mock-kpi-label">{label}</p>
      <p className="mock-kpi-value">{value}</p>
      {delta && <p className="mock-kpi-delta">{delta}</p>}
    </div>
  );
}

export default MockKpi;
