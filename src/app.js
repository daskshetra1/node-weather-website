const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// Define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kshetrabasi Das'
    });
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kshetrabasi Das'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help pgae.',
        title: 'Help',
        name: 'Kshetrabasi Das'
    });
});

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>');
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            errorMessage: 'Please enter a valid Location!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    // console.log(req.query.search)
    // res.send({
    //     forcast: 'It snowing out side!',
    //     location: 'Philadelphia',
    //     search: req.query.search 
    // })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Kshetrabasi Das',
        errorMessage: 'Help artical not found.'
    })
})

app.get('/products',(req, res) => {
    if(!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a serach term!'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: 404,
        name: 'Kshetrabasi Das',
        errorMessage: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});