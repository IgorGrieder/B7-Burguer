// Initital data
const links = document.querySelectorAll("a");

// ----------------------------- events -----------------------------

// avoid links to reopen the page
links.forEach((item) => item.addEventListener("click", (event) => event.preventDefault()));
