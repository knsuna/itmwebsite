var express = require('express');
var app = express();
var myParser = require("body-parser"); 
var mysql = require('mysql');
var fs = require('fs'); 
const cookieParser = require('cookie-parser');
const { create } = require('domain');

// cookieParser middleware
app.use(cookieParser());

var employee_user_data_filename = `./public/employee_user_data.json`;
var mgr_user_data_filename = `./public/mgr_user_data.json`;
var user_data_filename = `./public/cust_user_data.json`;


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

var Null=null

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
      response_form += `<td><B>Employee ID</td>
      <td><B>First Name</td>
      <td><B>Middle Initial</td>
      <td><B>Last Name</td>
      <td><B>Gender</td>
      <td><B>Birth Date</td>
      </b>`;
      for (i in res_json) {
        
        response_form += `<tr><td> ${res_json[i].E_id}</td>`;
        response_form += `<td> ${res_json[i].Fname}</td>`;
        response_form += `<td> ${res_json[i].Minit}</td>`;
        response_form += `<td> ${res_json[i].Lname}</td>`;
        response_form += `<td> ${res_json[i].Gender}</td>`;
        response_form += `<td> ${res_json[i].Bdate}</td>`;
      }
      response_form += "</table>";
      response_form += `<input type="button" value="Go Back" onclick="history.back()"> </form>`;
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
    response_form += `<td><B>Order Number</td><td><B>Order ID</td><td><B>Order Date</td><td><B>Order Time</td></b><td><B>Employee ID</td></b><td><B>Customer ID</td></b>`;
    for (i in res_json) {
      response_form += `<tr><td> ${res_json[i].O_num}</td>`;
      response_form += `<td> ${res_json[i].O_id}</td>`;
      response_form += `<td> ${res_json[i].O_date}</td>`;
      response_form += `<td> ${res_json[i].O_time}</td>`;
      response_form += `<td> ${res_json[i].E_id}</td>`;
      response_form += `<td> ${res_json[i].Cust_id}</td>`;
    }
    response_form += "</table>";
    response_form += `<input type="button" value="Go Back" onclick="history.back()"> </form>`;
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
    response_form += `<td><B>Material Name</td><td><B>Type</td><td><B>Quantity</td><td><B>Price</td></b><td><B>Cost</td></b>`;
    for (i in res_json) {
      response_form += `<tr><td> ${res_json[i].M_name}</td>`;
      response_form += `<td> ${res_json[i].M_type}</td>`;
      response_form += `<td> ${res_json[i].M_quantity}</td>`;
      response_form += `<td> ${res_json[i].M_price}</td>`;
      response_form += `<td> ${res_json[i].M_Cost}</td>`;
    }
    response_form += "</table>";
    response_form += `<input type="button" value="Go Back" onclick="history.back()"> </form>`;
    var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
    return response.send(eval('`' + contents + '`')); // render template string)
  });

  
}

function customerinfo(POST, response) {
  query = POST['customerinfo'];
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    console.log(result);
    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="window.history.back()" method="GET">`;
    response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    response_form += `<td><B>Customer ID</td><td><B>First Name</td><td><B>Middle Initial</td><td><B>Last Name</td></b><td><B>Phone Number</td></b>`;
    for (i in res_json) {
      response_form += `<tr><td> ${res_json[i].Cust_id}</td>`;
      response_form += `<td> ${res_json[i].Fname}</td>`;
      response_form += `<td> ${res_json[i].Minit}</td>`;
      response_form += `<td> ${res_json[i].Lname}</td>`;
      response_form += `<td> ${res_json[i].Pnum}</td>`;
    }
    response_form += "</table>";
    response_form += `<input type="button" value="Go Back" onclick="history.back()"> </form>`;
    var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
    return response.send(eval('`' + contents + '`')); // render template string)
  });
}

function employee_efficiency(POST, response) {
    start = POST['start_date'];      // Grab the parameters from the submitted form
    end = POST['end_date'];
    query = `SELECT Fname, Lname, COUNT(\`order\`.Ssn) AS Total_Number From \`order\`, employee WHERE O_date> "${start}" AND O_date < \'${end}\' AND employee.Ssn=\`order\`.Ssn GROUP BY Fname, Lname;`;  // Build the query string
    console.log(query)
    con.query(query, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(result);
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json);

      // Now build the response: table of results and form to do another query
      response_form = `<form action="Room-query.html" method="GET">`;
      response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
      response_form += `<td><B>First Name</td><td><B>Last Name</td><td><B>Total Number of Customers</td>`;
      for (i in res_json) {
        response_form += `<tr><td> ${res_json[i].Fname}</td>`;
        response_form += `<td> ${res_json[i].Lname}</td>`;
        response_form += `<td> ${res_json[i].Total_Number}</td>`;

      }
      response_form += "</table>";
      response_form += `<input type="button" value="Go Back" onclick="history.back()"> </form>`;
      var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
      return response.send(eval('`' + contents + '`')); // render template string)
    });

}

