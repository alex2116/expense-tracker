const functions = {
  getTotalAmount: function (records) {
    const amounts = records.map(record => Number(record.amount))
  return amounts.reduce((sum, current) => sum + current, 0)
},
  getIconClassName: function (recordCategory, categories) {
  const categoryOfRecord = categories.find(category => category.category === recordCategory)
  return categoryOfRecord.icon
}

}

module.exports = functions