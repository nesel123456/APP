<<<<<<< HEAD
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	  res.send('Hello World!');
});

app.get('/reviews', (req, res) => {
	  res.send('This is the reviews page.');
});


app.get('/locations', (req, res) => {
	res.send('This is the locations page.');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
=======
const express = require("express");
const app = express();

app.get("/", function(req, res) {
    return res.send("Hello World");
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
>>>>>>> main
});
