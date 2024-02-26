// Initital data
const links = document.querySelectorAll("a");
const showArea = document.querySelector(".showcase-area");
const modalArea = document.querySelector(".modal");
const cartArea = document.querySelector(".cart-area");
const countModal = document.querySelector("#selected-qte");
const cartDisplay = document.querySelector(".cart-hamburguers");
let cartItems = [];

// ----------------------------- events -----------------------------

// intialize the show case area
showHamburguer();

// prevent a tags to reload the page
links.forEach((item) => item.addEventListener("click", (event) => event.preventDefault()));

// close the modal on the buttons
modalArea.querySelector(".body-left span").addEventListener("click", () => closeModal());
modalArea.querySelector("#cancelModal").addEventListener("click", () => closeModal());

// close the cart on the buttons
cartArea.querySelector("#closeCart").addEventListener("click", () => closeCart());
cartArea.querySelector("#cancelCart").addEventListener("click", () => closeCart());

// open cart are
document.querySelector("li.btn").addEventListener("click", () => openCart());
document.querySelector("a.btn").addEventListener("click", () => openCart());

// decrease count in the modal
modalArea.querySelector("#minus-qte").addEventListener("click", () => {
    let count = parseInt(countModal.innerHTML);
    // sets a minimum of 1 unity
    if (count > 1) {
        count--;
        countModal.innerHTML = count;
    }
});

// increase count in the modal
modalArea.querySelector("#plus-qte").addEventListener("click", () => {
    let count = parseInt(countModal.innerHTML);
    count++;
    countModal.innerHTML = count;
});

// additions and price increment 
modalArea.querySelectorAll(".add").forEach((item) => {
    item.querySelector(".custom-checkbox").addEventListener("click", () => {
        
        // resets additions to the hamburguer price and selects the price area
        let additions = 0;
        let currentPrice = parseFloat(modalArea.querySelector(".price span").innerHTML);

        // filters is the user wants to select or not the item
        if (!(item.querySelector(".custom-checkbox img").classList.contains("checked"))) {
            // selects the current price 
            additions += parseFloat(item.querySelector(".add-text span").innerHTML);
            currentPrice += additions;
            item.querySelector(".custom-checkbox img").classList.add("checked");
        } else {
            additions -= parseFloat(item.querySelector(".add-text span").innerHTML);
            currentPrice += additions;
            item.querySelector(".custom-checkbox img").classList.remove("checked");
        }
        modalArea.querySelector(".price span").innerHTML = currentPrice.toFixed(2);
    })
});

// add cart procedure
modalArea.querySelector("#addCart").addEventListener("click", () => {
    // gather the informations to the cart
    const hamburguer = modalArea.querySelector(".body-right .title").innerHTML;
    const count = modalArea.querySelector("#selected-qte").innerHTML;
    const price = modalArea.querySelector(".price span").innerHTML;
    const img = modalArea.querySelector("img").src;
    const additions = [];
    const obs = modalArea.querySelector("textarea").value;

    // insert the additions
    modalArea.querySelectorAll(".add").forEach( (item) => {
        if (item.querySelector(".custom-checkbox img").classList.contains("checked")) {
            additions.push((item.querySelector(".add-text").innerHTML.split(" ")[0]));
        }
    });

    const newHamburguerItem = {
        hamburguer,
        count,
        price,
        img,
        additions,
        obs
    }

    cartItems.push(newHamburguerItem);
    
    closeModal();
    updateCart();
    openCart();
});

// ----------------------------- functions -----------------------------

// show the habmburguers of the data base
function showHamburguer() {
    for (const hamb of hamburguers) {
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

        newHamburguer.addEventListener("click", () => {

            // changes the image
            modalArea.querySelector("img").src = hamb.img;

            // changes the name
            modalArea.querySelector(".body-right .title").innerHTML = hamb.name;

            // changes the discription 
            modalArea.querySelector(".desc").innerHTML = hamb.desc;

            // changes the category
            modalArea.querySelector(".category").innerHTML = hamb.category;

            // changes the price
            if (hamb.promoPrice) {
                modalArea.querySelector("#promoCart").style.display = "inline-block";
                modalArea.querySelector(".price span").innerHTML = hamb.price[1].toFixed(2);
            } else modalArea.querySelector(".price span").innerHTML = hamb.price[0].toFixed(2);

            // resets the areas
            modalArea.querySelectorAll(".add").forEach((item) => item.querySelector(".custom-checkbox img").classList.remove("checked"));
            modalArea.querySelector("textarea").value = "";
            
            openModal();
        })

        showArea.append(newHamburguer);
    }
}

// update the cart
function updateCart() {
    // resets the price and the display area
    let price = 0;
    cartDisplay.innerHTML = "";

    for (const hamb of cartItems) {
        // create a copy of the model
        const newHamburguer = document.querySelector(".model .burguer-cart").cloneNode(true);

        // set a image
        newHamburguer.querySelector("img").src = hamb.img;

        // set the hamburguer
        newHamburguer.querySelector(".title").innerHTML = hamb.hamburguer;

        // set the count
        newHamburguer.querySelector("#selected-qte-cart").innerHTML = hamb.count;

        // increment the price
        price += parseFloat(hamb.price) * parseInt(hamb.count);

        // buttons to control quantity
        newHamburguer.querySelector("#minus-qte-cart").addEventListener("click", () => {
            let count = parseInt(newHamburguer.querySelector("#selected-qte-cart").innerHTML);
            // sets a minimum of 1 unity
            if (count > 1) {
                count--;
                hamb.count = count;
                newHamburguer.querySelector("#selected-qte-cart").innerHTML = hamb.count;
            } else if (count === 1) {
                count--;
                hamb.count = count;

                // removes new hamburguer if the unity is less then 1
                cartDisplay.remove(newHamburguer);
            }
            updateCart();
        });

        newHamburguer.querySelector("#plus-qte-cart").addEventListener("click", () => {
            let count = parseInt(newHamburguer.querySelector("#selected-qte-cart").innerHTML);
            count++;
            hamb.count = count;
            newHamburguer.querySelector("#selected-qte-cart").innerHTML = hamb.count;
            updateCart();
        });

        cartArea.querySelector(".total-price span").innerHTML = price.toFixed(2);

        // add the hamburguer to the cart display
        cartDisplay.append(newHamburguer);
    }
}

// close the modal
function closeModal() {
    // close the modal
    modalArea.style.opacity = "0";
    setTimeout(() => modalArea.style.display = "none", 200);
}

// open the modal
function openModal() {
   // display the modal
   modalArea.style.opacity = "0";
   modalArea.style.display = "flex";
   setTimeout(() => modalArea.style.opacity = "1", 200);
}

// close the cart
function closeCart() {
    // close the cart
    cartArea.style.opacity = "0";
    setTimeout(() => cartArea.style.display = "none", 200);
}

// open the cart
function openCart() {
   // display the cart
   cartArea.style.opacity = "0";
   cartArea.style.display = "flex";
   setTimeout(() => cartArea.style.opacity = "1", 200);
}
