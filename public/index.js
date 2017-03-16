const $folderContainer = $('.folder-container');

const folderArray = [];
let clickedFolder;
let currentUrls;

$('document').ready( () => loadInitialFolders())
$('.url-section').children().attr('disabled', true);
$('.folder-input').focus();

$('.folder-input').on('input', (e) => {
  e.target.value.length > 0 ? $('.folder-submit').prop('disabled', false) : $('.folder-submit').prop('disabled', true);
})

$('.folder-submit').on('click', () => {
  const $folderName = $('.folder-input').val();
  addFolderToList($folderName);
  $('.folder-input').val('');
})

$('.folder-container').on('click', '.folder-button', (e) => {
  clickedFolder = e.target.id;
  styleFolderOnClick(e)
  $('.url-section').children().attr('disabled', false);
  $('.url-container').children().remove()
  loadInitialUrls(clickedFolder)
})

const styleFolderOnClick = (e) => {
  $(e.target).siblings().removeAttr('style');
  $(e.target).css('background-color', '#ff8811');
}

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

$('.sort-date').on('click', () => {
  currentUrls.sort((a,b) => {
    return a.timestamp > b.timestamp ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
  })
  $('.url-container').children().remove()
  renderUrls(currentUrls)
})

$('.sort-clicks').on('click', () => {
  currentUrls.sort((a,b) => {
    return a.numOfClicks - b.numOfClicks;
  })
  $('.url-container').children().remove()
  renderUrls(currentUrls)
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

const loadInitialUrls = () => {
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
    $('.folder-container').append(`
      <button class="folder-button" id=${obj.id}>${obj.name}
      </button>
      `)
  })
}

const renderUrls = (data, clickedFolder) => {
  if (clickedFolder) {
    data = data.filter(obj => obj.folderId == clickedFolder)
    currentUrls = data
  }
  data.map(obj => {
    $('.url-container').append(`
      <div class="url-wrapper">
        <a id=${obj.id} href=${obj.url} class="shortenUrlBtn">${obj.shortenedUrl}
        </a>
        <br/>
        <p class="url-timestamp">${obj.timestamp}</p>
        <p>${obj.numOfClicks}</p>
        <p>${obj.url}</p>
      </div>
      `)
  })
}

$('.url-container').on('click', '.shortenUrlBtn', (e) => {
  const shortUrl = e.target.innerHTML
  fetch(`/${shortUrl}`, {
    mode: 'no-cors',
    method: 'GET',
  })
  .then(response => response.json()).then(data => {
    $(location).prop(data);
  })
  .catch(err => 'err')
})
