const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
module.exports.connect = async () => {
  mongod = new MongoMemoryServer()
  const uri = await mongod.getUri()

  // const mongooseOpts = {
  //   useNewUrlParser: true,
  //   autoReconnect: true,
  //   reconnectTries: Number.MAX_VALUE,
  //   reconnectInterval: 1000,
  // }

  await mongoose.connect(uri, { useNewUrlParser: true })
  mongoose.set('debug', true)
}

module.exports.closeDB = async () => {
  // mongod = new MongoMemoryServer()
  await mongoose.connection.dropDatabase()
  // await mongoose.disconnect()
  await mongoose.connection.close()
  await mongod.stop()
}

module.exports.clearDB = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
