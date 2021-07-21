const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const Record = require('./models/record')
const Category = require('./models/category')
const category = require('./models/category')

require('./config/mongoose')

app.engine('handlebars', exphbs({
  defaultLayout:'main'
}))

app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(category => {
          const totalAmount = getTotalAmount(records).toLocaleString()
          res.render('index', { records, totalAmont, category })
        })
        .catch(error => console.log(error))
    })
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

function getTotalAmount(records) { //設計加總function 供路由使用
  let sum = 0
  records.foreach((record) => {
    sum += record.amount
  })
  return sum
}