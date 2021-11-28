var express = require('express');
var app = express();
var myParser = require("body-parser");
var mysql = require('mysql');
var fs = require('fs'); 
var user_data_filename = `./public/user_data.json`;


console.log("Connecting to localhost...");
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: "root",
  port: 3306,
  database: "coffeetalk",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

function isNonNegInt(stringToCheck, returnErrors = false) {
  errors = []; // assume no errors at first
  if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
  if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

  return returnErrors ? errors : (errors.length == 0);
}
/*
function query_DB(POST, response) {
  if (isNonNegInt(POST['low_price'])
    && isNonNegInt(POST['high_price'])) {   // Only query if we got a low and high price
    low = POST['low_price'];      // Grab the parameters from the submitted form
    high = POST['high_price'];
    query = "SELECT * FROM Room where price > " + low + " and price < " + high;  // Build the query string
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json);

      // Now build the response: table of results and form to do another query
      response_form = `<form action="Room-query.html" method="GET">`;
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>Room#</td><td><B>Hotel#</td><td><B>Type</td><td><B>Price</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].roomNo}</td>`;
        response_form += `<td> ${res_json[i].hotelNo}</td>`;
        response_form += `<td> ${res_json[i].type}</td>`;
        response_form += `<td> ${res_json[i].price}</td></tr>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      response.send(response_form);
    });
  } else {
    response.send("Enter some prices doofus!");
  }
}
*/
function numofemployee(POST, response) {
    query = POST['numofemployee'];
    
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json);

      // Now build the response: table of results and form to do another query
      response_form = `<form action="index.html" method="GET">`;
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>First Name</td><td><B>Last Name</td><td><B>Gender</td></b>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].Fname}</td>`;
        response_form += `<td> ${res_json[i].Lname}</td>`;
        response_form += `<td> ${res_json[i].Gender}</td>`;
      }
      response_form += "</table>";
      response_form += `<input type="submit" value="Another Query?"> </form>`;
      console.log(response_form)
      var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
      return response.send(eval('`' + contents + '`')); // render template string)
    });

}

function numoforder(POST, response) {
  query = POST['numoforder'];
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="index.html" method="GET">`;
    response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    response_form += `<td><B>Order Number</td><td><B>Order ID</td><td><B>Order Date</td><td><B>Order Time</td></b>`;
    for (i in res_json) {
      response_form += `<tr><td> ${res_json[i].O_num}</td>`;
      response_form += `<td> ${res_json[i].O_id}</td>`;
      response_form += `<td> ${res_json[i].O_date}</td>`;
      response_form += `<td> ${res_json[i].O_time}</td>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
    return response.send(eval('`' + contents + '`')); // render template string)
  });

  
}

function numofmaterials(POST, response) {
  query = POST['numofmaterials'];
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="index.html" method="GET">`;
    response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    response_form += `<td><B>Material Name</td><td><B>Type</td><td><B>Quantity</td><td><B>Price</td></b>`;
    for (i in res_json) {
      response_form += `<tr><td> ${res_json[i].M_name}</td>`;
      response_form += `<td> ${res_json[i].M_type}</td>`;
      response_form += `<td> ${res_json[i].M_quantity}</td>`;
      response_form += `<td> ${res_json[i].M_price}</td>`;
    }
    response_form += "</table>";
    response_form += `<input type="submit" value="Another Query?"> </form>`;
    var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
    return response.send(eval('`' + contents + '`')); // render template string)
  });

  
}

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.post("/process_query", function (request, response) {
  let POST = request.body;
  query_DB(POST, response);
});

app.post("/numofemployee", function (request, response) {
  let POST = request.body;
  numofemployee(POST, response);
});

app.post("/numoforder", function (request, response) {
  let POST = request.body;
  numoforder(POST, response);
});

app.post("/numofmaterials", function (request, response) {
  let POST = request.body;
  numofmaterials(POST, response);
});

app.post("/user_data", function (request, response) {
  response.json(user_reg_data);
});

//Taken from Lab14. Checks to see if user_data.json exists
if (fs.existsSync(user_data_filename)) {
  data = fs.readFileSync(user_data_filename, 'utf-8');
  stats = fs.statSync(user_data_filename)
  var user_reg_data = JSON.parse(data); // Takes a string and converts it into object or array    
  console.log(user_data_filename + ' has ' + stats.size + ' characters');

  console.log(user_reg_data);//Displays register users in user_data.json
} else {
  console.log(user_data_filename + ' does not exist!');//Displays warning if user_data.json is missing
}

app.post("/loginform", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.body);
  username = request.body.username.toLowerCase();//will recieve username in lowercase ONLY
  if (typeof user_reg_data[username] != 'undefined') {
      //if username exists, get password 
      if ((user_reg_data[username].password == request.body.password) == true) {
          console.log(username + ' logged in');
          fullname = user_reg_data[username].name;
          response.cookie(`username`, username, {maxAge: 300000});
          response.redirect(`./employee.html`)
      } else {
          response.send(`<script>
          alert("The password that you have entered is not correct."); 
          window.history.back(); 
          
          </script>`);
      }
  } else {
      //Option to go back and retry login, or register a new account
      response.send(`<script>
      alert("The username you have entered does not match our records."); 
      window.history.back(); 
      
      </script>`);
  }

});

app.listen(8080, () => console.log(`listening on port 8080`));