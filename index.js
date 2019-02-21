const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const ageMiddleware = (req, res, next) => {
  if (req.body.age) {
    return next()
  }
  return res.render('age')
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', ageMiddleware, (req, res) => {
  if (req.body.age >= 18) {
    return res.render('major', { age: req.body.age })
  } else {
    return res.render('minor', { age: req.body.age })
  }
})

app.listen(3000)
