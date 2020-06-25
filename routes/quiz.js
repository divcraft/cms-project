const express = require('express')
const Quiz = require('../models/quiz')

const router = express.Router()

router.get('/', (req, res) => {
   const {
      hasVoted
   } = req.session
   Quiz.find({}, (err, data) => {
      console.log(data)
      res.render('quiz', {
         title: 'Quiz',
         data,
         hasVoted
      })
   })

})

router.post('/', (req, res) => {
   const {
      quiz
   } = req.body
   Quiz.findById(quiz, (err, data) => {
      data.vote++
      data.save((err) => {
         req.session.hasVoted = true
         res.redirect('/quiz')
      })
   })
})

module.exports = router