document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  const option = document.getElementById("searchOption").value;

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?${option}=${query}`
    );
    const data = await response.json();

    if (data.docs && data.docs.length > 0) {
      resultsContainer.innerHTML = "";

      data.docs.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("result-item");

        bookElement.innerHTML = `
                    <h2>${book.title}</h2>
                    <p><strong>Author:</strong> ${
                      book.author_name ? book.author_name.join(", ") : "N/A"
                    }</p>
                    <p><strong>Publication Year:</strong> ${
                      book.first_publish_year || "N/A"
                    }</p>
                    <p><strong>Editions:</strong> ${
                      book.edition_count || "N/A"
                    }</p>
                    <p><strong>Availability:</strong> ${
                      book.availability ? "Available" : "Unavailable"
                    }</p>
                `;

        resultsContainer.appendChild(bookElement);
      });
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    resultsContainer.innerHTML =
      "<p>An error occurred while fetching data. Please try again later.</p>";
    console.error(error);
  }
});
