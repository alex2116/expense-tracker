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
  return Record.find({category: category}) 
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


app.get('/record/edit', (req, res) => {
  res.render('edit')
})

app.get('/record/new', (req, res) => {
  res.render('new')
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
