import { getGroupNumber, renderElement } from '../../../controllers/helpers';
import { templateAudiocall, templateAudiocallListening, templateAudiocallWindow } from './template';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { getGroupPage } from '../vocabulary/storage';
import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import { templateWordCard } from '../vocabulary/templates';
import { setWords } from '../vocabulary/words-map';
import { selectWordCard } from '../vocabulary/word-card';
import { SERVER } from '../../../controllers/loader';

const groupNumber: number = getGroupNumber();
const learnedWords: Words = [];
const wrongAnswers: Words = [];

let pageWords: Words;
let rightAnswer: Word;

const randomizerWords = (array: Words) => {
  const wordsSet: Set<Word> = new Set();

  while (wordsSet.size < 5) {
    wordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  return Array.from(wordsSet);
}

const randomizerWord = (array: Words) => {
  return array[Math.floor(Math.random() * array.length)];
}

const startAudiocall = (group: number, page: number) => {
  const audiocall: HTMLButtonElement = document.querySelector('.audiocall');

  getWords({
    group: group,
    page: page,
  }).then((words: Words) => {
    pageWords = words;
    const audiocallWords: Words = randomizerWords(pageWords);

    audiocall.innerHTML = templateAudiocallListening(audiocallWords);
    rightAnswer = randomizerWord(audiocallWords);
    chooseRightAnswer();
    playAudio();
  });
}

const chooseRightAnswer: () => void = () => {
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-id]');
    const eventTargetRight: HTMLElement = document.querySelector(`[data-id="${rightAnswer.id}"]`);

    if (!eventTargetClosest) {
      return;
    }
    // console.log(eventTargetClosest);
    // console.log(rightAnswer);

    if (eventTargetClosest.dataset.id === rightAnswer.id) {
      learnedWords.push(rightAnswer);
    } else {
      eventTargetClosest.classList.add('wrong');

      const wrongAnswer: Word = pageWords.find((word: Word) => word.id === eventTargetClosest.dataset.id);

      wrongAnswers.push(wrongAnswer);
      console.log(wrongAnswers);
    }

    eventTargetRight.classList.add('right');
  })
}

const playAudio: () => void = () => {
  const buttonPlayAudio: HTMLButtonElement = document.querySelector('.audiocall-game__listening-button');

  buttonPlayAudio.addEventListener('click', () => {
    const audio: HTMLAudioElement = new Audio(`${SERVER + rightAnswer.audio}`);
    audio.autoplay = true;
  })
}

const beginAudiocall: () => void = () => {
  const buttonBegin: HTMLButtonElement = document.querySelector('.game-window__buttonBegin');

  buttonBegin.addEventListener('click', () => {
    startAudiocall(groupNumber, getGroupPage(groupNumber));
  })
}

const addAudiocallWindow: () => void = () => {
  const audiocallWindow: HTMLElement = document.querySelector('.game-window');

  renderElement('div', templateAudiocallWindow, audiocallWindow, ['game-window__wrapper', `${Number.isInteger(getGroupNumber()) ? 'active' : ''}`]);
};

const addAudiocall: () => void = () => {
  renderElement('main', templateAudiocall, document.body, 'audiocall');
  addAudiocallWindow();
  beginAudiocall();
};

export { addAudiocall };