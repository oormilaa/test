document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.createElement('form');
    searchForm.id = 'search-form';
    searchForm.innerHTML = `
    <input type="text" id="search-input" placeholder="Search...">
    <button type="submit" id="search-button">Search</button>
  `;

    document.body.appendChild(searchForm);

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.getElementById('search-input').value;
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    });
});