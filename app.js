const express = require('express')
const config = require('./config.json')
const bodyParser = require('body-parser')

const app = express()

// Middleware
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cookie-parser')())
app.use('/public', express.static('views/public'))

// Initialisation de notre session
app.use(require('express-session')({
    secret: config.secretSession,
    resave: false,
    saveUninitialized: false
}))

// Routage API
const ApiRouter = express.Router()
app.use(config.routeAPI, ApiRouter)

app.post('/', (req, res) => {
    console.log(req.body.motDePasse)
    if (req.body.motDePasse && req.body.motDePasse === config.motDePasse) {
        req.session.connexion = true
        res.sendFile(__dirname + '/views/index.html')
    } else res.redirect('/')
})

// Routage statique
app.get('/', (req, res) => {

    // Gestion de la deconnexion
    if (req.query.deconnexion === 'true') 
        req.session.connexion = false

    // Si connecter afficher la page principale
    if (req.session.connexion)
        res.sendFile(__dirname + '/views/index.html')

    // Sinon afficher la page de connexion
    else res.sendFile(__dirname + '/views/connexion.html')
})

app.listen(config.port, () => {
    console.log('Listen to localhost:' + config.port)
})