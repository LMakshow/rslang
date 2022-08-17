import templateFooter from './template';
import renderElement from '../../controllers/helpers';

export const addFooter: () => void = () => {
  renderElement('footer', templateFooter, document.body, 'footer');
};
