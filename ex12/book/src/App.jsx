import { useState } from "react";

const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    publisher: "HarperOne",
    image: "https://picsum.photos/id/1005/200/280",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    publisher: "Prentice Hall",
    image: "https://picsum.photos/id/1011/200/280",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    publisher: "Avery",
    image: "https://picsum.photos/id/1025/200/280",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    year: 2016,
    publisher: "Grand Central",
    image: "https://picsum.photos/id/1035/200/280",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2015,
    publisher: "O'Reilly Media",
    image: "https://picsum.photos/id/1043/200/280",
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