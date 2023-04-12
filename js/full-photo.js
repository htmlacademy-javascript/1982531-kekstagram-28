import { pictures } from './thumbnails.js';
import { isEscapeKey } from './util.js';

const container = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const page = document.querySelector('body');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
let comments = [];

const createComment = ({avatar, message, name}) => {
  const commentForm = document.createElement('li');
  commentForm.innerHTML = `<img
  class="social__picture"
  src="${avatar}"
  alt="${name}"
  width="35" height="35">
<p class="social__text">${message}</p>`;
  commentForm.classList.add('social__comment');

  return commentForm;
};

const renderComments = (list) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < list.length; i++) {
    const listItem = createComment(list[i]);
    fragment.append(listItem);
  }

  socialComments.innerHTML = '';
  socialComments.append(fragment);
};

const closeModel = () => {
  bigPicture.classList.add('hidden');
  page.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModel();
  }
}

const openModel = () => {
  bigPicture.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  page.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

};


const onCancelButtonClick = () => {
  closeBigPictureButton.addEventListener('click', closeModel);
};

const renderFullPhoto = () => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('a');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    openModel();
    onCancelButtonClick();
    const i = evt.target.closest('a').dataset.index;

    bigPicture.querySelector('.big-picture__img img').src = pictures[i].url;
    bigPicture.querySelector('.comments-count').textContent = pictures[i].comments.length;
    bigPicture.querySelector('.likes-count').textContent = pictures[i].likes;
    bigPicture.querySelector('.social__caption').textContent = pictures[i].description;
    comments = pictures[i].comments;
    renderComments(comments);
  });
};

renderFullPhoto();
