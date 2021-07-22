const express = require('express')
const exphbs = require('express-handlebars')
const handlebarsHelpers = require('handlebars-helpers')
const helpers = handlebarsHelpers()
const app = express()
const port = 3000

const Record = require('./models/record')
const Category = require('./models/category')
const categoryData = require('./models/seeds/category.json')

require('./config/mongoose')

app.engine('handlebars', exphbs({
  defaultLayout: 'main', helpers: helpers
}))

app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const totalAmount = getTotalAmount(records)
          records.forEach(record => {
            record.iconClass = getIconClassName(record.category, categories)
          })
          res.render('index', { records, totalAmount, categories })
        })
        .catch(error => console.log(error))
    })
})

app.get('/filter/:category', (req, res) => {
  const category = req.params.category
  return Record.find({ category: category })
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const totalAmount = getTotalAmount(records)
          records.forEach(record => {
            record.iconClass = getIconClassName(record.category, categories)
          })
          res.render('index', { records, totalAmount, categories })
        })
        .catch(error => console.log(error))
    })
})

app.get('/record/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categories: categoryData.categorySeeds }))
    .catch(error => console.log(error))    
})

app.get('/record/new', (req, res) => {
  res.render('new')
})

app.post('/record/new', (req, res) => {
  const { name, category, date, amount } = req.body

  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/record/:id/edit', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/record/:id/delete', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost: ${port}`)
})

function getTotalAmount(records) { //設計加總function 供路由使用
  const amounts = records.map(record => Number(record.amount))
  return amounts.reduce((sum, current) => sum + current, 0)
}

function getIconClassName(recordCategory, categories) {
  const categoryOfRecord = categories.find(category => category.category === recordCategory)
  return categoryOfRecord.icon
}

