import { getGroupNumber, renderElement } from '../../../controllers/helpers';
import {
  templateAudiocall,
  templateAudiocallListening,
  templateAudiocallWindow,
  templateResults,
} from './template';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { getGroupPage } from '../../../controllers/api-services/storage';
import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';
import { randomizerWord } from '../game-common/game-common';
import {
  addUsersRightWordFromAudiocall, addUsersWrongWordFromAudiocall,
} from '../../../controllers/api-services/games';
import { templateGameResults } from '../game-common/game-templates';

const groupNumber: number = getGroupNumber();

let pageWords: Words;
let pageWordsSet: Set<Word>;
let rightAnswer: Word;
let allGroupWords: Words;

const rightWords: Words = [];
const wrongWords: Words = [];

const randomizerWords = (array: Words, answer: Word) => {
  const wordsSet: Set<Word> = new Set([answer]);

  while (wordsSet.size < 5) {
    wordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  const result: Words = Array.from(wordsSet).slice(1);
  result.splice(Math.floor(Math.random() * (result.length + 1)), 0, answer);
  return result;
};

const playAudio: (word: Word) => void = (word: Word) => {
  const audio: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
  audio.autoplay = true;
};

const startRound = () => {
  const audiocall: HTMLButtonElement = document.querySelector('.audiocall');
  rightAnswer = randomizerWord(pageWordsSet);

  const audiocallWords: Words = randomizerWords(pageWords, rightAnswer);

  audiocall.innerHTML = templateAudiocallListening(audiocallWords);
  playAudio(rightAnswer);
};

const formPageWords: (array: Words) => void = (array: Words) => {
  pageWords = array;
  pageWordsSet = new Set(array);
};

const startAudiocall = (group: number, page: number) => {
  getWords({
    group,
    page,
  }).then((words: Words) => {
    formPageWords(words);
    startRound();
  });
};

const getGroupWords: (group: number) => Promise<Words> = (group: number) => {
  const promiseArray: Promise<Words>[] = Array(30)
    .fill(null)
    .map((item, page: number) => getWords({ group, page }));

  return Promise.all(promiseArray).then((wordsArray: Words[]) => {
    const array: Words = wordsArray.flat();
    allGroupWords = array;
    const wordsSet: Set<Word> = new Set();

    while (wordsSet.size < 20) {
      wordsSet.add(array[Math.floor(Math.random() * array.length)]);
    }

    return Array.from(wordsSet);
  });
};

const randomizerArrayOfWords: (array: Words) => Words = (array: Words) => {
  const randomWordsSet: Set<Word> = new Set();

  while (randomWordsSet.size < 20) {
    randomWordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  return Array.from(randomWordsSet);
};

const renderGameResultsScreen: () => void = () => {
  const audiocallGameContent: HTMLElement = document.querySelector('.audiocall-game__content');
  const buttonContinue: HTMLElement = document.querySelector('.button-continue');
  const audiocallGameWrapper: HTMLElement = document.querySelector('.audiocall-game__wrapper');

  if (!pageWordsSet.size) {
    buttonContinue.remove();
    renderElement('button', 'Результаты', audiocallGameContent, ['button', 'audiocall-content__button', 'button-results']);

    const buttonResults: HTMLElement = document.querySelector('.button-results');

    buttonResults.addEventListener('click', () => {
      const audiocallGame: HTMLElement = document.querySelector('.audiocall-game');
      audiocallGameWrapper.innerHTML = templateGameResults(rightWords, wrongWords);

      const statisticRight: HTMLElement = document.querySelector('.statistic-right');
      const statisticWrong: HTMLElement = document.querySelector('.statistic-wrong');

      audiocallGame.classList.add('results');

      if (!rightWords.length) {
        statisticRight?.remove();
      }

      if (!wrongWords.length) {
        statisticWrong?.remove();
      }
    });
  }
};

const changeButtonContinue: () => void = () => {
  const audiocallGameContent: HTMLElement = document.querySelector('.audiocall-game__content');
  const buttonDontKnow: HTMLElement = document.querySelector('.button-dont-know');

  buttonDontKnow.remove();
  renderElement('button', 'Продолжить', audiocallGameContent, ['button', 'audiocall-content__button', 'button-continue']);
  renderGameResultsScreen();
};

const addEventListeners: () => void = () => {
  // переход из ссылки хэдера Аудиовызов
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-window__button[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    getGroupWords(+eventTargetClosest.dataset.group)
      .then((words: Words) => {
        formPageWords(words);
        startRound();
      });
  });
  // проигрывание аудио
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-audio');

    if (!eventTargetClosest) {
      return;
    }

    playAudio(rightAnswer);
  });
  // выбор варианта ответа
  document.addEventListener('click', (event: MouseEvent) => {
    const audiocallGameContainer: HTMLElement = document.querySelector('.audiocall-game__container');
    const audiocallContentItems: HTMLElement = document.querySelector('.audiocall-content__items');

    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-id]');
    const eventTargetRight: HTMLElement = document.querySelector(`[data-id="${rightAnswer?.id}"]`);

    if (!eventTargetClosest || eventTargetClosest.parentElement.classList.contains('no-events')) {
      return;
    }

    if (eventTargetClosest.dataset.id === rightAnswer.id) {
      rightWords.push(rightAnswer);

      if (localStorage.getItem('token')) {
        addUsersRightWordFromAudiocall(rightAnswer.id);
      }
    }

    if (eventTargetClosest.dataset.id === 'button-dont-know') {
      wrongWords.push(rightAnswer);

      if (localStorage.getItem('token')) {
        addUsersWrongWordFromAudiocall(rightAnswer.id);
      }
    }

    if (eventTargetClosest.dataset.id !== rightAnswer.id && eventTargetClosest.dataset.id !== 'button-dont-know') {
      eventTargetClosest.classList.add('wrong');
      wrongWords.push(rightAnswer);

      if (localStorage.getItem('token')) {
        addUsersWrongWordFromAudiocall(rightAnswer.id);
      }
    }

    audiocallGameContainer.innerHTML = templateResults(rightAnswer);
    eventTargetRight.classList.add('right');
    audiocallContentItems.classList.add('no-events');

    changeButtonContinue();
  });
  // нажатие на кнопку Продолжить
  document.addEventListener('click', (event: MouseEvent) => {
    const audiocallGameContainer: HTMLElement = document.querySelector('.audiocall-game__container');
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-continue');

    if (!eventTargetClosest) {
      return;
    }

    audiocallGameContainer.innerHTML = '';
    startRound();
  });
  // начало игры по кнопке Начать
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-game');

    if (!eventTargetClosest) {
      return;
    }

    startAudiocall(groupNumber, getGroupPage(groupNumber));
  });
  // начало игры по кнопке Еще раз(страница результатов)
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-results__button_play-game');

    if (!eventTargetClosest) {
      return;
    }

    rightWords.length = 0;
    wrongWords.length = 0;

    if (Number.isInteger(getGroupNumber())) {
      startAudiocall(groupNumber, getGroupPage(groupNumber));
    } else {
      formPageWords(randomizerArrayOfWords(allGroupWords));
      startRound();
    }
  });
  // включение аудио на странице результатов игры
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.statistic-item__button');
    const wordAudio: HTMLAudioElement = eventTargetClosest
      ?.previousElementSibling as HTMLAudioElement;

    if (!eventTargetClosest) {
      return;
    }

    wordAudio.play();
  });
};

const addKeyboardEventListeners: () => void = () => {
  document.addEventListener('keyup', (event: KeyboardEvent) => {
    let userAnswerSelect: HTMLElement;

    if (event.code === 'Space') {
      userAnswerSelect = document.querySelector('.audiocall-content__button');
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      userAnswerSelect = document.querySelector('.button-play-audio');
    } else {
      userAnswerSelect = document.querySelector(`[data-number="${event.key}"]`);
    }

    if (!userAnswerSelect) {
      return;
    }

    userAnswerSelect.click();
  });
};

const addAudiocallWindow: () => void = () => {
  const audiocallWindow: HTMLElement = document.querySelector('.game-window');

  renderElement('div', templateAudiocallWindow, audiocallWindow, ['game-window__wrapper', `${Number.isInteger(getGroupNumber()) ? 'active' : ''}`]);
  addEventListeners();
  addKeyboardEventListeners();
};

const addAudiocall: () => void = () => {
  renderElement('main', templateAudiocall, document.body, ['audiocall', 'color-audiocall']);
  addAudiocallWindow();
};

export { addAudiocall };
