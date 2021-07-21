const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({
  defaultLayout:'main'
}))

app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/record/edit', (req,res) => {
  res.render('edit')
})

app.get('/record/new', (req, res) => {
  res.render('new')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})
