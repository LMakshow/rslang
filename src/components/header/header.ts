import templateHeader from './template';
import renderElement from '../../controllers/helpers';

export const addHeader: () => void = () => {
  renderElement('header', templateHeader, document.body, 'header');
};

export const addNologoHeader: () => void = () => {
  renderElement('header', templateHeader, document.body, 'header-nologo');
};
