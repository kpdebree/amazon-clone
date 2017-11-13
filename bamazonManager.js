var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("./password")

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: password,
	database: "Bamazon"
});

connection.connect(function(err) {
	if(err) throw err;
	console.log("Connected");
	start_menu();
});

function start_menu() {
	inquirer
		.prompt({
			name: "Bamazon",
			type: "list",
			message: "Welcome to Bamazon",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
		})
			.then(function(answer) {
				switch (answer.Bamazon) 
				{
					case "View Products for Sale":
						displayInventory();
					break;
					case "View Low Inventory":
						displayLowInventory();
					break;
					case "Add to Inventory":
						addInventory();
					break;

					case "Add New Product":
						addNewProduct();
					break;

					case "Quit":
						quitApplication();
					break;

			}
		})
}

function displayInventory() {
	connection.query("SELECT * FROM products", function(err, results) {
		console.log(results)
		start_menu();
	})
}

function displayLowInventory() {
	connection.query("SELECT * FROM products", function(err, results) {
		var displayArray = [];
		for (i = 0; i < results.length; i++) {
			if (results[i].stock_quantity < 5) {
				displayArray.push(results[i])
			}
		}
		start_menu();
	})
}

function addInventory() {
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;
		inquirer
			.prompt([
				{
					name: "choice",
					type: "list",
					choices: function() {
						var choiceArray = [];
						for (var i = 0; i < results.length; i++) {
							choiceArray.push(results[i].product_name)
						}
						return choiceArray;
					},
					message: "Which item would you to add?"
				},
				{
					name: "quantity",
					type: "input",
					message: "How many units would you like to add?"
				}
			]).then(function(answer) {
				var quantity = answer.quantity;
				var chosenItem;
				for (var i = 0; i < results.length; i++) {
					if (results[i].product_name === answer.choice) {
						chosenItem = results[i]
					}
				}
				var newQuantity = chosenItem.stock_quantity + quantity;
					connection.query(
						"UPDATE products SET ? WHERE ?",
						[
						{
							stock_quantity: newQuantity
						},
						{
							item_id: chosenItem.item_id
						}	 
						],
						function(error) {
							if (error) throw err;
							console.log("Inventory Updated");
							start_menu();
						}
					);
				})
			});
}

function addNewProduct() {
	connection.query("SELECT * FROM products", function(err, results) {
		inquirer
			.prompt([
				{
					name: "product_name",
					type: "input",
					message: "What is the name of the Product?"
				},
				{
					name: "department_name",
					type: "input",
					message: "What is the name of the Department?"
				},
				{
					name: "product_price",
					type: "input",
					message: "What is the price of the product?"
				},
				{
					name: "stock_quantity",
					type: "input",
					message: "How many units would you like to add?"
				},
				]).then(function(answer) {
					var newProduct = {
						product_name: answer.product_name,
						department_name: answer.department_name,
						product_price: answer.product_price,
						stock_quantity: answer.stock_quantity
					}
					console.log(newProduct);
					connection.query(
						"INSERT INTO products SET ?",
							[
							{
								product_name: newProduct.product_name,
								department_name: newProduct.department_name,
								product_price: newProduct.product_price,
								stock_quantity: newProduct.stock_quantity
							}
							],
							function(error) {
								if (error) throw err;
								console.log("Item Added");
								start_menu();
							}
						);
				})
	});
}


function quitApplication() {
	console.log("Quitting...");
	connection.end();
}