const express = require('express');
const hbs = require('hbs');
const path = require('path');
var port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res)=>{
    res.render(path.join(__dirname, './views/index.hbs'))
})

app.post('/getCardToken', (req, res)=>{
    res.send('Got token')
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})