const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const md5 = require('md5')
const fs = require('fs')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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
  { id: 1,
    folderId: 1,
    timestamp: '03142017',
    numOfClicks: 3,
    shortenedUrl: 'google1',
    url: 'http://www.google.com',
  },
  { id: 2,
    folderId: 2,
    timestamp: '03152017',
    numOfClicks: 1,
    shortenedUrl: 'amazon2',
    url: 'http://www.amazon.com',
  }
]

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
  .then((folders) => {
    response.status(200).json(folders)
  })
  .catch((error) => {
    console.error('something is wrong with the database')
  })
})

app.post('/api/v1/folders', (request, response) => {
  const { name } = request.body
  const id = md5(name)

  app.locals.folders.push({ id, name })
  response.json(app.locals.folders)
})

app.get('/api/v1/urls', (request, response) => {
  database('url').select()
  .then((urls) => {
    response.status(200).json(urls)
  })
  .catch((error) => {
    console.error('something is wrong with the database')
  })
})

app.post('/api/v1/urls', (request, response) => {
  const { folderId, url } = request.body
  const id = md5(url)
  const timestamp = Date.now()
  const numOfClicks = 0
  const shortenedUrl = `${url.split('.')[1]}${app.locals.urls.length}`;

  app.locals.urls.push({ folderId, timestamp, numOfClicks, shortenedUrl, url, id })
  response.json(app.locals.urls)
})

app.patch('/api/v1/urls/:id', (request, response) => {
  const { id } = request.params
  const { numOfClicks } = request.body
  const selectedUrl = app.locals.urls.find(obj => obj.id == id)
  selectedUrl.numOfClicks = numOfClicks

  if (!selectedUrl) {return response.sendStatus(404)}
  response.json(app.locals.urls)
})

app.get('/:shortUrl', (request, response) => {
  const { shortUrl } = request.params
  database('urls').where('shortenedUrl', request.params.shortUrl).select()
  .then((urls) => {
    response.status(200).json(urls)
  })
  .catch((error) => {
    console.error('something is wrong with the database')
  })
})


// 
//   let redirectedObj = app.locals.urls.find(obj => {
//     return obj.shortenedUrl === shortUrl
//   })
//   const url = redirectedObj.url
//   redirectedObj.numOfClicks++
//   console.log(app.locals.urls)
//   response.redirect(url)
// })

app.listen(app.get('port'), () => {
  console.log(`Running on ${app.get('port')}`)
})
