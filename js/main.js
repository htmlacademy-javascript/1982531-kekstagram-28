module4-task1
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const QUANTITY_OF_POSTS = 25;
const DESCRIPTIONS = [
  'Счастье – это путь, а не судьба.',
  'Время перемен',
  'Мы должны ценить каждый момент.',
  'Следуй за своей мечтой.',
  'Ешь, молись, плыви!',
  'Делай, что должен, и будь, что будет.',
  'Как мало нужно для счастье.'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Stas',
  'Roma',
  'Masha',
  'Vlad',
  'Natasha',
  'Sveta',
  'Alina'
];

const getRandomPositiveInterger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const creatRandomArrayElement = (elements) =>
  elements[getRandomPositiveInterger(0, elements.length - 1)];


const createMessage = () =>
  Array.from({length: getRandomPositiveInterger(1, 2)}, () => creatRandomArrayElement(MESSAGES)).join(' ');

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomPositiveInterger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
  message: createMessage(),
  name: creatRandomArrayElement(NAMES)
});

const createPost = (index) => ({
  id: index,
  url: `photo/${index}.jpg`,
  description: creatRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInterger(MIN_LIKES, MAX_LIKES),
  comments: createComment()
});

const postsArray = () => Array.from({length: QUANTITY_OF_POSTS}, (_, index) => createPost(index + 1));
postsArray();



 master
