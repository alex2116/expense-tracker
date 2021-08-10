const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const handlebarsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
require('./config/mongoose')
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const helpers = handlebarsHelpers()
const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: helpers
}))

app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true 
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost: ${PORT}`)
})


