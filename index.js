// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const searchOptions = document.getElementById("searchOptions");
  const resultsContainer = document.getElementById("results");

  // Fetch books from Open Library API
  const fetchBooks = async (query, filterOption) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?${filterOption}=${query}`
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
                <h3>${book.title || "Unknown Title"}</h3>
                <p><strong>Author:</strong> ${
                  book.author_name ? book.author_name.join(", ") : "Unknown"
                }</p>
                <p><strong>First Published:</strong> ${
                  book.first_publish_year || "Unknown"
                }</p>
                <p><strong>Number of Editions:</strong> ${
                  book.edition_count || "N/A"
                }</p>
                <p><strong>Availability:</strong> ${
                  book.availability ? book.availability : "Unknown"
                }</p>
            `;
      resultsContainer.appendChild(card);
    });
  };

  // Event listener for search
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    const filterOption = searchOptions.value;
    if (query) fetchBooks(query, filterOption);
  });
});
