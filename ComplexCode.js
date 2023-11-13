/*
 * Filename: ComplexCode.js
 * 
 * This code demonstrates a complex JavaScript implementation with several modules and functionalities.
 * It simulates a virtual store with products, customers, and orders.
 */

// ------------------------ Module: Product ------------------------

class Product {
  constructor(name, price, availableQuantity) {
    this.name = name;
    this.price = price;
    this.availableQuantity = availableQuantity;
  }

  updateQuantity(quantity) {
    if (quantity >= 0) {
      this.availableQuantity = quantity;
    }
  }

  calculateTotalCost(quantity) {
    return this.price * quantity;
  }
}

// ------------------------ Module: Store ------------------------

class Store {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productName) {
    this.products = this.products.filter(product => product.name !== productName);
  }

  findProduct(productName) {
    return this.products.find(product => product.name === productName);
  }

  displayAllProducts() {
    console.log("Products available in the store:");
    for (const product of this.products) {
      console.log(`Name: ${product.name}, Price: ${product.price}`);
    }
  }
}

// ------------------------ Module: Customer ------------------------

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orderedProducts = [];
  }

  placeOrder(product, quantity) {
    if (product.availableQuantity >= quantity) {
      product.updateQuantity(product.availableQuantity - quantity);
      this.orderedProducts.push({ product, quantity });
      console.log(`Order placed by ${this.name}`);
    } else {
      console.log(`Insufficient quantity of ${product.name}`);
    }
  }

  getOrderedProducts() {
    console.log(`Ordered products by ${this.name}:`);
    for (const { product, quantity } of this.orderedProducts) {
      console.log(`Product: ${product.name}, Quantity: ${quantity}`);
    }
  }
}

// ------------------------ Module: Order ------------------------

class Order {
  constructor(customerName) {
    this.customerName = customerName;
    this.products = [];
  }

  addProduct(product, quantity) {
    this.products.push({ product, quantity });
  }

  removeProduct(productName) {
    this.products = this.products.filter(({ product }) => product.name !== productName);
  }

  calculateTotalCost() {
    let totalCost = 0;
    for (const { product, quantity } of this.products) {
      totalCost += product.calculateTotalCost(quantity);
    }
    return totalCost;
  }
}

// ------------------------ Usage Example ------------------------

const store = new Store();

const product1 = new Product("Shirt", 25.99, 10);
const product2 = new Product("Pants", 39.99, 5);
const product3 = new Product("Shoes", 79.99, 3);

store.addProduct(product1);
store.addProduct(product2);
store.addProduct(product3);

store.displayAllProducts();

const customer1 = new Customer("John", "john@example.com");

customer1.placeOrder(product1, 2);
customer1.placeOrder(product2, 1);
customer1.placeOrder(product3, 2);

const customer2 = new Customer("Lisa", "lisa@example.com");

customer2.placeOrder(product2, 3);
customer2.placeOrder(product3, 1);

customer1.getOrderedProducts();
customer2.getOrderedProducts();

const order = new Order("John");

order.addProduct(product1, 2);
order.addProduct(product2, 1);

console.log(`Total cost of the order: $${order.calculateTotalCost().toFixed(2)}`);

order.removeProduct("Shirt");

console.log(`Total cost of the order after removing a product: $${order.calculateTotalCost().toFixed(2)}`);
