import { createListPosts } from './data.js';
const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = createListPosts();

const renderThumbnails = () => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture, index) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = picture.url;
    thumbnail.querySelector('.picture__likes').textContent = picture.likes;
    thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
    thumbnail.dataset.index = index;
    fragment.appendChild(thumbnail);
  });
  container.append(fragment);
};

export { renderThumbnails, pictures };

