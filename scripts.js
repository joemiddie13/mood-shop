import data from "./data.js"
console.log(data)
const itemsContainer = document.querySelector("#items")
const itemList = document.getElementById("item-list")
const cartQty = document.getElementById("cart-qty")
const cartTotal = document.getElementById("cart-total")
itemList.innerHTML = '<li> Hello World</li>'

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

//__________________________________________
// Add Item
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

//___________________________________________________
// Show Items
function showItems() {
	const qty = getQty()
	//console.log(`You have ${qty} items in your cart`)
	cartQty.innerHTML = `You have ${qty} items in your cart`

	let itemStr = ''
	for (let i = 0; i < cart.length; i += 1) {
        //console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
		// const name = cart[i].name
		// const price = cart[i].price
		// const qty = cart[i].qty
		//{ name: 'Apple', price: 0.99, qty: 3}
		const { name, price, qty } = cart[i]

		itemStr += `<li> ${name} $${price} x ${qty} = ${qty * price}</li>`
	}
	const all_items_button = Array.from(document.querySelectorAll("button"))
	all_items_button.forEach(elt => elt.addEventListener('click', () => {
		addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
		showItems()
	}))	
	itemList.innerHTML = itemStr

	//console.log(`Total in cart: $${getTotalPrice()}`)
	cartTotal.innerHTML = `Total in cart: $${getTotalPrice()}`
}

//_____________________________________________
// Get Qty
function getQty() {
	let qty = 0
	for (let i = 0; i < cart.length; i += 1) {
		qty += cart[i].qty
	}
	return qty
}

//______________________________________________
// Get total price
function getTotalPrice() {
	let total_price = 0
	for (let i = 0; i < cart.length; i +=1) {
		total_price += cart[i].price * cart[i].qty
	}
	return total_price.toFixed(2)
}

//______________________________________________
// Remove Item
function removeItem (name, qty = 0) {
	for (let i = 0; i < cart.length; i += 1) {
		if(cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty
			}
			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1)
			}
			return
		}
	}
}

//_____________________
addItem("happy", 5.99)
addItem("sad", 5.99)
addItem("angry", 5.99)
addItem("calm", 5.99)
addItem("curious", 5.99)
addItem("happy", 5.99)
addItem("happy", 5.99)
addItem("sad", 5.99)
showItems()

removeItem("happy", 1)
removeItem("sad", 1)
showItems()