function add_customer(POST, response) {
  Fname = POST['Fname'];
  Minit = POST['Minit'];
  Lname = POST['Lname'];
  Pnum = POST['pnum'];
  query = `INSERT INTO Customer (Fname, Minit, Lname, Pnum) VALUES ( "${Fname}", "${Minit}", "${Lname}", "${Pnum}")`;  // Build the query string
  console.log(query)
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) {
      response.send(`<script>
      alert("${err.sqlMessage}"); 
      window.history.back(); 
      
      </script>`);
  
    }
    else {
      response.send(`<script>
      alert("The record has been added"); 
      window.history.back(); 
      
      </script>`);
    }
  });
}

function add_employee(POST, response) {
  Ssn = POST[`Ssn`]
  Fname = POST['Fname'];
  Minit = POST['Minit'];
  Lname = POST['Lname'];
  Address = POST[`Address`]
  Gender = POST[`Gender`]
  Bdate = POST[`Bdate`]
  Salary = POST[`Salary`]
  MSsn = POST[`Superssn`]
  if(Minit="undefined"){
    Minit=''
  }
  if(Bdate="undefined"){
    Bdate=''
  }
  if(Salary="undefined"){
    Salary=''
  }

  query = `INSERT INTO Employee (Ssn, Fname, Minit, Lname, Address, Gender, Bdate, Salary, Superssn) VALUES ( "${Ssn}","${Fname}", "${Minit}", "${Lname}", "${Address}", "${Gender}", "${Bdate}","${Salary}", "${MSsn}")`;  // Build the query string
  console.log(query)
  con.query(query, function (err, result, fields) {  
    if (err) {
      response.send(`<script>
      alert("${err.sqlMessage}"); 
      window.history.back(); 
      
      </script>`);
  
    }
    
    else {
      
      response.send(`<script>
      alert("The record has been added"); 
      window.history.back(); 
      
      </script>`);
    }
  });
  con.query(`UPDATE employee SET Salary=Null WHERE Salary=""`, function (err, result, fields) { 
    if (err) throw err
  });
  con.query(`UPDATE employee SET Minit=Null WHERE Minit=""`, function (err, result, fields) { 
    if (err) throw err
  });
  con.query(`UPDATE employee SET Bdate=Null WHERE Bdate=""`, function (err, result, fields) { 
    if (err) throw err
  });
  
}


function order_form(GET, response) {

  query = "SELECT * FROM material";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    //console.log(result);

    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);

    // Now build the response: table of results and form to do another query
    response_form = `<select name="dropdown">`;
    for (i in res_json) {
      response_form += `<option value="${res_json[i].M_id}" > ${res_json[i].M_name} | Quantity: ${res_json[i].M_quantity}</option>`;
    }
    response_form += `</select>`;
        
    var contents = fs.readFileSync('./public/order.view', 'utf8');
    return response.send(eval('`' + contents + '`')); // render template string)
  });
}

