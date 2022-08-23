import { Word } from '../../../models/word.interface';
import { mapOfWords } from './vocabulary';
import renderElement from '../../../controllers/helpers';
import { SERVER } from '../../../controllers/loader';

const wordDisplayBox = (word: Word) => `
      <div class="word-display__text">
        <div class="word-display__nav">
          <img src="./assets/images/icons/arrow-big.svg" class="word-display__btn left disabled" alt="<">
          <div class="word-display__en">${word.word}</div>
          <img src="./assets/images/icons/arrow-big.svg" class="word-display__btn" alt=">">
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

    arrayOfAudio.forEach((audio: HTMLAudioElement, index: number = 0) => {
      playAudio(arrayOfAudio[0]);

      audio.addEventListener("ended", event => {
        index++;
        playAudio(arrayOfAudio[index]);

      });
    });
  })
}

const selectWordCard = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.word-list__card');
    const wordActive: HTMLElement = document.querySelector('.word-list__card.active');
    const wordDisplay: HTMLElement = document.querySelector('.word-display');
    const wordDisplayBoxHTML: HTMLElement = document.querySelector('.word-display__box');

    if (!eventTargetClosest) {
      return;
    }

    wordActive?.classList?.remove('active');
    wordDisplayBoxHTML?.remove();

    eventTargetClosest.classList.add('active');

    renderElement('div', wordDisplayBox(mapOfWords[eventTargetClosest?.dataset?.word]), wordDisplay, 'word-display__box');

    enableAudio(mapOfWords[eventTargetClosest?.dataset?.word]);
  });
};

export default selectWordCard;
