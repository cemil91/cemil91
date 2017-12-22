var mysql = require('mysql');

var con = mysql.createConnection({
  host: "195.16.88.9",
  user: "ilqar845_oyun",
  password: "12345"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
