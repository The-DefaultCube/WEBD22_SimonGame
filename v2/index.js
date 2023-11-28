const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());



const PORT = 3000
// const DB_NAME = 'db/leaderboards.sqlite'
const DB_NAME = 'db/lb.sqlite'
const TABLE_NAME = 'leaderboards'


app.listen(PORT, function () {
  console.log(`Server is listening at http://localhost:${PORT}`)
});



// *****************************< DB >***********************************

const initSqlJs = require('sql.js');

if (!fs.existsSync(DB_NAME)){
		initSqlJs().then(function (SQL) {
	  console.log("sql.js initialized 🎉");
	  const db = new SQL.Database();
	  // create table -- schema
	  let sqlstr = `CREATE TABLE ${TABLE_NAME} (name char, score int);\
	  							INSERT INTO ${TABLE_NAME} VALUES ('test', 0);`;
		db.run(sqlstr);
	  const data = db.export();
		const buffer = Buffer.from(data);
		fs.writeFileSync(DB_NAME, buffer);
	  console.log('Created new db!')
	});
}else{
	console.log("DB exists !")
}



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

// *************************<LEADERBOARDS>***************************

app.get("/leaderboards", (req,res)=>{
	const filePath = path.join(__dirname, 'leaderboards.html');
	res.sendFile(filePath);
})

// ****************************<SAVE>*********************************
app.post("/save_score", (req, res)=>{
	console.log('req recieved')
	const { name, score } = req.body;
  console.log(`Received data - Name: ${name}, Score: ${score}`);

  const filebuffer = fs.readFileSync(DB_NAME);
	initSqlJs().then(function(SQL){
  // Load the db
  const db = new SQL.Database(filebuffer);
  // create new entry
  let sqlstr = `INSERT INTO ${TABLE_NAME} VALUES ("${name}", ${score} );`
  // console.log(sqlstr)
  db.run(sqlstr);
	// save db
  const data = db.export();
	const buffer = Buffer.from(data);
	fs.writeFileSync(DB_NAME, buffer);  
	});
	console.log('saved score!')
  res.json({ status: 'Data saved successfully' });
})


// ****************************<API>***************************************

app.get("/api/leaderboards", (req,res)=>{
	let scores = '<h1>Name - Score </h1>'
	const filebuffer = fs.readFileSync(DB_NAME);
	initSqlJs().then(function(SQL){

	  // Load the db
	  const db = new SQL.Database(filebuffer);
	  const result = db.exec(`SELECT * FROM ${TABLE_NAME} ORDER BY score DESC`);
	  const rows = result[0].values;
    rows.forEach(row => {
    	scores = scores + "<h2>" + row[0] + "---" + row[1] + "</h2>";
      });
    res.send(result[0]);
	});
})



