const $folderContainer = $('.folder-container');

$('.folder-submit').on('click', () => {
  let folderInput = $('.folder-input').val();
  addFolderToList(folderInput);
})

const addFolderToList = (folder) => {
  $('.folder-container').append(`<div>${folder}</div>`);
}
