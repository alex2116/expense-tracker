const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const handlebarsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
require('./config/mongoose')

const helpers = handlebarsHelpers()
const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: helpers
}))

app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost: ${PORT}`)
})


