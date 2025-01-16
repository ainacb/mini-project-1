document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultsContainer = document.getElementById("results");

  // Fetch books from Open Library API
  const fetchBooks = async (query) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      displayResults(data.docs);
    } catch (error) {
      resultsContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
  };

  // Display results dynamically
  const displayResults = (books) => {
    resultsContainer.innerHTML = "";
    if (books.length === 0) {
      resultsContainer.innerHTML = "<p>No books found.</p>";
      return;
    }
    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${
          book.author_name ? book.author_name.join(", ") : "Unknown"
        }</p>
      `;
      resultsContainer.appendChild(card);
    });
  };

  // Event listener for search
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchBooks(query);
  });
});
