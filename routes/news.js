var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
   res.render('news', {
      title: 'Aktualności'
   });
})

module.exports = router