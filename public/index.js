const $folderContainer = $('.folder-container');

const folderArray = [];
let clickedFolder;

$('document').ready( () => loadInitialFolders())

const loadInitialFolders = () => {
  fetch(`http://localhost:3000/api/v1/folders`, {
    method: 'GET',
  })
  .then(response => response.json()).then(data => {
    renderFolders(data)
  })
  .catch(err => console.log('error', err))
}

$('.folder-input').focus();

$('.folder-submit').on('click', () => {
  let $folderName = $('.folder-input').val();
  addFolderToList($folderName);
  $('.folder-input').val('');
})

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

const renderFolders = (data) => {
  data.map(obj => {
    $('.folder-container').append(`<button class="folder-button" id=${obj.id}>${obj.name}</button>`)
  })
}

$('.folder-button').on('click', (e) => {
  clickedFolder = e.target.id;
})

$('.url-button').on('click', () => {
  let url = $('.url-input').val();
  postUrl(url)
  $('.url-input').val('');
})

const postUrl = (url) => {
  fetch(`http://localhost:3000/api/v1/urls`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ folderId: clickedFolder, url })
  })
  .then(response => response.json()).then(data => {
    renderUrls(data)
  })
  .catch(err => console.log('error', err))
}

const renderUrls = (data) => {
  data.map(obj => {
    $('.url-container').append(`<button class="shortenUrlBtn">${obj.shortenedUrl}</button>`)
  })
}
