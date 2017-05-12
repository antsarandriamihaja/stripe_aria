const express = require('express');
const hbs = require('hbs');
const path = require('path');
const {config} = require('./config');
const stripe = require('stripe')(config.secret_key);
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render(path.join(__dirname, './views/index.hbs'))
})

app.post('/getCardToken', (req, res) => {
 
    var response = req.body.chargeData;
    stripe.customers.create({
        email: response.email,
        source: response.id
    })
        .then((customer) => {
            stripe.charges.create({
                amount: response.amount,
                currency: 'cad',
                description: 'Therapy charge',
                customer: customer.id
            })
        })
        .catch((err) => {
            console.log(`There was an error: ${err}`);
        })
        res.status(201).send('Payment Successful');
})

app.get('/success', (req, res)=>{
    console.log('success called')
    res.render(path.join(__dirname, './views/success.hbs'));
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})