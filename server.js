const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) =>{
    var now = Date().toString();
    var log =`${now}: ${req.method} ${req.originalUrl}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) =>{
        if (err){
            console.log('Unable to append to sever.log')
        }
    });
    next();
});
// app.use((req,res,next) => {
//     res.render('maintenance.hbs') ;
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    //return 'test';
    return new Date().getFullYear()
  });

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {
    //res.send('<h1>Hello, Express</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage:'Welcome to the site', 
    })
})

app.get('/about', (req,res) =>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
});

app.get('/bad', (req,res) =>{
    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(3000, () =>{
 console.log('Server is up on port 3000');
});