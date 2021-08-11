const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getTotalAmount, getIconClassName} = require('../../public/javascripts/helpers')


//重構
router.get('/:category', (req, res) => {
  const userId = req.user._id
  const category = req.params.category
  
  return Record.find({ category, userId })
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

// router.get('/:category', (req, res) => {
//   const category = req.params.category
//   return Record.find({ category: category })
//     .lean()
//     .then(records => {
//       console.log(records)
//       Category.find()
//         .lean()
//         .then(categories => {
//           const totalAmount = getTotalAmount(records)
//           records.forEach(record => {
//             record.iconClass = getIconClassName(record.category, categories)
//           })
//           res.render('index', { records, totalAmount, categories })
//         })
//         .catch(error => console.log(error))
//     })
// })

module.exports = router
