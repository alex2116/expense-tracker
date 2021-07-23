const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const categoryData = require('../../models/seeds/category.json')
const { getTotalAmount, getIconClassName } = require('../../public/javascripts/helpers')

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categories: categoryData.categorySeeds }))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, category, date, amount } = req.body

  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router