const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather')

const app = express();

app.use(express.static(path.join(__dirname,'../public')));

app.set('views', path.join(__dirname, '../templates'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'../templates/partials'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Soham Sagade'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        aboutMessage: 'This is about page!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide a valid location!"
        })    
    }

    geocode.getLocation(req.query.address, (err, [lat,lon] = []) =>  {
        if(err)
            res.send({ err });
        weather.getData([lat,lon], (err, data) => {
            if(err)
                res.send({ err })
            
                res.send({
                    location: req.query.address,
                    data
                });
            
            
        });
    });

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is help Message!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: 'Help',
        errorMessage: "Help page not found!"
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: "Not Found!",
        errorMessage: "Page not found!"
    })
})



app.listen(3000, () => console.log('Server up!'));