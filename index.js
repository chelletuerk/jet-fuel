const folderArray = [];
const $folderContainer = $('.folder-container');

$('.folder-submit').on('click', () => {
  let $folderInput = $('.folder-input').val();
  addFolderToList($folderInput);
  $('.folder-input').val('');
  createFolder();
})

const addFolderToList = (folder) => {
  $('.folder-container').append(`<div>${folder}</div>`);
}

createFolder = (folder) => {
  $('.url-section').prepend(`<h2>URL's</h2>
  <input type="text-input" placeholder="URL Name" class="input"></input>
  <button class="url-button button" type="button">Add URL</button>
  <div class="url-container"></div>`)
}
