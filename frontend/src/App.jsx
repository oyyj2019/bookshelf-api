import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("App 渲染了，keyword =", keyword, "filter =", filter);

 // 首次加载时从后端拉数据
  useEffect(() => {
    fetch("http://localhost:8000/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("请求失败");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 本地过滤：数据已经拉下来了，搜索筛选在前端做，响应更快
  const filteredBooks = books.filter((book) => {
    const text = (book.title + book.author + book.thought + book.summary).toLowerCase();
    const matchKeyword = text.includes(keyword.toLowerCase());

    let matchFilter = true;
    if (filter === "thought") matchFilter = book.thought.trim() !== "";
    if (filter === "summary") matchFilter = book.summary.trim() !== "";

    return matchKeyword && matchFilter;
  });

  return (
    <div className="app">
      <h1>🐟 我的读书书架</h1>
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        filter={filter}
        onFilterChange={setFilter}
      />
      {loading && <div className="empty">加载中...</div>}
      {error && <div className="empty">出错了：{error}</div>}
      {!loading && !error && (
        <div className="bookList">
          {filteredBooks.length === 0 ? (
            <div className="empty">没有找到匹配的书 🐟</div>
          ) : (
            filteredBooks.map((book) => <BookCard key={book.title} book={book} />)
          )}
        </div>
      )}
    </div>
  );
}

export default App;