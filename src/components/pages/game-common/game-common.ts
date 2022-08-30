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
