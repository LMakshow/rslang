import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';

export const randomizerWord = (wordsSet: Set<Word>, remove: boolean = true) => {
  const answer: Word = Array.from(wordsSet)[Math.floor(Math.random() * wordsSet.size)];

  if (remove) wordsSet.delete(answer);

  return answer;
};

export const playAudio: (word: Word) => void = (word: Word) => {
  const audio: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
  audio.autoplay = true;
};

export const playAudioForCorrectAnswer: () => void = () => {
  const button: HTMLButtonElement = document.querySelector('.sound');
  const audio: HTMLAudioElement = new Audio('./assets/audio/right.mp3');

  if (localStorage.getItem('isSoundOn') === 'true' || !localStorage.getItem('isSoundOn')) {
    audio.autoplay = true;
  } else {
    audio.autoplay = false;
  }
}

export const playAudioForWrongAnswer: () => void = () => {
  const button: HTMLButtonElement = document.querySelector('.sound');
  const audio: HTMLAudioElement = new Audio('./assets/audio/wrong.mp3');

  if (localStorage.getItem('isSoundOn') === 'true' || !localStorage.getItem('isSoundOn')) {
    audio.autoplay = true;
  } else {
    audio.autoplay = false;
  }
}
