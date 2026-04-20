import { useState } from "react";
import b1 from "./assets/b1.jfif";
import b2 from "./assets/b2.jfif";
import b3 from "./assets/b3.jfif";
import b4 from "./assets/b4.jfif";
import b5 from "./assets/b5.jpg";

const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    publisher: "HarperOne",
    image: b1,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    publisher: "Prentice Hall",
    image: b2,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    publisher: "Avery",
    image: b3,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    year: 2016,
    publisher: "Grand Central",
    image: b4,
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2015,
    publisher: "O'Reilly Media",
    image: b5,
  },
];

export default function App() {
  const [yearFilter, setYearFilter] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("all");

  const publishers = ["all", ...new Set(books.map((b) => b.publisher))];

  const filteredBooks = books.filter((book) => {
    const yearOk = yearFilter ? book.year === Number(yearFilter) : true;
    const publisherOk =
      publisherFilter === "all" ? true : book.publisher === publisherFilter;

    return yearOk && publisherOk;
  });

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", background: "#f8f8f8", minHeight: "100vh" }}>
      <h2>Book Filter App</h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="number"
          placeholder="Filter by year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={{ padding: "8px" }}
        />

        <select
          value={publisherFilter}
          onChange={(e) => setPublisherFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          {publishers.map((pub) => (
            <option key={pub} value={pub}>
              {pub}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.title}
              style={{
                background: "white",
                padding: "12px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3>{book.title}</h3>
              <p><b>Author:</b> {book.author}</p>
              <p><b>Year:</b> {book.year}</p>
              <p><b>Publisher:</b> {book.publisher}</p>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}