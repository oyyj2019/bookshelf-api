import { useState } from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import "./App.css";

const initialBooks = [
  {
    title: "纳瓦尔宝典",
    author: "埃里克·乔根森",
    thought: "财富不是靠出卖时间换来的，而是靠杠杆。代码和媒体是普通人最容易拿到的两种杠杆。我现在学编程，就是在给自己加杠杆。",
    summary: "本书汇编了纳瓦尔关于财富与幸福的核心思考。他强调用独到知识、责任感和杠杆效应来创造财富，并指出幸福是一种可以习得的技能。",
  },
  {
    title: "被讨厌的勇气",
    author: "岸见一郎 / 古贺史健",
    thought: "一切烦恼都是人际关系的烦恼。我一直怕被别人说“不会做人”，但阿德勒说，自由就是不再寻求别人的认可。",
    summary: "本书以对话形式介绍阿德勒心理学。核心观点包括：目的论、课题分离、以及共同体感觉。",
  },
];

function App() {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");
  // console.log("App 渲染了，keyword =", keyword, "filter =", filter);
  const filteredBooks = initialBooks.filter((book) => {
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
      <div className="bookList">
        {filteredBooks.length === 0 ? (
          <div className="empty">没有找到匹配的书 🐟</div>
        ) : (
          filteredBooks.map((book) => <BookCard key={book.title} book={book} />)
        )}
      </div>
    </div>
  );
}

export default App;