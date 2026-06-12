function MockProjectTile({ title, category, featured = false }) {
  return (
    <div className={`mock-project-tile${featured ? ' mock-project-tile--featured' : ''}`}>
      <div className="mock-project-tile-image" />
      <div className="mock-project-tile-meta">
        <p className="mock-project-tile-title">{title}</p>
        <p className="mock-project-tile-category">{category}</p>
      </div>
    </div>
  );
}

export default MockProjectTile;
