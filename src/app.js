const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs') 

const app = express()

//Define paths and express config
const publiDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partalsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partalsPath)
//setup static directory to serve
app.use(express.static(publiDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Weather stack'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shubham Poddar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Everyone',
        helpText: 'This site is helpful'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
        geoCode(req.query.address,(error,{ latitude,longitude,location } = {}) => {
            if(error) {
                return res.send({error})
            } 
            foreCast(latitude,longitude, (error,foreCastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    foreCast: foreCastData,
                    location,
                    address: req.query.address
                })
            })
        })
        
    
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search box'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shubham Poddar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shubham Poddar',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on Port 3000');
})