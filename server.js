const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.locals.folders = [
  { 'folder1': [{
    submitDate: '03142017',
    numOfClicks: '3',
    shortenedUrl: 'http://www.g.com',
    url: 'http://www.google.com'
    }]
  },
  { 'folder2': [{
    submitDate: '03152017',
    numOfClicks: '1',
    shortenedUrl: 'http://www.a.com',
    url: 'http://www.amazon.com'
    }]
  }
]

app.get('/api/v1/folders', (request, response) => {
  response.send(app.locals.folders)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})
