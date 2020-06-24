const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
   title: {
      type: String,
      required: [true, `Pole 'Tytuł' jest wymagane`]
   },
   description: {
      type: String,
      required: [true, `Pole 'Opis' jest wymagane`]
   },
   date: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('News', newSchema)