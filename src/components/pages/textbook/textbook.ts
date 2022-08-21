import './_textbook-page.scss';
import { addHeader } from '../../header/header';
import { addTextbook } from './textbook-page';
import { addFooter } from '../../footer/footer';
import { getWord, getWords } from '../../../controllers/api-services/vocabulary';
import { Words } from '../../../models/words.interface';

addHeader();
addTextbook();
addFooter();

getWords({ group: 3, page: 7 }).then((words: Words) => {
  console.log(words);
});

getWord('5e9f5ee35eb9e72bc21afc3b').then((word) => {
  console.log(word);
});
