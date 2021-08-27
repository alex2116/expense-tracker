const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getTotalAmount, getIconClassName } = require('../../public/javascripts/helpers')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          const totalAmount = getTotalAmount(records)
          records.forEach(record => {
            record.iconClass = getIconClassName(record.category, categories)
          })
          res.render('index', { records, totalAmount, categories})
        })
        .catch(error => console.log(error))
    })
})

router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const { category } = req.query
    const { month } = req.query
    const categories = await Category.find().lean()
    const records = []

    if (category && month !== null) {                     //如果兩個都有
      const recordsFindByBoth = await Record.find({ userId, category, date: { "$regex": `${month}` } }).lean()
      recordsFindByBoth.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        records.push(record)
      })
    } else if (month !== null) {                         //如果只有月份
      const recordsFindByMonth = await Record.find({ userId, date: { "$regex": `${month}` } }).lean()
      recordsFindByMonth.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        records.push(record)
      })
    } else if (category) {                      //如果只有類別
      const recordsFindByCategory = await Record.find({ userId, category }).lean()
      console.log(recordsFindByCategory)
      recordsFindByCategory.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        records.push(record)
      })
    }

    const totalAmount = getTotalAmount(records)
    res.render('index', { records, totalAmount, categories, category, month })
  } catch (e) {
    console.warn(e)
  }
})

module.exports = router

