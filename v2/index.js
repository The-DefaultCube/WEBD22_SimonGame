const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());



const PORT = 3000
const DB_NAME = 'db/leaderboards.sqlite'

app.listen(PORT, function () {
  console.log(`Server is listening at http://localhost:${PORT}`)
});



// db*********************************************************************

const initSqlJs = require('sql.js');

// // one time init of db

// initSqlJs().then(function (SQL) {
//   console.log("sql.js initialized 🎉");
//   const db = new SQL.Database();

//   const data = db.export();
// 	const buffer = Buffer.from(data);
// 	fs.writeFileSync(DB_NAME, buffer);
//   console.log('created new db!')
// });


// ****************************<HOME>*********************************

app.get("/", (req,res)=>{
	// console.log(req);
	const filePath = path.join(__dirname, 'index.html');
	res.sendFile(filePath);
})


// ****************************<HELP>*********************************

app.get("/help", (req,res)=>{
	// console.log(req);
	const filePath = path.join(__dirname, 'how_to.html');
	res.sendFile(filePath);
})


app.post("/save_score", (req, res)=>{
	console.log('req recieved')
	const { name, score } = req.body;
  console.log(`Received data - Name: ${name}, Score: ${score}`);

  res.json({ status: 'Data saved successfully' });
})


app.get("/save", (req,res)=>{
	// load db and save new entry
	const filebuffer = fs.readFileSync(DB_NAME);
	initSqlJs().then(function(SQL){
  // Load the db
  const db = new SQL.Database(filebuffer);
  // create new entry
  let sqlstr = "INSERT INTO hello VALUES (0, 'Rahul', 10);"
  db.run(sqlstr);
	// save db
  const data = db.export();
	const buffer = Buffer.from(data);
	fs.writeFileSync(DB_NAME, buffer);  
	});
	console.log('saved score!')
	res.redirect('/leaderboards');
})


app.get("/leaderboards", (req,res)=>{
	let scores = '<h1>Name - Score </h1>'
	const filebuffer = fs.readFileSync(DB_NAME);
	initSqlJs().then(function(SQL){

	  // Load the db
	  const db = new SQL.Database(filebuffer);
	  const result = db.exec("SELECT * FROM hello");
	  const rows = result[0].values;
    rows.forEach(row => {
      // console.log(row[1], row[2], typeof(row[1]), typeof(row[2]));
    	scores = scores + "<h2>" + row[1] + " - " + row[2] + "</h2>"
      });
    res.send(scores);
	});
	console.log(scores)
	// res.send(`<h2> ${scores} </h2>`);
})



app.get("/db", (req,res)=>{
	// load the db from file
	const filebuffer = fs.readFileSync(DB_NAME);
	initSqlJs().then(function(SQL){
	  // Load the db
	  const db = new SQL.Database(filebuffer);
	  console.log(`loaded ${DB_NAME} db ...`)
	  let sqlstr = "CREATE TABLE hello (idx int, name char, score int); \
		INSERT INTO hello VALUES (0, 'Hello', 55); \
		INSERT INTO hello VALUES (1, 'world', 368); \
		INSERT INTO hello VALUES (2, 'Lie', 38); \
		INSERT INTO hello VALUES (1, 'won', 8);";
		db.run(sqlstr);
		const result = db.exec("SELECT * FROM hello");
		
	  console.log(result)
	  const rows = result[0].values;
    rows.forEach(row => {
        console.log(row);
      });
    // save
    const data = db.export();
		const buffer = Buffer.from(data);
		fs.writeFileSync(DB_NAME, buffer);
	});
	res.send('done!');
})