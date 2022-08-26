import templateHeader from './template';
import { renderElement } from '../../controllers/helpers';

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
};

export default addHeader;
