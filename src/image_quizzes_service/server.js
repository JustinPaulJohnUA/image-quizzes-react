// dependencies 
const express = require('express');
const url = require('url');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var cors = require('cors');

// routers
const generalRouter = require('./routers/generalRouter.js');
const adminRouter = require('./routers/adminRouter.js');

// create server 
const app = express();
const port = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use('/home', generalRouter);
app.use('/admin', adminRouter);

// localhost greeting
app.get('/', (request, response) => {
    response.json("Welcome to the Image Quiz Backend Service")
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));
