const express = require('express')
const config = require('./assets/config.json')
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
    saveUninitialized: false,
    cookie: {
        sameSite: true
    }
}))

// Fermeture de la session 

// Routage API
const ApiRouter = express.Router()
app.use(config.routeAPI, ApiRouter)

const Vocabulaire = require('./classes/Vocabulaire')

ApiRouter.use((req, res, next) => {
    if (req.session && req.session.connexion === true)
        next()
    else res.status(401).end('My API is so secured')
})

ApiRouter.route('/')
    .get((req, res) => res.json(Vocabulaire.getWord()))
    .post((req, res) => res.json(Vocabulaire.addWord(req.body.enWord, req.body.frWord)))

ApiRouter.route('/:id')
    .get((req, res) => res.json(Vocabulaire.getWord(req.params.id)))
    .post((req, res) => res.json(Vocabulaire.addWord(req.body.enWord, req.body.frWord)))
    .put((req, res) => res.json(Vocabulaire.updateWord(req.params.id, parseInt(req.query.know))))
    .delete((req, res) => res.json(Vocabulaire.deleteWord(req.params.id)))

// Routage statique

app.post('/', (req, res) => {
    if (req.body.motDePasse && req.body.motDePasse === config.motDePasse) {
        req.session.connexion = true
        res.sendFile(__dirname + '/views/index.html')
    } else res.redirect('/')
})

app.get('/', (req, res) => {

    // Gestion de la deconnexion
    if (req.query.deconnexion === 'true')
        req.session.destroy(() => Vocabulaire.sauvegarde())

    // Si connecter afficher la page principale
    if (req.session && req.session.connexion === true)
        res.sendFile(__dirname + '/views/index.html')

    // Sinon afficher la page de connexion
    else res.sendFile(__dirname + '/views/connexion.html')

})

app.listen(config.port, () => {
    console.log('Listen to localhost:' + config.port)
})