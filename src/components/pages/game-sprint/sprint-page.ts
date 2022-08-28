import { getGroupNumber, renderElement } from '../../../controllers/helpers';
import {
  templateSprint,
  templateSprintGame,
  templateSprintWindow,
} from './template';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { getGroupPage } from '../vocabulary/storage';
import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import { playAudio, randomizerWord } from '../game-common/game-common';
import { templateGameResults } from '../game-common/game-templates';

const groupNumber: number = getGroupNumber();

let rightWord: Word;
let wrongWord: Word;
let correctAnswer: boolean;
let score: number;
let combo: number;
let comboMod: number;
let time: number;

let gameWords: Words;
let gameWordsCurrent: Set<Word>;

const rightWords: Words = [];
const wrongWords: Words = [];

const getGroupWords: (group: number) => Promise<Words> = (group: number) => {
  const promiseArray: Promise<Words>[] = Array(30)
    .fill(null)
    .map((item, page: number) => getWords({ group, page }));

  return Promise.all(promiseArray).then((wordsArray: Words[]) => {
    const array: Words = wordsArray.flat();
    gameWords = array;
    return array;
  });
};

const getVocabWords = (group: number, page: number) => {
  const promiseArray: Promise<Words> = getWords({ group, page });

  return promiseArray.then((words: Words) => {
    gameWords = words;
    return words;
  });
};

const comboCounter = () => {
  if (combo < 4) comboMod = 1;
  if (combo >= 4 && combo < 8) comboMod = 2;
  if (combo >= 8 && combo < 12) comboMod = 4;
  if (combo >= 12) comboMod = 8;
};

const newGameRound = () => {
  const sprint: HTMLButtonElement = document.querySelector('.sprint');

  rightWord = randomizerWord(gameWordsCurrent);
  wrongWord = randomizerWord(gameWordsCurrent, false);
  correctAnswer = Math.random() < 0.5;

  sprint.innerHTML = templateSprintGame(
    score,
    comboMod,
    time,
    rightWord,
    correctAnswer ? rightWord : wrongWord,
  );
};

const startGame = () => {
  gameWordsCurrent = new Set(gameWords);
  score = 0;
  combo = 0;
  comboMod = 1;
  time = Date.now() + 30000;

  newGameRound();
};

const renderGameResultsScreen: () => void = () => {
  const gameWrapper: HTMLElement = document.querySelector('.sprint-game__wrapper');
  const sprintGame: HTMLElement = document.querySelector('.sprint-game');
  gameWrapper.innerHTML = templateGameResults(rightWords, wrongWords);

  const statisticRight: HTMLElement = document.querySelector('.statistic-right');
  const statisticWrong: HTMLElement = document.querySelector('.statistic-wrong');

  sprintGame.classList.add('results');

  if (!rightWords.length) {
    statisticRight?.remove();
  }

  if (!wrongWords.length) {
    statisticWrong?.remove();
  }
};

const addEventListeners: () => void = () => {
  // переход из ссылки хэдера
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-window__button[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    getGroupWords(+eventTargetClosest.dataset.group)
      .then(() => startGame());
  });

  // Переход из учебника и начало игры по кнопке Начать
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-game');

    if (!eventTargetClosest) {
      return;
    }

    getVocabWords(groupNumber, getGroupPage(groupNumber))
      .then(() => startGame());
  });

  // проигрывание аудио
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.sprint-word-en__btn-listen');

    if (!eventTargetClosest) {
      return;
    }

    playAudio(rightWord);
  });

  // выбор варианта ответа
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-answer');

    const eventTargetWrong: HTMLElement = document.querySelector('.sprint-button__wrong');
    const eventTargetCorrect: HTMLElement = document.querySelector('.sprint-button__correct');

    if (!eventTargetClosest) {
      return;
    }

    if ((correctAnswer && eventTargetClosest === eventTargetCorrect)
      || (!correctAnswer && eventTargetClosest === eventTargetWrong)) {
      score += 10 * comboMod;
      combo += 1;
      comboCounter();
      rightWords.push(rightWord);
    }

    if ((correctAnswer && eventTargetClosest === eventTargetWrong)
      || (!correctAnswer && eventTargetClosest === eventTargetCorrect)) {
      combo = 0;
      comboCounter();
      wrongWords.push(rightWord);
    }

    if (time - Date.now() < 0) {
      renderGameResultsScreen();
    } else newGameRound();
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
    startGame();
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

const addSprintWindow: () => void = () => {
  const sprintWindow: HTMLElement = document.querySelector('.game-window');

  renderElement('div', templateSprintWindow, sprintWindow, ['game-window__wrapper', `${Number.isInteger(getGroupNumber()) ? 'active' : ''}`]);
  addEventListeners();
};

const addSprint: () => void = () => {
  renderElement('main', templateSprint, document.body, ['sprint', 'color-sprint']);
  addSprintWindow();
};

export { addSprint };
