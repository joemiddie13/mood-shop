import data from "./data.js"
console.log(data)
const itemsContainer = document.querySelector("#items")

// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = data[i].desc
	// append the paragraph to the div
	newDiv.appendChild(desc)
	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)
	// Make a button 
	const button = document.createElement('button')
	// add an id name to the button
	button.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
}

const cart = []

function addItem(name, price) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			cart[i].qty += 1
			return
		}
	}
    const item = {name, price, qty: 1}
    cart.push(item)
}

// Show Items
function showItems() {
	const qty = getQty()
	console.log(`You have ${qty} items in your cart`)
	
	for (let i = 0; i < cart.length; i += 1) {
        console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }
	console.log(`Total in cart: $${getTotalPrice()}`)
}

// Get Qty
function getQty() {
	let qty = 0
	for (let i = 0; i < cart.length; i += 1) {
		qty += cart[i].qty
	}
	return qty
}

// Get total price
function getTotalPrice() {
	let total_price = 0
	for (let i = 0; i < cart.length; i +=1) {
		total_price += cart[i].price * cart[i].qty
	}
	return total_price.toFixed(2)
}

addItem("happy", 5.99)
addItem("sad", 5.99)
addItem("angry", 5.99)
addItem("calm", 5.99)
addItem("curious", 5.99)
addItem("happy", 5.99)

showItems()