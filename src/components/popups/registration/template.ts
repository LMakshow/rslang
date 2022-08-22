const templatePopupRegistration: string = `
   <div class="popup registration-popup">
    <div class="popup__wrapper">
      <div class="popup__image">
      <img class="popup__dog" src="./assets/images/popups/popup-registration.svg" alt="Entrance">
      </div>
      <div class="popup__content">
        <div class="popup__header">
          <h3 class="popup__header_heading">Регистрация</h3>
          <p class="popup__header_text">Сохраняйте сложные слова, ваш прогресс изучения слов и статистику</p>
        </div>
        <form class="popup__inputs">
          <input class="popup__input" type="text" placeholder="Имя">
          <input class="popup__input" type="email" placeholder="Email">
          <input class="popup__input" type="password" placeholder="Пароль">
        </form>
        <div class="popup__footer">
          <button class="button button-additional popup__button button-registration">Зарегистрироваться</button>
          <div class="popup__proposal">
            <span class="popup__proposal_text">Уже есть аккаунт?</span>
            <button class="button-transparent popup__proposal_button" data-popup="entrance">Войти</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

export default templatePopupRegistration;
