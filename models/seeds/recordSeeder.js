
const Record = require('../record')

const RecordList = require('./record.json')

const db = require('../../config/mongoose')

//連線成功
db.once('open', () => {
  Record.create(RecordList.results)
    .then(() => {
      console.log('Record Done')
      return db.close()
    })
    .then(() => {
      console.log('database connection close')
    })
})