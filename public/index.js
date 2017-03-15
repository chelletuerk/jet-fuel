const $folderContainer = $('.folder-container');

const folderArray = [];

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
    renderFolders(data)
  })
  .catch(err => console.log('error', err))
}

const renderFolders = (data) => {
  console.log(data)
  data.map(obj => {
    $('.folder-container').append(`<button class="folder-button">${obj.name}</button>`)
  })
  // $('.folder-container').append(`<button class="folder-button">${folder}</button>`);

}

$('.folder-container').on('click', '.folder-button', () => {
  $('.url-section').children().remove();
  createUrlSection();
})

const createUrlSection = () => {
  $('.url-section').prepend(`<h2>URL's</h2>
  <input type="text-input" placeholder="URL Name" class="url-input input"></input>
  <button class="url-button button" type="button">Add URL</button>
  <div class="url-container"></div>`)
}

$('.url-section').on('click', '.url-button', () => {
  let container = $('.url-button').siblings('.url-container');
  let input = $('.url-button').siblings('.url-input').val();
  container.append(`<div>${input}</div>`);
  $('.url-button').siblings('.url-input').val('');
})
