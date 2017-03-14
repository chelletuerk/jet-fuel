const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const md5 = require('md5')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
    numOfClicks: '3',
    shortenedUrl: 'http://www.g.com',
    url: 'http://www.google.com'
  },
  { folderId: 2,
    submitDate: '03152017',
    numOfClicks: '1',
    shortenedUrl: 'http://www.a.com',
    url: 'http://www.amazon.com'
  }
]

app.get('/api/v1/folders', (request, response) => {
  response.send(app.locals.folders)
})

app.post('/api/v1/folders', (request, response) => {
  const { folder } = request.body

  app.locals.folders.push({folder: []})
  response.json(app.locals.folders)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})
