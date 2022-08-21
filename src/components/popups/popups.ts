import templatePopupEntrance from './entrance/template';
import templatePopupRegistration from './registration/template';

export const renderPopupOverlay: () => void = () => {
  const popup: HTMLElement = document.createElement('div');

  document.body.append(popup);
  popup.classList.add('popup-overlay');
  popup.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;

    if (eventTarget.closest('.popup')) {
      return;
    }

    destroyPopup();
  });

  createPopup();
};

const addPopup = (template: string) => {
  const popup: HTMLElement = document.querySelector('.popup-overlay');

  popup.innerHTML = template;
  document.body.classList.add('hidden');
  popup.classList.add('popup-overlay-active');
}

const destroyPopup: () => void = () => {
  const popup: HTMLElement = document.querySelector('.popup-overlay');

  popup.innerHTML = '';
  popup.classList.remove('popup-overlay-active');
  document.body.classList.remove('hidden');
}

const createPopup: () => void = () => {
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-popup]');

    console.log(eventTarget);

    if (!eventTargetClosest) {
      return;
    }

    destroyPopup();

    if (eventTargetClosest.dataset.popup === 'entrance') {
      addPopup(templatePopupEntrance);
    } else {
      addPopup(templatePopupRegistration);
    }

  })
};

export default { renderPopupOverlay };