const templatePopupRegistration: string = `
    <div class="popup__wrapper">
      <div class="popup__image"></div>
      <div class="popup__content">
        <div class="popup__text">
          <h3 class="popup__text_heading">Регистрация</h3>
          <p class="popup__text_paragraph">Сохраняйте сложные слова, ваш прогресс изучения слов и статистику</p>
        </div>
        <form class="popup__inputs">
          <input class="popup__input" type="text" placeholder="Имя">
          <input class="popup__input" type="email" placeholder="Email">
          <input class="popup__input" type="password" placeholder="Пароль">
        </form>
        <button class="button button-additional popup__button button-registration">Зарегистрироваться</button>
        <div class="popup__proposal">
        <span class="popup__proposal_text">Уже есть аккаунт?</span>
        <button class="popup__proposal_button">Войти</button>
        </div>
      </div>
    </div>`;

export default templatePopupRegistration;