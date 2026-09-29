function BookCard({ book }) {
  return (
    <div className="book">
      <h2>{book.title}</h2>
      <div className="author">{book.author}</div>
      <div className="label">我的感悟</div>
      <div className="thought">{book.thought || "（还没写）"}</div>
      <div className="label">AI 概要</div>
      <div className="summary">{book.summary || "（还没生成）"}</div>
    </div>
  );
}

export default BookCard;