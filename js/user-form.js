import { isEscapeKey } from './util.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_QUANTITY_HASHTAGS = 5;
const TAG_ERROR_MESSAGE = 'Неправильно заполнены хэш-теги';
const SUBMIT_BUTTON_MESSAGE = {
  idle: 'Опубликовать',
  sending: 'Опубликовываю...'
};

const form = document.querySelector('.img-upload__form');
const page = document.querySelector('body');
const overlay = document.querySelector('.img-upload__overlay');
const buttonCancel = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const openModal = () => {
  overlay.classList.remove('hidden');
  page.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  page.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentsField;


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}


const onCancelButtonClick = () => {
  buttonCancel.addEventListener('click', closeModal);
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidQuantity = (tags) => tags.length <= MAX_QUANTITY_HASHTAGS;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidQuantity(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};


pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_MESSAGE
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SUBMIT_BUTTON_MESSAGE.sending;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SUBMIT_BUTTON_MESSAGE.idle;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const setOnFormSubmit = (cb) => {
  checkForm();
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

function checkForm() {
  fileField.addEventListener('change', openModal);
  onCancelButtonClick();
  form.addEventListener('submit', onFormSubmit);
}

export { checkForm, setOnFormSubmit };

