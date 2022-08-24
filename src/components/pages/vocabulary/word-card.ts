import { Word } from '../../../models/word.interface';
import { mapOfWords } from './vocabulary';
import renderElement from '../../../controllers/helpers';
import { SERVER } from '../../../controllers/loader';
import { doc } from 'prettier';

const wordDisplayBox = (word: Word) => `
      <div class="word-display__text">
        <div class="word-display__nav">
          <img src="./assets/images/icons/arrow-big.svg" class="word-display__btn left" alt="<">
          <div class="word-display__en">${word.word}</div>
          <img src="./assets/images/icons/arrow-big.svg" class="word-display__btn right" alt=">">
        </div>
        <div class="word-display__ru">${word.wordTranslate}</div>
        <div class="word-display__transcription">
          <button class="btn-listen"><img src="./assets/images/icons/btn-listen.svg" class="btn-listen__img"
              alt="👂"></button>
          <div class="word-display__sound">${word.transcription}</div>
        </div>
      </div>
      <div class="word-display__picture">
        <img src="${SERVER + word.image}" alt="${word.word} image" class="word-display__picture-img">
        <button class="btn-hard"><img src="./assets/images/icons/btn-hard.svg" class="btn-hard__img" alt="💼">
          <div class="btn-hard__txt">В сложные</div>
        </button>
        <button class="btn-learn"><img src="./assets/images/icons/btn-learn.svg" class="btn-learn__img" alt="📋">
          <div class="btn-learn__txt">В изученные</div>
        </button>
      </div>
      <div class="word-display__meaning">
        <div class="word-display__meaning-head">Значение:</div>
        <div class="word-display__meaning-en">${word.textMeaning}</div>
        <div class="word-display__meaning-ru">${word.textMeaningTranslate}</div>
      </div>
      <div class="word-display__example">
        <div class="word-display__example-head">Пример использования:</div>
        <div class="word-display__example-en">${word.textExample}</div>
        <div class="word-display__example-ru">${word.textExampleTranslate}</div>
      </div>`

const playAudio = (audio: HTMLAudioElement) => {
  audio?.play();
}

const enableAudio = (word: Word) => {
  const buttonListen: HTMLButtonElement = document.querySelector('.btn-listen');

  buttonListen.addEventListener('click', () => {
    const audioWord: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
    const audioMeaning: HTMLAudioElement = new Audio(`${SERVER + word.audioMeaning}`);
    const audioExample: HTMLAudioElement = new Audio(`${SERVER + word.audioExample}`);

    const arrayOfAudio: HTMLAudioElement[] = [audioWord, audioMeaning, audioExample];

    playAudio(arrayOfAudio[0]);

    arrayOfAudio.forEach((audio: HTMLAudioElement, index: number) => {
      audio.addEventListener("ended", event => {
        playAudio(arrayOfAudio[index + 1]);

      });
    });
  })
}

const addCardSwitches: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.word-display__btn');
    const wordActive: HTMLElement = document.querySelector('.word-list__card.active');
    let siblingWordId: string;

    if (!eventTargetClosest) {
      return;
    }

    if (eventTargetClosest.classList.contains('left')) {
      siblingWordId = (wordActive.previousElementSibling as HTMLElement)?.dataset?.word;
    } else {
      siblingWordId = (wordActive.nextElementSibling as HTMLElement)?.dataset?.word;
    }

    if (!siblingWordId) {
      return;
    }

    localStorage.setItem('id', siblingWordId);
    selectWordCard();
  })
}

const selectWordCard = () => {
  const wordId: string = localStorage.getItem('id') || Object.keys(mapOfWords)[0];
  const eventTargetClosest: HTMLElement = document.querySelector(`[data-word="${wordId}"]`);

  const wordActive: HTMLElement = document.querySelector('.word-list__card.active');
  const wordDisplay: HTMLElement = document.querySelector('.word-display');

  wordActive?.classList?.remove('active');
  wordDisplay.innerHTML = '';
  eventTargetClosest.classList.add('active');

  renderElement('div', wordDisplayBox(mapOfWords[wordId]), wordDisplay, 'word-display__box');
  enableAudio(mapOfWords[wordId]);

  const buttonCardSwitchLeft: HTMLElement = document.querySelector('.word-display__btn.left');
  const buttonCardSwitchRight: HTMLElement = document.querySelector('.word-display__btn.right');

  buttonCardSwitchLeft.classList.toggle('disabled', !eventTargetClosest.previousElementSibling);
  buttonCardSwitchRight.classList.toggle('disabled', !eventTargetClosest.nextElementSibling);
};

const initWordCard: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.word-list__card');

    if (!eventTargetClosest) {
      return;
    }
    localStorage.setItem('id', eventTargetClosest?.dataset?.word);

    selectWordCard();
  });

  addCardSwitches();
}

export { initWordCard, selectWordCard };
