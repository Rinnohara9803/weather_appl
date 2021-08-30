const request = require('request');
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define paths for express config

const generalPathDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// register handlebars to engage partials

hbs.registerPartials(partialsDirectory)

// set up handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)


// set up static directory 

app.use(express.static(generalPathDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sagar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sagar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'What do you need help for???',
        name: 'Sagar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    else {

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                // res.render('weather', {
                //     location: location,
                //     forecast: forecastData,
                // })

                res.send({
                    location: location,
                    forecast: forecastData
                })
                
            });
        });

        
    }
})

app.get('/help/*' , (req, res) => {
    res.render('error', {
        title: 404,
        errorMessage: 'Help Article Not Found',
        name: 'Sagar'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        errorMessage: 'Page Not Found',
        name: 'Sagar'
    })
})



app.listen(port, () => {
    console.log(`Server running up in port ${port}`)
})