var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "Theophan123",
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
			choices: ["View Selection", "Quit"]
		})
			.then(function(answer) {
				if (answer.Bamazon === "View Selection") {
					displayInventory();
				}
				else {
					quitApplication();
				}
			})
}

function displayInventory() {
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
					message: "Which item would you like to purchase?"
				},
				{
					name: "purchase",
					type: "input",
					message: "How many units would you like to purchase?"
				}
			]).then(function(answer) {
				var chosenItem;
				for (var i = 0; i < results.length; i++) {
					if (results[i].product_name === answer.choice) {
						chosenItem = results[i]
						console.log(chosenItem);
					}
				}
			})


		connection.end();
	});
}

function quitApplication() {
	console.log("Quitting...");
	connection.end();
}