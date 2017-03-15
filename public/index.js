const $folderContainer = $('.folder-container');

const folderArray = [];
let clickedFolder;

$('document').ready( () => loadInitialFolders())
$('.folder-input').focus();

$('.folder-submit').on('click', () => {
  let $folderName = $('.folder-input').val();
  addFolderToList($folderName);
  $('.folder-input').val('');
})

$('.folder-container').on('click', '.folder-button', (e) => {
  clickedFolder = e.target.id;
  $('.url-container').children().remove()
  loadInitialUrls(clickedFolder)
})

$('.url-button').on('click', () => {
  let url = $('.url-input').val();
  postUrl(url)
  $('.url-input').val('');
})

const loadInitialFolders = () => {
  fetch(`http://localhost:3000/api/v1/folders`, {
    method: 'GET',
  })
  .then(response => response.json()).then(data => {
    renderFolders(data)
  })
  .catch(err => console.log('error', err))
}

//need to figure out how to just load the URLs that pertain to the clickedFolder
const loadInitialUrls = (clickedFolder) => {
  fetch(`http://localhost:3000/api/v1/urls`, {
    method: 'GET',
  })
  .then(response => response.json()).then(data => {
    renderUrls(data, clickedFolder)
  })
  .catch(err => console.log('error', err))
}

const addFolderToList = (name) => {
  console.log('name', name)
  fetch(`http://localhost:3000/api/v1/folders`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name })
  })
  .then(response => response.json()).then(data => {
    renderFolders([data[data.length-1]])
  })
  .catch(err => console.log('error', err))
}

const postUrl = (url) => {
  fetch(`http://localhost:3000/api/v1/urls`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ folderId: clickedFolder, url })
  })
  .then(response => response.json()).then(data => {
    renderUrls([data[data.length-1]])
  })
  .catch(err => console.log('error', err))
}

const renderFolders = (data) => {
  data.map(obj => {
    $('.folder-container').append(`<button class="folder-button" id=${obj.id}>${obj.name}</button>`)
  })
}

const renderUrls = (data, clickedFolder) => {
  if (clickedFolder) {
    data = data.filter(obj => obj.folderId == clickedFolder)
  }
  console.log(data)
  data.map(obj => {
    $('.url-container').append(`<button class="shortenUrlBtn">${obj.shortenedUrl}</button>`)
  })
}
