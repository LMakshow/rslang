import { setStorageValues } from '../../../controllers/api-services/storage';
import Loader from '../../../controllers/loader';
import { Statistics } from '../../../models/statistics.interface';
import { ReceivedUserWords, ReceivedUserWord } from '../../../models/users-words.interface';

export const addActivePages = () => {
  const url = `users/${localStorage.getItem('userId')}/statistics`;
  const token = localStorage.getItem('token');
  Loader.autorizedGet<Statistics>(url, token).then((data: Statistics) => {
    const serverGroup = data.optional.learnedPages[localStorage.getItem('group')];
    const pageSelectors = document.querySelectorAll('.page-selector__btn');
    pageSelectors.forEach((selector) => {
      if (serverGroup.includes(+(selector as HTMLDivElement).dataset.page - 1)) {
        selector.classList.add('learned');
      }
    });
  });
};

export const addActiveWords = () => {
  const url = `users/${localStorage.getItem('userId')}/words`;
  const token = localStorage.getItem('token');
  Loader.autorizedGet<ReceivedUserWords>(url, token).then((serverWords) => {
    const storageWords: ReceivedUserWords = [];
    const words = document.querySelectorAll('.word-list__card');
    (Array.from(words) as HTMLDivElement[]).forEach((word) => {
      let difficulty: string;
      const res = serverWords.find((serverWord) => {
        difficulty = serverWord.difficulty;
        return serverWord.wordId === word.dataset.word;
      });
      if (res) storageWords.push(res);
      if (res && (difficulty === 'hard' || difficulty === 'learned')) word.classList.add(difficulty);
    });
    setStorageValues(['userWords', JSON.stringify(storageWords)]);
  });
};

const updateGamesParams = (data: ReceivedUserWord) => {
  document.querySelector('.games-stat__audio-success').textContent = String(data.optional.audioSuccess);
  document.querySelector('.games-stat__audio-total').textContent = String(data.optional.audioTotal);
  document.querySelector('.games-stat__sprint-success').textContent = String(data.optional.sprintSuccess);
  document.querySelector('.games-stat__sprint-total').textContent = String(data.optional.sprintTotal);
};

export const addActiveCardBtns = (btnHard: HTMLButtonElement, btnLearn: HTMLButtonElement) => {
  const word = document.querySelector(`[data-word="${localStorage.getItem('id')}"]`) as HTMLDivElement;
  if (!word) return;
  if (word.classList.contains('hard')) btnHard.classList.add('active');
  if (word.classList.contains('learned')) btnLearn.classList.add('active');

  const serverWords = JSON.parse(localStorage.getItem('userWords'));
  const recievedWord = (Array.from(serverWords) as ReceivedUserWords)
    .find((serverWord: ReceivedUserWord) => serverWord.wordId === word.dataset.word);
  if (recievedWord) updateGamesParams(recievedWord);
};
