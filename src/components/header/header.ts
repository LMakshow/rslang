import templateHeader from './template';
import { renderElement } from '../../controllers/helpers';
import { renderAutorization } from '../autorization/autorization';

const addGameSound: () => void = () => {
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.sound');

    if (!eventTargetClosest) {
      return;
    }

    if (!eventTargetClosest.classList.contains('no-sound')) {
      localStorage.setItem('isSoundOn', 'false');
      eventTargetClosest.classList.add('no-sound');
    } else {
      localStorage.setItem('isSoundOn', 'true');
      eventTargetClosest.classList.remove('no-sound');
    }
  });
};

const closeMobileMenu: () => void = () => {
  const header: HTMLElement = document.querySelector('.header');

  header.classList.remove('mobile-opened');
  document.body.classList.remove('hidden');
};

const renderMobileMenu: () => void = () => {
  const mobileLabel: HTMLElement = document.querySelector('.mobile-label');
  const header: HTMLElement = document.querySelector('.header');
  const mobileBlackout: HTMLElement = document.querySelector('.mobile-blackout');

  mobileLabel.addEventListener('click', () => {
    header.classList.toggle('mobile-opened');
    document.body.classList.toggle('hidden');
  });

  mobileBlackout.addEventListener('click', closeMobileMenu);
};

export const addHeader: () => void = () => {
  renderElement('header', templateHeader, document.body, 'header');
  renderMobileMenu();
  renderAutorization();
  addGameSound();
};

export default addHeader;
