import templateTextbook from './template';
import renderElement from '../../../controllers/helpers';

const saveGroupNum: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    localStorage.setItem('group', eventTargetClosest.dataset.group);
    localStorage.setItem('page', '0');
    localStorage.removeItem('id');
  });
};

export const addTextbook: () => void = () => {
  renderElement('main', templateTextbook, document.body, 'textbook');
  saveGroupNum();
};
