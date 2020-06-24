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
   // const newsData = new News({
   //    title: 'Tytuł testowy',
   //    description: 'Opis testowy'
   // })
   // newsData.save((err) => {
   //    if (err) {
   //       console.log(err)
   //    } else {
   //       console.log('Połączono z kolekcją News')
   //    }
   // })
   res.render('admin/index', {
      title: 'Admin'
   })
})

router.get('/news/add', (req, res) => {
   res.render('admin/news-form', {
      title: 'Dodaj news'
   })
})

router.post('/news/add', (req, res) => {
   const {
      newsTitle,
      newsDescription
   } = req.body
   console.log(newsTitle)
   console.log(newsDescription)
   res.redirect('/admin/news/add')
})

module.exports = router