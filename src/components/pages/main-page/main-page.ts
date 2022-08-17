import templateMain from './template';
import renderElement from '../../../controllers/helpers';

export const addMain: () => void = () => {
  renderElement('main', templateMain, document.body, 'main');
};