function check_inv(POST, response) {
  query = "SELECT M_id, M_name, M_quantity, M_price, Sup_name FROM material,supplier WHERE material.Sup_num=supplier.Sup_num AND M_quantity<=3";
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) throw err;
    //console.log(result);

    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json);

    // Now build the response: table of results and form to do another query
    response_form = `<form action="Room-query.html" method="GET">`;
    response_form += `<table border="3" cellpadding="5" cellspacing="5">`;
    response_form += `<td><B>Material ID</td><td><B>Material Name</td><td><B>Material Quantity</td><td><B>Material Price</td><td><B>Supplier</td>`;
    for (i in res_json) {
    response_form += `<tr><td> ${res_json[i].M_id}</td>`;
    response_form += `<td> ${res_json[i].M_name}</td>`;
    response_form += `<td> ${res_json[i].M_quantity}</td>`;
    response_form += `<td> ${res_json[i].M_price}</td>`;
    response_form += `<td> ${res_json[i].Sup_name}</td>`;
    }
    response_form += "</table>";
    response_form += `<input type="button" value="Go Back" onclick="history.back()"> </form>`;
          var contents = fs.readFileSync('./public/template.view', 'utf8'); //So that the display_invoice_table_rows will be rendered with invoice.view
      return response.send(eval('`' + contents + '`')); // render template string)
  });
}


function add_customer(POST, response) {
  Fname = POST['Fname'];
  Minit = POST['Minit'];
  Lname = POST['Lname'];
  Pnum = POST['pnum'];
  email=POST['email']
  if(Minit="undefined"){
    Minit=''
  }
  query = `INSERT INTO Customer (Fname, Minit, Lname, Pnum, email) VALUES ( "${Fname}", "${Minit}", "${Lname}", "${Pnum}", "${email}")`;  // Build the query string
  console.log(query)
  con.query(query, function (err, result, fields) {   // Run the query
    if (err) {
      response.send(`<script>
      alert("${err.sqlMessage}"); 
      window.history.back(); 
      
      </script>`);
  
    }
    else {
      response.send(`<script>
      alert("The record has been added"); 
      window.history.back(); 
      
      </script>`);
    }
  });
  con.query(`UPDATE employee SET Minit=Null WHERE Minit=""`, function (err, result, fields) { 
    if (err) throw err
  });
}




app.use(cookieParser());

if (fs.existsSync(user_data_filename)) {
  data = fs.readFileSync(user_data_filename, 'utf-8');
  stats = fs.statSync(user_data_filename)
  var user_reg_data = JSON.parse(data); // Takes a string and converts it into object or array    
  console.log(user_data_filename + ' has ' + stats.size + ' characters');

  console.log(user_reg_data);//Displays register users in user_data.json
} else {
  console.log(user_data_filename + ' does not exist!');//Displays warning if user_data.json is missing
}

