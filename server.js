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
    console.error('error getting folders:', error)
  })
})

app.post('/api/v1/folders', (request, response) => {
  const { name } = request.body
  const folder = { name };
  database('folders').insert(folder)
  .then(function() {
    database('folders').select()
            .then(function(folders) {
              response.status(200).json(folders);
            })
            .catch(function(error) {
              console.error('error posting folders:', error)
            });
  })
})

app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
  .then((urls) => {
    response.status(200).json(urls)
  })
  .catch((error) => {
    console.error('error getting URLs:', error)
  })
})

app.post('/api/v1/urls', (request, response) => {
  const { folderId, url } = request.body
  const id = md5(url)
  const timestamp = Date.now();
  const numOfClicks = 0
  const shortenedUrl = id.slice(0,5);
  const urlObj = { folderId, numOfClicks, shortenedUrl, url, id, timestamp }

  database('urls').insert(urlObj)
  .then(function() {
    database('urls').select()
      .then(function(urls) {
        response.status(200).json(urls);
      })
      .catch(function(error) {
        console.error('error posting URLs:', error)
      });
  })
})

app.get('/:shortUrl', (request, response) => {
  const { shortUrl } = request.params;
  let longUrl;
  let newCount;

  database('urls').where('shortenedUrl', shortUrl).select()
  .then((urlArray) => {
    longUrl = (urlArray[0].url)
    newCount = (urlArray[0].numOfClicks) + 1
  })
  .then(() => {
    database('urls').where('shortenedUrl', shortUrl).update({ numOfClicks: newCount })
    .then(() => {
      response.status(302).redirect(`${longUrl}`);
    })
  })
  .catch((error) => {
    console.error('error getting short URL:', error)
  })
})

app.put('/:shortUrl', (request, response) => {
  const { shortUrl } = request.params;
  let newCount;

  database('urls').where('shortenedUrl', shortUrl).select().then((urlArray) => {
    console.log('urlArray:',urlArray)
    newCount = (urlArray[0].numOfClicks) + 1
  })
  .then(() => {
    database('urls').where('shortenedUrl', shortUrl).update({ numOfClicks: newCount })
    .then((urls) => {
      response.status(200).json(urls);
    })
  })
  .catch((error) => {
    console.error('error getting short URL:', error)
  })
})

app.listen(app.get('port'), () => {
  console.log(`Running on ${app.get('port')}`)
})

module.exports = app;
