// Sample data for items
const itemsData = [
    { name: "Item One", price: 23 },
    { name: "Item Two", price: 999 },
    { name: "Item Three", price: 333 },
    { name: "Item Four", price: 666 },
    { name: "Item Five", price: 3 },
    { name: "Item Six", price: 6 },
    { name: "Item Seven", price: 9 },
    { name: "Item Eight", price: 33 },
    { name: "Item Nine", price: 99 },
    { name: "Item Ten", price: 66 },
];

// Select the items list
const itemsList = document.getElementById("items");

// Function to create a new list item
function createItem(itemData) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "item");

    listItem.innerHTML = `
        <div class="row">
            <h3 class="col-4 item-name">${itemData.name} <span class="item-price">${itemData.price}</span>$</h3>
            <div class="col-1"><img class="heart" src="RES/heartNull.png" alt="Heart" width="40" height="40"></div>
            <button type="button" class="col-1 btn btn-secondary minus-button"><h4>-</h4></button>
            <div class="col-1"><h3 class="quantity">1</h3></div>
            <button type="button" class="col-1 btn btn-primary add-button"><h4>+</h4></button>
            <button type="button" class="col-1 offset-2 btn btn-danger delete-button">DELETE</button>
        </div>
    `;

    itemsList.appendChild(listItem);
}

// Populate the items dynamically
itemsData.forEach(createItem);

// Select elements using querySelectorAll
const addButtons = document.querySelectorAll(".add-button");
const minusButtons = document.querySelectorAll(".minus-button");
const quantityElements = document.querySelectorAll(".quantity");
const priceElements = document.querySelectorAll(".item-price");
const deleteButtons = document.querySelectorAll(".delete-button");
const parentItems = document.querySelectorAll(".item");
const heartIcons = document.querySelectorAll(".heart");
const totalPriceElement = document.getElementById('total-price');

// Initialize arrays and variables
const quantities = Array.from(quantityElements).map(_ => 1);
const prices = Array.from(priceElements).map(priceElement => +priceElement.textContent);

// Update the total price
function updateTotal() {
    const total = quantities.reduce((acc, quantity, i) => acc + prices[i] * quantity, 0);
    totalPriceElement.textContent = `TOTAL PRICE: $${total}`;
}

// Initial total update
updateTotal();

// Add event listeners for the plus buttons
addButtons.forEach((addButton, i) => {
    addButton.addEventListener("click", () => {
        quantities[i]++;
        quantityElements[i].textContent = quantities[i];
        updateTotal();
    });
});

// Add event listeners for the minus buttons
minusButtons.forEach((minusButton, i) => {
    minusButton.addEventListener("click", () => {
        if (quantities[i] > 1) {
            quantities[i]--;
            quantityElements[i].textContent = quantities[i];
            updateTotal();
        }
    });
});

// Add event listeners for the delete buttons
deleteButtons.forEach((deleteButton, i) => {
    deleteButton.addEventListener("click", () => {
        quantities[i] = 0;
        updateTotal();
        parentItems[i].remove();
    });
});

// Add event listeners for the heart icons
heartIcons.forEach((heartIcon, i) => {
    heartIcon.addEventListener("click", () => {
        const currentSrc = heartIcon.getAttribute('src');
        const newSrc = currentSrc === "RES/heartNull.png" ? "RES/heartLike.png" : "RES/heartNull.png";
        heartIcon.setAttribute('src', newSrc);
    });
});
