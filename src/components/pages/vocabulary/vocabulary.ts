import '../../../global.scss';
import { addHeader } from '../../header/header';
import { addFooter } from '../../footer/footer';

import templateVocab from './template';
import renderElement from '../../../controllers/helpers';

const renderVocabulary: () => void = () => {
  renderElement('main', templateVocab, document.body, 'vocab');
};

addHeader();
renderVocabulary();
addFooter();
