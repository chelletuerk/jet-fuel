const $folderContainer = $('.folder-container');

const folderArray = [];
let clickedFolder;

$('document').ready( () => loadInitialFolders())
$('.folder-input').focus();

$('.folder-submit').on('click', () => {
  const $folderName = $('.folder-input').val();
  addFolderToList($folderName);
  $('.folder-input').val('');
})

$('.folder-container').on('click', '.folder-button', (e) => {
  clickedFolder = e.target.id;
  $('.url-container').children().remove()
  loadInitialUrls(clickedFolder)
})

$('.url-button').on('click', () => {
  const url = $('.url-input').val();
  const isValid = validateUrl(url);
  if (!isValid) {
    alert("Your URL isn't valid. Try something like \n http://www.ebaumsworld.com/");
    return;
  }
  postUrl(url)
  $('.url-input').val('');
})

const validateUrl = (url) => {
  const urlRegex = /^(http|https)?:\/\/[w]{2,4}[a-zA-Z0-9-\.]+\.[a-z]{1,10}/
  return urlRegex.test(url);
}

const loadInitialFolders = () => {
  fetch(`/api/v1/folders`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    renderFolders(data)
  })
  .catch(err => err)
}

const loadInitialUrls = (clickedFolder) => {
  fetch(`/api/v1/urls`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    renderUrls(data, clickedFolder)
  })
  .catch(err => console.log('error', err))
}

const addFolderToList = (name) => {
  console.log('name', name)
  fetch(`/api/v1/folders`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name })
  })
  .then(response => response.json()).then(data => {
    renderFolders([data[data.length-1]])
  })
  .catch(err => 'err')
}

const postUrl = (url) => {
  fetch(`/api/v1/urls`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ folderId: clickedFolder, url })
  })
  .then(response => response.json()).then(data => {
    renderUrls([data[data.length-1]])
  })
  .catch(err => 'err')
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
  data.map(obj => {
    $('.url-container').append(`<a href=${obj.url} id=${obj.id} numOfClicks=${obj.numOfClicks} class="shortenUrlBtn" target="_blank">${obj.shortenedUrl}</a><br/>
    <p>${obj.timestamp}</p><p>${obj.numOfClicks}</p><p>${obj.url}</p>`)
  })
}

$('.url-container').on('click', '.shortenUrlBtn', (e) => {
  const id = e.target.id
  const numOfClicks = e.target.numOfClicks++
  fetch(`/api/v1/urls/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ numOfClicks })
  })
  .then(response => response.json()).then(data => {
    console.log(data);
  })
  .catch(err => 'err')
})
