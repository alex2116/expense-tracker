const Category = require('../category')  //使用categorySchema

const {categorySeeds} = require('./category.json')  //使用record.json

const db = require('../../config/mongoose') //使用mongoose

db.once('open', () => {
  Category.create(categorySeeds)
    .then(() => {
      console.log('Category Done')
      return db.close()
    })
    .then(() => {
      console.log('database connection close')
    })
})