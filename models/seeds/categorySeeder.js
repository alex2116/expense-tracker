const Category = require('../category')

const CategoryList = require('./record.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(CategoryList.categories)
    .then(() => {
      console.log('Category Done')
      return db.close()
    })
    .then(() => {
      console.log('database connection close')
    })
})