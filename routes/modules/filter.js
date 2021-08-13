const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getTotalAmount, getIconClassName } = require('../../public/javascripts/helpers')


router.get('/', async(req, res) => {
  try{
    const userId = req.user._id
    const { category } = req.query
    const { month } = req.query
    const categories = await Category.find().lean()
    const recordsOfuser = await Record.find({ userId }).lean()  
    const records = []   
    
    if (category && month) {                     //如果兩個都有
      const recordsFindByCategory = recordsOfuser.filter(record => record.category.includes(category))
      const recordsFindByBoth = recordsFindByCategory.filter(record => record.date.includes(month))
      recordsFindByBoth.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        records.push(record)
      })
    } else if (month) {                         //如果只有月份
      const recordsFindByMonth = recordsOfuser.filter(record => record.date.includes(month))
      recordsFindByMonth.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        records.push(record)
      })
    } else if (category) {                      //如果只有類別
      const recordsFindByCategory = recordsOfuser.filter(record => record.category.includes(category))
      recordsFindByCategory.forEach(record => {
        record.iconClass = getIconClassName(record.category, categories)
        records.push(record)
      })
    }

    const totalAmount = getTotalAmount(records)
    res.render('index', { records, totalAmount, categories, category, month })    
  } catch(e) {
    console.warn(e)
  }        
})

module.exports = router