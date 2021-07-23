const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const handlebarsHelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
require('./config/mongoose')

const helpers = handlebarsHelpers()
const app = express()
const port = 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: helpers
}))

app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})


