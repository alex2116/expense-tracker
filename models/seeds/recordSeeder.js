const bcrypt = require('bcryptjs')
const Record = require('../record')
const recordSeeds = require('./record.json')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
}

//連線成功
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordSeeds.recordSeeds.length }, (_, i) => Record.create({
          name: recordSeeds.recordSeeds[i].name,
          category: recordSeeds.recordSeeds[i].category,
          date: recordSeeds.recordSeeds[i].date,
          amount: recordSeeds.recordSeeds[i].amount,
          merchant: recordSeeds.recordSeeds[i].merchant,
          userId
         })
      ))      
    })
    .then(() => {
      console.log('seeder done')
      process.exit()
    })
    .catch(error => console.log(error))
})


// Record.create(recordSeeds)
//   .then(() => {
//     console.log('Record Done')
//     return db.close()
//   })
//   .then(() => {
//     console.log('database connection close')
//   })