const express = require('express')
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
   res.render('admin', {
      title: 'Admin'
   })
})

module.exports = router