const express = require('express')
const News = require('../models/news')

const router = express.Router()

router.all('*', (req, res, next) => {
   const {
      isLogged
   } = req.session

   if (!isLogged) {
      return res.redirect('/login')
   }
   next()
})

router.get('/', (req, res, next) => {
   const newsData = new News({
      title: 'Tytuł testowy',
      description: 'Opis testowy'
   })

   newsData.save((err) => {
      if (err) {
         console.log(err)
      } else {
         console.log('Połączono z kolekcją News')
      }
   })

   res.render('admin', {
      title: 'Admin'
   })
})

module.exports = router