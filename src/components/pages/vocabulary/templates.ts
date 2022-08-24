import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';

const templateVocab: string = `
<div class="vocab__wrapper wrapper">
<div class="vocab__container">
  <div class="words-page">
    <div class="words-page__nav">
      <a href="textbook.html" class="words-page__return">
      <img src="./assets/images/icons/arrow-back.svg" class="words-page__return-img" alt="<"></a>
      <div class="page-selector-block">
      <div class="page-selector">
        <div class="page-selector__btn" data-page="1"></div>
        <div class="page-selector__btn" data-page="2"></div>
        <div class="page-selector__btn learned" data-page="3"></div>
        <div class="page-selector__btn" data-page="4"></div>
        <div class="page-selector__btn" data-page="5"></div>
        <div class="page-selector__btn" data-page="6"></div>
        <div class="page-selector__btn" data-page="7"></div>
        <div class="page-selector__btn" data-page="8"></div>
        <div class="page-selector__btn" data-page="9"></div>
        <div class="page-selector__btn" data-page="10"></div>
        <div class="page-selector__btn" data-page="11"></div>
        <div class="page-selector__btn" data-page="12"></div>
        <div class="page-selector__btn" data-page="13"></div>
        <div class="page-selector__btn" data-page="14"></div>
        <div class="page-selector__btn" data-page="15"></div>
        </div>
        <div class="page-selector">
        <div class="page-selector__btn" data-page="16"></div>
        <div class="page-selector__btn" data-page="17"></div>
        <div class="page-selector__btn" data-page="18"></div>
        <div class="page-selector__btn" data-page="19"></div>
        <div class="page-selector__btn" data-page="20"></div>
        <div class="page-selector__btn" data-page="21"></div>
        <div class="page-selector__btn" data-page="22"></div>
        <div class="page-selector__btn" data-page="23"></div>
        <div class="page-selector__btn" data-page="24"></div>
        <div class="page-selector__btn" data-page="25"></div>
        <div class="page-selector__btn" data-page="26"></div>
        <div class="page-selector__btn" data-page="27"></div>
        <div class="page-selector__btn" data-page="28"></div>
        <div class="page-selector__btn" data-page="29"></div>
        <div class="page-selector__btn" data-page="30"></div>
        </div>
      </div>
      <div class="page-switch">
        <img src="./assets/images/icons/arrow-circle.svg" class="page-switch__btn left" alt="<">
        <div class="page-num"><span class="page-num__curr-page"></span><span>&nbsp;из&nbsp;</span><span
            class="page-num__total-page">30</span></div>
        <img src="./assets/images/icons/arrow-circle.svg" alt=">" class="page-switch__btn right">
      </div>
    </div>
    <div class="word-list"></div>
    <div class="words-page__games">
      <a href="#"><img src="./assets/images/vocabulary/game-audio.png" alt="Мини-игра Аудиовызов"
          class="words-page__audio-img"></a>
      <a href="#"><img src="./assets/images/vocabulary/game-sprint.png" alt="Мини-игра Спринт"
          class="words-page__sprint-img"></a>
    </div>
  </div>
  <div class="word-display"></div>
</div>
</div>`;

const templateWordCard = (word: Word) => `
  <div class="word-list__card" data-word="${word.id}">
    <div class="word-list__english-word">${word.word}</div>
    <div class="word-list__russian-word">${word.wordTranslate}</div>
  </div>`;

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
  </div>`;

export { templateVocab, templateWordCard, wordDisplayBox };
