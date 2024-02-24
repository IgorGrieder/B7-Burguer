// Initital data
const links = document.querySelectorAll("a");
const showArea = document.querySelector(".showcase-area");

// ----------------------------- events -----------------------------
showHamburguer();

// ----------------------------- functions -----------------------------
// show the habmburguers of the data base
function showHamburguer() {
    for (let hamb of hamburguers) {
        // clones the hamburguer model in the HTML
        const newHamburguer = document.querySelector(".model .burguer").cloneNode(true);
        
        //checks if it needs the special promo
        if (hamb.promoPrice) {
            newHamburguer.querySelector(".bottom h4 span").innerHTML = hamb.price[1].toFixed(2);
        } else {
            // sets a non promo price and disables the promo indicator
            newHamburguer.querySelector(".bottom h4 span").innerHTML = hamb.price[0].toFixed(2);
            newHamburguer.querySelector(".promo").classList.add("disabled");
        }

        // changes the image
        newHamburguer.querySelector("img").src = hamb.img;

        // changes the name
        newHamburguer.querySelector("h4:nth-child(2)").innerHTML = hamb.name.toUpperCase();

        // changes the category
        newHamburguer.querySelector("h6").innerHTML = hamb.category;

        showArea.append(newHamburguer);
    }
}

// avoid links to reopen the page
links.forEach((item) => item.addEventListener("click", (event) => event.preventDefault()));