import { getGroupNumber, renderElement } from '../../../controllers/helpers';
import {
  templateAudiocall,
  templateAudiocallListening,
  templateAudiocallWindow,
  templateResults, templateGameResults,
} from './template';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { getGroupPage } from '../vocabulary/storage';
import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';

const groupNumber: number = getGroupNumber();

let pageWords: Words;
let pageWordsSet: Set<Word>;
let rightAnswer: Word;

const rightWords: Words = [];
const wrongWords: Words = [];

const randomizerWord = (pageWordsSet: Set<Word>) => {
  const rightAnswer: Word = Array.from(pageWordsSet)[Math.floor(Math.random() * pageWordsSet.size)];

  pageWordsSet.delete(rightAnswer);

  return rightAnswer;
}

const randomizerWords = (array: Words, rightAnswer: Word) => {
  const wordsSet: Set<Word> = new Set([rightAnswer]);

  while (wordsSet.size < 5) {
    wordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  const result: Words = Array.from(wordsSet).slice(1);
  result.splice(Math.floor(Math.random() * result.length), 0, rightAnswer);

  return result;
}

const playAudio: (word: Word) => void = (word: Word) => {
  const audio: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
  audio.autoplay = true;
}

const startRound = () => {
  const audiocall: HTMLButtonElement = document.querySelector('.audiocall');
  rightAnswer = randomizerWord(pageWordsSet);

  const audiocallWords: Words = randomizerWords(pageWords, rightAnswer);

  audiocall.innerHTML = templateAudiocallListening(audiocallWords);
  playAudio(rightAnswer);
}

const startAudiocall = (group: number, page: number) => {
  getWords({
    group: group,
    page: page,
  }).then((words: Words) => {
    pageWords = words;
    pageWordsSet = new Set(words);

    startRound();
  });
}

const getGroupWords: (group: number) => Promise<Words> = (group: number) => {
  const promiseArray: Promise<Words>[] = Array(30)
    .fill(null)
    .map((item, page: number) => getWords({ group, page }));

  return Promise.all(promiseArray).then((wordsArray: Words[]) => {
    const array: Words = wordsArray.flat();
    const wordsSet: Set<Word> = new Set();

    while (wordsSet.size < 20) {
      wordsSet.add(array[Math.floor(Math.random() * array.length)]);
    }

    return Array.from(wordsSet);
  })
}

const renderButtonContinue: () => void = () => {
  const audiocallGameContent: HTMLElement = document.querySelector('.audiocall-game__content');
  const audiocallGameWrapper: HTMLElement = document.querySelector('.audiocall-game__wrapper');
  const buttonDontKnow: HTMLElement = document.querySelector('.button-dont-know');

  buttonDontKnow.remove();
  renderElement('button', 'Продолжить', audiocallGameContent, ['button', 'audiocall-content__button', 'button-continue']);

  const buttonContinue: HTMLElement = document.querySelector('.button-continue');

  if (pageWordsSet.size < 17) {
    buttonContinue.remove();
    renderElement('button', 'Результаты', audiocallGameContent, ['button', 'audiocall-content__button', 'button-results']);

    const buttonResults: HTMLElement = document.querySelector('.button-results');

    buttonResults.addEventListener('click', () => {
      audiocallGameWrapper.innerHTML = templateGameResults(rightWords, wrongWords);
    })
  }
}

const addEventListeners: () => void = () => {
  //переход из ссылки хэдера Аудиовызов
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-window__button[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    getGroupWords(+eventTargetClosest.dataset.group)
      .then((words: Words) => {
        pageWords = words;
        pageWordsSet = new Set(words);

        startRound();
      });
  })
// проигрывание аудио
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-audio');

    if (!eventTargetClosest) {
      return;
    }

    playAudio(rightAnswer);
  })
// выбор варианта ответа
  document.addEventListener('click', (event: MouseEvent) => {
    const audiocallGameContainer: HTMLElement = document.querySelector('.audiocall-game__container');

    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-id]');
    const eventTargetRight: HTMLElement = document.querySelector(`[data-id="${rightAnswer?.id}"]`);

    if (!eventTargetClosest) {
      return;
    }

    if (eventTargetClosest.dataset.id === rightAnswer.id) {
      rightWords.push(rightAnswer);
    }

    if (eventTargetClosest.dataset.id === 'button-dont-know') {
      wrongWords.push(rightAnswer);
    }

    if (eventTargetClosest.dataset.id !== rightAnswer.id && eventTargetClosest.dataset.id !== 'button-dont-know') {
      eventTargetClosest.classList.add('wrong');
      wrongWords.push(rightAnswer);
    }

    audiocallGameContainer.innerHTML = templateResults(rightAnswer);
    eventTargetRight.classList.add('right');

    renderButtonContinue();
  })
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

  })
// появление страницы результатов и статистики
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.statistic-item__button');
    const wordAudio: HTMLAudioElement = eventTargetClosest?.previousElementSibling as HTMLAudioElement;

    if (!eventTargetClosest) {
      return;
    }

    wordAudio.play();
  })
}

const beginAudiocall: () => void = () => {
  const buttonBegin: HTMLButtonElement = document.querySelector('.game-window__buttonBegin');

  buttonBegin.addEventListener('click', () => {
    startAudiocall(groupNumber, getGroupPage(groupNumber));

    console.log(rightAnswer);
  })
}

const addAudiocallWindow: () => void = () => {
  const audiocallWindow: HTMLElement = document.querySelector('.game-window');

  renderElement('div', templateAudiocallWindow, audiocallWindow, ['game-window__wrapper', `${Number.isInteger(getGroupNumber()) ? 'active' : ''}`]);

  addEventListeners();
};

const addAudiocall: () => void = () => {
  renderElement('main', templateAudiocall, document.body, 'audiocall');
  addAudiocallWindow();
  beginAudiocall();
};

export { addAudiocall };