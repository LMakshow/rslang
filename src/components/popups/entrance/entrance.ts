import Loader from '../../../controllers/loader';

const entrance = () => {
  const form = document.getElementById('entranceForm') as HTMLFormElement;
  const message = document.querySelector('.popup__error') as HTMLParagraphElement;
  form.addEventListener('input', () => {
    message.style.visibility = 'hidden';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.querySelector('input[type=email]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type=password]') as HTMLInputElement).value;
    Loader.loginUser({ email, password }).then(() => {
      form.innerHTML = '<h4 class="popup__success">Вход выполнен!</h4>';
      setTimeout(document.location.reload, 2000);
    }).catch(() => {
      message.style.visibility = 'visible';
    });
  });
};

export { entrance };
