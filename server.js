const express = require('express');
const hbs = require('hbs');
const path = require('path');
const config = require('./config');
const stripe = require('stripe')(config.secret_key);
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.render(path.join(__dirname, './views/index.hbs'))
})

app.post('/getCardToken', (req, res)=>{
    var token = req.body.stripeToken;
  
    res.send(token)
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})