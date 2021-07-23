const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getTotalAmount, getIconClassName } = require('../../public/javascripts/helpers')

router.get('/', (req, res) => {
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

module.exports = router

