// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
//Listen Port 
const port = 8000;
/*Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server 'node server.js'
app.listen(port, () => {
    console.log(`On: http://localhost:${port}`);
});
// Require Express to run server and routes
app.get('/All', (req, res) => {
    res.send(projectData);
});
//Post Data 
app.post('/postData', (req, res) => {
    //Post Data Now
    projectData = {
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    };
    res.send(projectData);
});