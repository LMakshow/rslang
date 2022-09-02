import { AggregatedWord, AggregatedWords } from '../../../models/aggregatedWords.interface';

export const HARD_WORDS_LIMIT = 50;

export const getHarddWords = (serverWords: AggregatedWords) => {
  const arr = serverWords[0].paginatedResults;
  return arr.map((word: AggregatedWord) => {
    // eslint-disable-next-line
    word.id = word._id;
    return word;
  });
};

export const stylizeEmptyBlocks = () => {
  (document.querySelector('.vocab') as HTMLElement).style.height = '1px';
  const container = document.querySelector('.vocab__container') as HTMLDivElement;
  container.style.height = '100%';
  container.style.paddingTop = '24px';
};
