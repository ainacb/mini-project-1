document.getElementById("searchButton").addEventListener("click", async () => {
  // event listener - when clicked, an asynchronous function is executed.
  const query = document.getElementById("searchInput").value; // retrieves the user input
  const option = document.getElementById("searchOption").value; // retrieves the search option

  if (!query) {
    alert("Please enter a search term.");
    return; // ensures the user enters a search term, dsplays an alert if the input is empty and exits the function early.
  }
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Loading...</p>"; // display a loading message while data is being fetched.

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?${option}=${query}`
    );
    const data = await response.json();
    console.log("DATA", data);
    // API URL, fetches data from the API and parses it into JSON format.

    if (data.docs && data.docs.length > 0) {
      resultsContainer.innerHTML = ""; // Checks if the API returned book data (data.docs) and if the results array is non-empty.

      data.docs.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("result-item"); // if there are results, it clears the results container and
        // iterates through the array of books (data.docs) and creates a new div for each book, populating it with book details.
        // Dynamically generates HTML to display book details, including: cover image (fallback to a placeholder if unavailable),
        // title, author(s), publication year, edition count, ISBN, language(s), page count, and availability.

        const coverImageUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://placehold.co/128x192";

        const isbnList = book.isbn
          ? book.isbn.slice(0, 5).join(", ")
          : "Not Available";

        bookElement.innerHTML = `
                    <img src="${coverImageUrl}" alt="${
          book.title
        }" style="width: 128px; height: 192px;">
                    
                    <h2>${book.title}</h2>
                    
                    <p><strong>Author:</strong> ${
                      book.author_name
                        ? book.author_name.join(", ")
                        : "Not Available"
                    }</p>
                    
                    <p><strong>Publication Year:</strong> ${
                      book.first_publish_year || "Not Available"
                    }</p>
                    
                    <p><strong>Editions:</strong> ${
                      book.edition_count || "Not Available"
                    }</p>
                    
                    <p><strong>ISBN:</strong> ${isbnList}</p>
                    
                    <p><strong>Language:</strong> ${
                      book.language ? book.language.join(", ") : "Not Available"
                    }</p>
                      
                    <p><strong>Page Count:</strong> ${
                      book.number_of_pages_median || "Not Available"
                    }</p>
                    
                    <p><strong>Availability:</strong> ${
                      book.has_fulltext ? "Available" : "Not Available"
                    }</p>
                `;
        resultsContainer.appendChild(bookElement); // appends the generated div to the results container.
      });
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>"; // if no results are found, displays a "No results found" message.
    }
  } catch (error) {
    resultsContainer.innerHTML =
      "<p>An error occurred while fetching data. Please try again later.</p>";
    console.error(error); // Catches errors during the fetch operation or data processing.
    // Displays an error message in the results container and logs the error in the console.
  }
});
