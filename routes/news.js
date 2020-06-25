var express = require('express')
var router = express.Router()
const News = require('../models/news')

router.get('/', function (req, res, next) {
   let search = req.query.search || ''
   search = search.trim() // ta funkcja usunie zbędne spacje z początku i końca stringa (ang. trim - przystrzyc)
   const regularExpressedSearch = new RegExp(search, 'i') // funkcja RegExp() z drugim parametrem 'i' sprawia, że można wyszukac również urywki wyszukiwanej frazy
   const findNews = News
      .find({
         title: regularExpressedSearch
      })
      .sort({ // sortuje malejąco (-1) na podstawie wartości created 
         created: -1
      })
   findNews.exec((err, data) => {
      res.render('news', {
         title: 'Aktualności',
         data,
         search
      })
   })
})

module.exports = router