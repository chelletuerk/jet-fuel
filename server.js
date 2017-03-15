const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const md5 = require('md5')
const fs = require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.locals.folders = [
  { id: 1,
    name: 'fruit'
  },
  { id: 2,
    name: 'penguins',
  }
]

app.locals.urls = [
  { folderId: 1,
    submitDate: '03142017',
    numOfClicks: 3,
    shortenedUrl: 'http://www.g.com',
    url: 'http://www.google.com',
  },
  { folderId: 2,
    submitDate: '03152017',
    numOfClicks: 1,
    shortenedUrl: 'http://www.a.com',
    url: 'http://www.amazon.com',
  }
]

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/v1/folders', (request, response) => {
  response.send(app.locals.folders)
})

app.post('/api/v1/folders', (request, response) => {
  const { name } = request.body
  const id = md5(name)

  app.locals.folders.push({ id, name })
  response.json(app.locals.folders)
})

app.get('/api/v1/urls', (request, response) => {
  response.send(app.locals.urls)
})

app.post('/api/v1/urls', (request, response) => {
  const { folderId, url } = request.body
  const submitDate = Date.now()
  const numOfClicks = 0
  const shortenedUrl = `${url.split('.')[1]}${app.locals.urls.length}`;

  app.locals.urls.push({ folderId, submitDate, numOfClicks, shortenedUrl, url })
  response.json(app.locals.urls)
})

app.listen(app.get('port'), () => {
  console.log(`Running on ${app.get('port')}`)
})
