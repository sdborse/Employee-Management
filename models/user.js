var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "sumit",
	database: "employee_management"
  });
  
  con.connect(function(err) {
	if (err) throw err;
		console.log("Connected..")
	});
