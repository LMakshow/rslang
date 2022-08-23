import '../../../global.scss';
import { addHeader } from '../../header/header';
import { addFooter } from '../../footer/footer';

import templateVocab from './template';
import renderElement from '../../../controllers/helpers';

import { Word } from '../../../models/word.interface';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { Words } from '../../../models/words.interface';
import { initWordCard, selectWordCard } from './word-card';

export let mapOfWords: Record<string, Word> = {};

const templateWordCard = (word: Word) =>
  `<div class="word-list__card" data-word="${word.id}">
    <div class="word-list__english-word">${word.word}</div>
    <div class="word-list__russian-word">${word.wordTranslate}</div>
  </div>`;

const setPage = (currentPage: number = 0, isRemoveId?: boolean) => {
  const currentPageNext: HTMLElement = document.querySelector(`[data-page="${currentPage + 1}"]`);
  const currentPageActive: HTMLElement = document.querySelector('.page-selector__btn.active');
  const currentPageNumSpan: HTMLSpanElement = document.querySelector('.page-num__curr-page');

  localStorage.setItem('page', `${+currentPage}`);
  currentPageActive?.classList?.remove('active');
  currentPageNext.classList.add('active');
  currentPageNumSpan.textContent = `${currentPage + 1}`;

  if (isRemoveId) {
    localStorage.removeItem('id');
  }

  renderWordList();
}

const addSwitches: () => void = () => {
  const buttonSwitchLeft: HTMLElement = document.querySelector('.page-switch__btn.left');
  const buttonSwitchRight: HTMLElement = document.querySelector('.page-switch__btn.right');

  buttonSwitchLeft.addEventListener('click', () => {})
}

const addPagination: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-page]');

    if (!eventTargetClosest) {
      return;
    }

    const currentPage: string = eventTargetClosest.dataset.page;

    setPage(+currentPage - 1, true);
  });

  setPage(+localStorage.getItem('page'));
};

const initWordList: () => void = () => {
  addPagination();
}

const renderWordList: () => void = () => {
  const wordList: HTMLElement = document.querySelector('.word-list') as HTMLElement;

  getWords({ group: +localStorage.getItem('group'), page: +localStorage.getItem('page') }).then((words: Words) => {
    const templatesOfWords: string = words.map((word) => templateWordCard(word)).join('');

    wordList.innerHTML = templatesOfWords;

    mapOfWords = words.reduce((map: Record<string, Word>, word: Word) => {
      map[word.id] = word;
      return map;
    }, {})

    selectWordCard();
  });
}

const renderVocabulary: () => void = () => {
  renderElement('main', templateVocab, document.body, 'vocab');
  initWordCard();
};

addHeader();
renderVocabulary();
addFooter();
initWordList();
