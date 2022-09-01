import { addLogin } from './login/login';
import { addLogout } from './logout/logout';
import { removeStorageValues } from '../../controllers/api-services/storage';
import { registration } from '../popups/registration/registration';
import { entrance } from '../popups/entrance/entrance';
import Loader from '../../controllers/loader';

const EXPIRATION_TIME = (4 * 60 * 60 * 1000) - 6000;

const renderLogout = () => {
  addLogout();
  const buttonOut = document.querySelector('.autorization__out');
  buttonOut.addEventListener('click', () => {
    removeStorageValues('userId', 'refreshToken', 'token', 'name', 'tokenTime', 'hardWordsCount');
    (document.querySelector('.popup-overlay') as HTMLDivElement).style.display = 'none';
    document.location.reload();
  });
};

export const renderAutorization = () => {
  if (!localStorage.getItem('token')) {
    addLogin();
    return;
  }
  const tokenTime = +localStorage.getItem('tokenTime');
  const isExpiredToken = tokenTime + EXPIRATION_TIME < Date.now();
  if (isExpiredToken) {
    const url = `users/${localStorage.getItem('userId')}/tokens`;
    const token = localStorage.getItem('refreshToken');
    Loader.authorizedGet(url, token).then(() => {
      renderLogout();
    }).catch(() => {
      removeStorageValues('userId', 'refreshToken', 'token', 'name', 'tokenTime', 'hardWordsCount');
      addLogin();
    });
  } else {
    renderLogout();
  }
};

export const addAutorization = (type: string): void => {
  if (type === 'registration') registration();
  else if (type === 'entrance') entrance();
};
