function SearchBar({ keyword, onKeywordChange, filter, onFilterChange }) {
  const filters = [
    { key: "all", label: "全部" },
    { key: "thought", label: "有感悟" },
    { key: "summary", label: "有概要" },
  ];

  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="搜索书名、作者或感悟关键词..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
      {filters.map((f) => (
        <button
          key={f.key}
          className={filter === f.key ? "active" : ""}
          onClick={() => onFilterChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default SearchBar;