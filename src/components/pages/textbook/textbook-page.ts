import templateTextbook from './template';
import renderElement from '../../../controllers/helpers';

export const addTextbook: () => void = () => {
  renderElement('main', templateTextbook, document.body, 'textbook');
};
