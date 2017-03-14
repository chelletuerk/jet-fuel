const $folderContainer = $('.folder-container');

const folderArray = [];

$('.folder-input').focus();

$('.folder-submit').on('click', () => {
  let $folderInput = $('.folder-input').val();
  addFolderToList($folderInput);
  $('.folder-input').val('');
})

const addFolderToList = (folder) => {
  folderArray.push(folder);
  console.log(folderArray);
  $('.folder-container').append(`<button class="folder-button">${folder}</button>`);
}

$('.folder-container').on('click', '.folder-button', () => {
  $('.url-section').children().length === 0 ? createUrlSection() : null;
})

const createUrlSection = () => {
  $('.url-section').prepend(`<h2>URL's</h2>
  <input type="text-input" placeholder="URL Name" class="input"></input>
  <button class="url-button button" type="button">Add URL</button>`)
}

// <div class="url-container"></div>`
