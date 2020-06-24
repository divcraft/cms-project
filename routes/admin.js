const express = require('express')
const News = require('../models/news')
const {
   isValidObjectId
} = require('mongoose')

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

router.get('/', (req, res) => {
   News.find({}, (err, data) => {
      res.render('admin/index', {
         title: 'Admin',
         data
      });
   })
})

router.get('/add-news', (req, res) => {
   res.render('admin/news-form', {
      title: 'Dodaj news'
   })
})

router.post('/add-news', (req, res) => {
   const {
      newsTitle,
      newsDescription
   } = req.body

   const newsData = new News({
      title: newsTitle,
      description: newsDescription
   })
   const errors = newsData.validateSync()

   newsData.save((err) => {
      if (err) {
         console.log('Nie można dodać artykułu, wystąpił błąd')
         res.render('admin/news-form', {
            title: 'Dodaj news',
            errors
         })
      } else {
         console.log(`Dodano artykuł o tytule '${newsTitle}'`)
         res.redirect('/news')
      }
   })
})

router.get('/remove-news/:id', (req, res) => {
   const {
      id
   } = req.params
   News.findByIdAndDelete(id, (err) => {
      console.log('Usunięto artykuł o ID:', id)
      res.redirect('/admin')
   })
})

module.exports = router