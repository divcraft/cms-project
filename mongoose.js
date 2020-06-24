const database = () => {
   const mongosee = require('mongoose')

   const password = 'admin1'
   const dbName = ''
   const uri = `mongodb+srv://tomasz:${password}@cms-project-svnpq.mongodb.net/${dbName}?retryWrites=true&w=majority`

   mongosee.connect(uri, {
      useNewUrlParser: true
   })

   const db = mongosee.connection
   db.on('error', console.error.bind(console, 'connection error'))
   db.once('open', () => {
      console.log('we\'re connected!')
   })
}

module.exports = database