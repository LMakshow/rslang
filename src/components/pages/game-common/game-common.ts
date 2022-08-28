import { Word } from '../../../models/word.interface';
import { Words } from '../../../models/words.interface';
import { SERVER } from '../../../controllers/loader';

export const randomizerWord = (wordsSet: Set<Word>, remove: boolean = true) => {
  const answer: Word = Array.from(wordsSet)[Math.floor(Math.random() * wordsSet.size)];

  if (remove) wordsSet.delete(answer);

  return answer;
};

export const randomizerWords = (array: Words, answer: Word) => {
  const wordsSet: Set<Word> = new Set([answer]);

  while (wordsSet.size < 5) {
    wordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  const result: Words = Array.from(wordsSet).slice(1);
  result.splice(Math.floor(Math.random() * result.length), 0, answer);

  return result;
};

export const playAudio: (word: Word) => void = (word: Word) => {
  const audio: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
  audio.autoplay = true;
};
