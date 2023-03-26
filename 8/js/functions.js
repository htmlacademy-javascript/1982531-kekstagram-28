// фукция проверки длины строки
const isLessOrEqual = (string, maxLength) => (string.length <= maxLength);
// вызов функции
isLessOrEqual('проверяемая строка', 20);
isLessOrEqual('проверяемая строка', 18);
isLessOrEqual('проверяемая строка', 10);

// функция для проверки строки на палиндром
const isPalindrom = (string) => {
  let reverseString = '';
  const lowerString = string.toLowerCase();
  const removeSpaceString = lowerString.replaceAll(' ', '');
  for(let i = removeSpaceString.length - 1; i >= 0; i--) {
    reverseString += removeSpaceString[i];
  }
  return removeSpaceString === reverseString;
};

// вызов функции
isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');

// функция для извлечения цифр и возвращения чисел
const getNumber = (string) => {
  if(typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if(!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return (parseInt(result, 10));
};

// вызов функции
getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');

// функция, которая возвращает исходную строку, дополненную указанными символами до заданной длины
const getNewString = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  const tempPad = pad.slice(0, actualPad % pad.length);
  const tempRepeat = pad.repeat(actualPad / pad.length);
  return tempPad + tempRepeat + string;
};

// вызов функции
getNewString('1', 2, '0');
getNewString('1', 4, '0');
getNewString('q', 4, 'werty');
getNewString('q', 4, 'we');
getNewString('qwerty', 4, '0');