//The POST request will be redirected to either the invoice or be given a page to retry login/register new account. Partically taken from Lab 14
app.post("/loginform", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  username = request.cookies.username
  response.cookie(`username`, username, {maxAge: 300000});
  console.log(request.cookies.username)
  username = request.body.username.toLowerCase();//will recieve username in lowercase ONLY
  if (typeof user_reg_data[username] != 'undefined') {
      //if username exists, get password 
      if ((user_reg_data[username].password == request.body.password) == true) {
          console.log(username + ' logged in');
          fullname = user_reg_data[username].name;
          response.cookie(`username`, username, {maxAge: 300000});
          response.redirect(`./order_form`)
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


//The GET /register is taken from register.html
app.get("/register", function (request, response) {
  response.redirect(`./register.html`); // render template string
});
//When the POST /register is recieved it will begin the process to register new account
app.post("/register", function (request, response) {
  var username = request.body.username;//Assigns username to variable
  var password = request.body.password;//Assigns password to variable
  var second_password = request.body.secondpassword;//Assigns second password to variable
  var email = request.body.email.toLowerCase();//Assigns email to variable and converts to only lowercase
  var fname = request.body.fname;
  var minit = request.body.minit;
  var lname = request.body.lname;

  /*NOTE: I made the validation this way beucase I wanted to be able to display the particular error messages for each issue. 
  Instead of creating some type of function, I wanted the user to be able to see exactly what they were doing wrong by display the issue.
  */
  //if fullname is greater than 30, display error message
  if (!validatefullname(fname)) {
      console.log(`Full name is more than 30 characters long`);
      response.send(`<script>
          alert("${fname} is not valid. Please make sure it contains only letters and is shorter than 30 characters"); 
          window.history.back(); 
          
          </script>`);
  }
  else {
      var Goodfname = true;
  }
  if (!validatefullname(lname)) {
    console.log(`Full name is more than 30 characters long`);
    response.send(`<script>
        alert("${lname} is not valid. Please make sure it contains only letters and is shorter than 30 characters"); 
        window.history.back(); 
        
        </script>`);
}
else {
    var Goodlname = true;
}
  //if username is already defined, display error message
  if ((typeof user_reg_data[username] != 'undefined')) {
      console.log(`The username requested already exists`);
      response.send(`<script>
          alert("${username} already exists."); 
          window.history.back(); 
          
          </script>`);
  }
  else {
      var GoodUsername = true;
      //if username does not meet requirements from validate Username function (using regular expressions to check)
  }
  if (!validateUsername(username)) {
      console.log(`The username is to long or contains characters other than numbers and letters.`);
      response.send(`<script>
          alert("Your username:${username} is invalid. Please make sure that your password is between 4 and 10 characters (currently at ${username.length}) and only contains number and letters."); 
          window.history.back(); 
          
          </script>`);
  }
  else {
      var GoodUsernameLength = true;
  }
  //if password is not the same as second password, display error message
  if (password != second_password) {
      console.log(`Passwords do not match`);
      response.send(`<script>
          alert("Your passwords ${password} and ${second_password} do not match."); 
          window.history.back(); 
          
          </script>`);
  }
  else {
      var GoodPassword = true;
  }
  //if password is less than 6, display error message
  if (password.length < 6) {
      console.log(`Password is smaller than 6 characters`)
      response.send(`<script>
          alert("Your password ${password} is smaller than 6 characters."); 
          window.history.back(); 
          
          </script>`)
  }
  else {
      var GoodLength = true;
  }
  //if email does not meet requriments in validate email function, displa error message
  if (!validateEmail(email)) {
      console.log(`Email is invalid. Email must only contain letters, numbers, "_", and ".". Domains must be only three characters long.`)
      response.send(`<script>
          alert("Your email ${email} is not valid."); 
          window.history.back(); 
          
          </script>`)
  }
  else {
      var GoodEmail = true;
  }
  //Checks if every variable is true
  if (GoodUsername && GoodPassword && GoodLength && GoodEmail && GoodUsernameLength && Goodfname && Goodlname) {
      console.log(`Valid registration`)
      username = request.body.username.toLowerCase(); //get username in lowercase
      user_reg_data[username] = {}; //create empty object for array with username
      user_reg_data[username].fname = request.body.fname; 
      user_reg_data[username].minit = request.body.minit; 
      user_reg_data[username].lname = request.body.lname; 
      user_reg_data[username].password = request.body.password; //Assigns password to new object
      user_reg_data[username].pnum = request.body.pnum; //Assigns password to new object
      user_reg_data[username].email = request.body.email.toLowerCase(); //Assigns email to new object

      response.cookie(`username`, username, {maxAge: 300000});

      query = `INSERT INTO Customer (Fname, Minit, Lname, Pnum, email) VALUES ( "${request.body.fname}", "${request.body.minit}", "${request.body.lname}", "${request.body.pnum}", "${request.body.email}")`;
      console.log(query)
      con.query(query, function (err, result, fields) {   // Run the query
        if (err) {
          response.send(`<script>
          alert("${err.sqlMessage}"); 
          window.history.back(); 
          
          </script>`);
      
        }
      });
      secondquery = `insert into reward (points,Cust_id) select 0, Cust_id from customer where Pnum="${request.body.pnum}" AND email="${request.body.email}";`;
      console.log(secondquery)
      con.query(secondquery, function (err, result, fields) {   // Run the query
        if (err) {
          response.send(`<script>
          alert("${err.sqlMessage}"); 
          window.history.back(); 
          
          </script>`);
      
        }
      });


      fs.writeFileSync(user_data_filename, JSON.stringify(user_reg_data)); //This will turn ___ into a string
      response.redirect(`./index.html`)
  }

});

//renders the checkout when requested. Will save username, fullname, and email variables to be used in the form that is loaded
app.get("/checkout", function (request, response) {
  username = request.cookies.username
  console.log(request.cookies.username)
  if (typeof user_reg_data[username] != `undefined`) {
      fullname = user_reg_data[username].name;
      email = user_reg_data[username].email;
    response.redirect(`./order_form`)
  }
  else {
      response.send(`<script>
      alert("You have not logged in yet. Please login first!")
      window.location.href = "./login"
      </script>`)
  }
});

app.get("/logout", function (request, response) {
  response.clearCookie("username").redirect(`./index.html`)
});

app.get("/login", function (request, response) {
  username = request.cookies.username
  response.cookie(`username`, username, {maxAge: 300000});
  console.log(request.cookies.username)
  if (typeof user_reg_data[username] != `undefined`) {
      fullname = user_reg_data[username].name;
      var contents = fs.readFileSync('./public/order.view', 'utf8');
      return response.send(eval('`' + contents + '`')); // render template string)
  }
  return response.redirect(`./login.html`)
});

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

app.post("/customerinfo", function (request, response) {
  let POST = request.body;
  customerinfo(POST, response);
});

app.post("/employee_efficiency", function (request, response) {
  let POST = request.body;
  employee_efficiency(POST, response);
});

app.post("/add_customer", function (request, response) {
  let POST = request.body;
  add_customer(POST, response);
});

app.post("/add_employee", function (request, response) {
  let POST = request.body;
  add_employee(POST, response);
});

app.get("/order_form", function (request, response) {
  let POST = request.body;
  username = request.cookies.username
  //console.log(user_reg_data[username])
  fquery = `SELECT Cust_id FROM customer WHERE "${user_reg_data[username].pnum}"=Pnum AND "${user_reg_data[username].email}"=email`;
  con.query(fquery, function (err, result, fields) {   // Run the query
    if (err) throw err;
    //console.log(fquery);

    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    //console.log(res_json[0].Cust_id, res_json.length)
    C_form = ``;
    for (i in res_json) {
      C_form += `value="${res_json[0].Cust_id}"`;
    }
    C_form += ``;
  })

  dquery = `SELECT points FROM reward WHERE Cust_id IN (SELECT Cust_id FROM customer WHERE "${user_reg_data[username].pnum}"=Pnum AND "${user_reg_data[username].email}"=email)`;
  con.query(dquery, function (err, result, fields) {   // Run the query
    if (err) throw err;
    //console.log(dquery);

    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json, res_json.length)
    d_form = ``;
    for (i in res_json) {
      d_form += `${res_json[0].points}`;
    }
    d_form += ``;
  })

  order_form(POST, response);
});

app.get("./order_cust", function (request, response) {
  let POST = request.body;
  order_cust(POST, response);
});

app.get("./cust_point", function (request,response) {
  let POST = request.body;
  username = request.cookies.username
 //console.log(user_reg_data[username])
  dquery = `SELECT points FROM reward WHERE Cust_id IN (SELECT Cust_id FROM customer WHERE "${user_reg_data[username].pnum}"=Pnum AND "${user_reg_data[username].email}"=email)`;
  con.query(dquery, function (err, result, fields) {   // Run the query
    if (err) throw err;
    //console.log(dquery);

    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    //console.log(res_json, res_json.length)
    d_form = ``;
    for (i in res_json) {
      d_form += `${res_json[0].points}`;
    }
    d_form += ``;
  })
  console.log(dquery)

})

app.post("/create_order", function (request, response) {
  let POST = request.body;
  dropdown = POST[`dropdown`]
  oqty = POST['oqty'];

  dropdown = POST[`dropdown`]
  oqty = POST['oqty'];
  odate = POST['odate'];
  otime = POST['otime'];
  eid = POST[`eid`]
  cid = POST[`cid`]

  query = `INSERT INTO \`order\` (O_id, O_quantity, O_date, O_time, E_id, Cust_id) VALUES ( "${dropdown}","${oqty}", "${odate}", "${otime}", "3","${cid}")`;  // Build the query string
  console.log(query)
  con.query(query, function (err, result, fields) {  
    if (err) {
      response.send(`<script>
      alert("${err.sqlMessage}"); 
      window.history.back(); 
      
      </script>`);
  
    }
    
    else {
      con.query(`UPDATE material SET M_quantity = M_quantity-${oqty} WHERE M_id=${dropdown}`, function (err, result, fields) { 
        if (err) throw err
      });
      con.query(`UPDATE points SET points = points+${oqty} WHERE Cust_id=${cid}`, function (err, result, fields) { 
        if (err) throw err
      });
    }
  });
  dquery = `SELECT points FROM reward WHERE Cust_id IN (SELECT Cust_id FROM customer WHERE "${user_reg_data[username].pnum}"=Pnum AND "${user_reg_data[username].email}"=email)`;
  con.query(dquery, function (err, result, fields) {   // Run the query
    if (err) throw err;
    //console.log(dquery);

    var res_string = JSON.stringify(result);
    var res_json = JSON.parse(res_string);
    console.log(res_json, res_json.length)
    d_form = ``;
    for (i in res_json) {
      d_form += `${res_json[0].points}`;
    }
    d_form += ``;
  })

    fquery = `SELECT M_cost FROM Material WHERE M_id = ${dropdown}`;
    con.query(fquery, function (err, result, fields) {   // Run the query
      if (err) throw err;
      console.log(fquery);
  
      var res_string = JSON.stringify(result);
      var res_json = JSON.parse(res_string);
      console.log(res_json, res_json.length)
      total = ``;
      for (i in res_json) {
        total += `${res_json[0].M_cost * oqty}`;
      }
      total += ``;
      console.log(total)
      var contents = fs.readFileSync('./public/invoice.view', 'utf8');
      return response.send(eval('`' + contents + '`')); // render template string)
    })
  

  })

app.post("/check_inv", function (request, response) {
  let POST = request.body;
  check_inv(POST, response);
});

app.post("/user_data", function (request, response) {
  response.json(user_reg_data);
});




//Taken from Lab14. Checks to see if user_data.json exists
if (fs.existsSync(employee_user_data_filename)) {
  data = fs.readFileSync(employee_user_data_filename, 'utf-8');
  stats = fs.statSync(employee_user_data_filename)
  var employee_user_reg_data = JSON.parse(data); // Takes a string and converts it into object or array    
  console.log(employee_user_data_filename + ' has ' + stats.size + ' characters');

  console.log(employee_user_reg_data);//Displays register users in user_data.json
} else {
  console.log(employee_user_data_filename + ' does not exist!');//Displays warning if user_data.json is missing
}

app.post("/employeelogin", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.body);
  username = request.body.username.toLowerCase();//will recieve username in lowercase ONLY
  if (typeof employee_user_reg_data[username] != 'undefined') {
      //if username exists, get password 
      if ((employee_user_reg_data[username].password == request.body.password) == true) {
          console.log(username + ' logged in');
          fullname = employee_user_reg_data[username].name;
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



//Taken from Lab14. Checks to see if user_data.json exists
if (fs.existsSync(mgr_user_data_filename)) {
  data = fs.readFileSync(mgr_user_data_filename, 'utf-8');
  stats = fs.statSync(mgr_user_data_filename)
  var mgr_user_reg_data = JSON.parse(data); // Takes a string and converts it into object or array    
  console.log(mgr_user_data_filename + ' has ' + stats.size + ' characters');

  console.log(mgr_user_reg_data);//Displays register users in user_data.json
} else {
  console.log(mgr_user_data_filename + ' does not exist!');//Displays warning if user_data.json is missing
}

app.post("/managerloginform", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.body);
  username = request.body.username.toLowerCase();//will recieve username in lowercase ONLY
  if (typeof mgr_user_reg_data[username] != 'undefined') {
      //if username exists, get password 
      if ((mgr_user_reg_data[username].password == request.body.password) == true) {
          console.log(username + ' logged in');
          fullname = mgr_user_reg_data[username].name;
          response.cookie(`username`, username, {maxAge: 300000});
          response.redirect(`./manager.html`)
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

function validateEmail(email) {//used =@ and +\. to seperate sections of email
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-z]{2,3}$/;
  return re.test(String(email).toLowerCase());
}
//Modified to be between 4-10 characters long.
function validateUsername(user) {
  const re = /^[a-zA-Z0-9]{4,10}$/;
  return re.test(String(user).toLowerCase());
}

function validatefullname(fullname) {
  const re = /^[ +a-zA-Z]{0,30}$/
  return re.test(String(fullname));
}


app.listen(8080, () => console.log(`listening on port 8080`));