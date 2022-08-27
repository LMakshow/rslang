import Loader from '../../../controllers/loader';

const registration = () => {
  const form = document.getElementById('registrationForm') as HTMLFormElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.querySelector('input[type=text]') as HTMLInputElement).value;
    const email = (document.querySelector('input[type=email]') as HTMLInputElement).value;
    const password = (document.querySelector('input[type=password]') as HTMLInputElement).value;
    Loader.createUser({ email, name, password }).then(() => {
      Loader.loginUser({ email, password });
    }).then(() => {
      form.innerHTML = '<h4 class="popup__success">Поздравляем, вы зарегистрированы!</h4>';
    })
      .catch((err) => {
        console.log('Login error', err);
      });
  });
};

export { registration };
