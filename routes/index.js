const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Logowanie'
  })
})

router.post('/login', (req, res) => {
  const {
    login,
    password
  } = req.body

  if (login === 'admin' && password === '123') {
    req.session.isLogged = true
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
})

module.exports = router;