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
    console.log("DATA", data);
    
    if (data.docs && data.docs.length > 0) {
      resultsContainer.innerHTML = "";
      
      data.docs.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("result-item");
        
        const coverImageUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://placehold.co/128x192";
        
        const isbnList = book.isbn ? book.isbn.slice(0, 5).join(", ") : "Not Available";
        
        bookElement.innerHTML = `
                    <img src="${coverImageUrl}" alt="${book.title}" style="width: 128px; height: 192px;">
                    
                    <h2>${book.title}</h2>
                    
                    <p><strong>Author:</strong> ${
                      book.author_name ? book.author_name.join(", ") : "Not Available"}</p>
                    
                    <p><strong>Publication Year:</strong> ${
                      book.first_publish_year || "Not Available"}</p>
                    
                    <p><strong>Editions:</strong> ${
                      book.edition_count || "Not Available"}</p>
                    
                    <p><strong>ISBN:</strong> ${isbnList}</p>
                    
                    <p><strong>Language:</strong> ${
                      book.language ? book.language.join(", ") : "Not Available"}</p>
                      
                    <p><strong>Page Count:</strong> ${book.number_of_pages_median || "Not Available"}</p>
                    
                    <p><strong>Availability:</strong> ${
                      book.has_fulltext ? "Available" : "Not Available"}</p>
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
