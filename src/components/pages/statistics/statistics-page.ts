import { renderElement } from '../../../controllers/helpers';
import { templateStatistics } from './templates';

const addStatistics: () => void = () => {
  renderElement('main', templateStatistics, document.body, 'statistics');
};

export { addStatistics }
