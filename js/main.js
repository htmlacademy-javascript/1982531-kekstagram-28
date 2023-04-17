import { createListPosts } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { renderFullPhoto } from './full-photo.js';
import { checkForm, setOnFormSubmit } from './user-form.js';

renderThumbnails();
createListPosts();
renderFullPhoto();
checkForm();
setOnFormSubmit();
