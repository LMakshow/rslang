import templateLogout from './template';
import { AggregatedWords } from '../../../models/aggregatedWords.interface';
import Loader from '../../../controllers/loader';

export const addLogout: () => void = () => {
  const container = document.querySelector('.options') as HTMLDivElement;
  container.innerHTML = templateLogout;

  Loader.getAggregatedUserWords()
    .then((data: AggregatedWords) => {
      localStorage.setItem('hardWordsCount', String(data[0].paginatedResults.length));
    });
};
