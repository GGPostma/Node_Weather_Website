const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gert'
    })
})

app.get('/about',(req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Gert'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }


    geocode(req.query.address,(error, {latitude, longitude, location} = {})=> {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'gert'
    })
})

app.get('/products',(req, res) => {


})

app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        message: 'The page you are looking for is not found',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})