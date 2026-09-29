from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# 允许前端开发服务器访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 用 Pydantic 定义一本书的数据结构
class Book(BaseModel):
    title: str
    author: str
    thought: str = ""
    summary: str = ""

# 临时数据，先硬编码。下一步接数据库时替换
books_db = [
    Book(
        title="纳瓦尔宝典",
        author="埃里克·乔根森",
        thought="财富不是靠出卖时间换来的，而是靠杠杆。代码和媒体是普通人最容易拿到的两种杠杆。我现在学编程，就是在给自己加杠杆。",
        summary="本书汇编了纳瓦尔关于财富与幸福的核心思考。他强调用独到知识、责任感和杠杆效应来创造财富，并指出幸福是一种可以习得的技能。",
    ),
    Book(
        title="被讨厌的勇气",
        author="岸见一郎 / 古贺史健",
        thought="一切烦恼都是人际关系的烦恼。我一直怕被别人说“不会做人”，但阿德勒说，自由就是不再寻求别人的认可。",
        summary="本书以对话形式介绍阿德勒心理学。核心观点包括：目的论、课题分离、以及共同体感觉。",
    ),
]

@app.get("/api/books")
def get_books():
    return books_db

@app.get("/api/books/search")
def search_books(keyword: str = "", filter: str = "all"):
    result = []
    for book in books_db:
        text = (book.title + book.author + book.thought + book.summary).lower()
        if keyword.lower() not in text:
            continue
        if filter == "thought" and not book.thought.strip():
            continue
        if filter == "summary" and not book.summary.strip():
            continue
        result.append(book)
    return result