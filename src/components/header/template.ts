const templateHeader: string = `
<div class="header__wrapper wrapper">
  <div class="header__container">
    <div class="mobile-label">
      <span></span>
    </div>
    <div class="mobile-blackout"></div>
    <div class="logo">
      <a href="index.html">
      <h2 class="logo__text">RS Lang</h2>
      </a>
    </div>
    <nav class="navigation">
  <div class="navigation__links menu mobile-menu">
  
    <a class="navigation-link menu__link link-basic" href="textbook.html">
      <svg class="navigation-link__icon" width="25" height="29" viewBox="0 0 25 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.80476 2.83333H24.0606V0.5H4.22726C2.29526 0.5 0.727264 2.06683 0.727264 4V25C0.727264 26.9332 2.29526 28.5 4.22726 28.5H24.0606V5.16667H4.80476C3.19943 5.16667 3.19943 2.83333 4.80476 2.83333ZM5.39393 7.5H13.5606V15.6667L15.8939 13.3333L18.2273 15.6667V7.5H21.7273V26.1667H5.39393V7.5Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Учебник</span>
    </a>
    
    <a class="navigation-link menu__link link-basic" href="#">
      <svg class="navigation-link__icon" width="31" height="29" viewBox="0 0 31 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.80824 25.9545C2.05243 25.1782 0.0606079 22.0218 0.0606079 18.9545C0.0606079 15.6264 2.2637 12.3389 6.78443 11.9545C4.98352 13.9795 3.87879 16.6738 3.87879 19.5909C3.87879 21.8589 4.66533 24.1727 5.80824 25.9545ZM30.6061 18.9545C30.6061 22.0205 28.6333 25.1769 24.8788 25.9545C26.0204 24.1727 26.7879 21.8589 26.7879 19.5909C26.7879 16.6738 25.6832 13.9795 23.8822 11.9545C28.403 12.3402 30.6061 15.6276 30.6061 18.9545ZM24.1482 9.42564C25.3472 9.53255 26.4162 9.79982 27.367 10.1905C25.7506 4.60582 21.4284 0.5 15.3333 0.5C9.24206 0.5 4.93134 4.60455 3.31624 10.1816C4.26315 9.796 5.3297 9.53 6.52352 9.42436C8.23788 6.19418 11.4133 4.28255 15.3333 4.29018C19.2546 4.28255 22.4326 6.19418 24.1482 9.42564ZM15.3333 10.6818C10.4142 10.6818 6.42424 14.6705 6.42424 19.5909C6.42424 24.5113 10.4142 28.5 15.3333 28.5C20.2524 28.5 24.2424 24.5113 24.2424 19.5909C24.2424 14.6705 20.2524 10.6818 15.3333 10.6818ZM12.7879 24.6818V14.5L20.4242 19.5909L12.7879 24.6818Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Аудиовызов</span>
    </a>
    
    <a class="navigation-link menu__link link-basic" href="#">
      <svg class="navigation-link__icon" width="22" height="29" viewBox="0 0 22 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.2264 5.21567C13.3064 5.21567 13.2177 1.83817 8.66655 1.83817C6.20722 1.83817 3.91238 2.9815 2.93938 3.8145V0.5H0.606049V28.5H2.93938V17.9148C4.32072 16.9593 6.41488 15.9537 8.68288 15.9537C12.9809 15.9537 13.584 19.1667 17.4142 19.1667C19.8899 19.1667 21.606 17.5812 21.606 17.5812V3.5485C21.606 3.5485 19.7149 5.21567 17.2264 5.21567ZM19.2727 11.3092C16.4529 13.3823 13.4055 10.9125 11.8644 9.89517V14.1757L11.8679 14.1768C10.9847 13.8513 9.94872 13.6203 8.68288 13.6203C6.37405 13.6203 4.35455 14.4125 2.93938 15.1825V10.7608C5.57605 8.46017 9.40855 8.15567 11.8644 9.89517V5.45833C12.9914 6.34033 14.5337 7.549 17.2264 7.549C17.9579 7.549 18.6439 7.44867 19.2727 7.28883V11.3092Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Спринт</span>
    </a>
    
        <a class="navigation-link menu__link link-basic" href="#">
      <svg class="navigation-link__icon" width="27" height="29" viewBox="0 0 27 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.60605 28.5H0.606049V21.5H7.60605V28.5ZM16.9394 18H9.93938V28.5H16.9394V18ZM26.2727 13.3333H19.2727V28.5H26.2727V13.3333ZM26.2727 0.5L19.2727 1.9245L21.2747 3.91717L13.283 11.7723L9.78188 8.27L0.634049 17.3665L2.27905 19.0208L9.77722 11.5658L13.2667 15.0577L22.9267 5.5645L24.8715 7.50117L26.2727 0.5V0.5Z"/>
      </svg>
      <span class="navigation-link__text menu__link_text text">Статистика</span>
    </a>
    
  </div>
  
  <div class="navigation__links options">
    <button class="navigation-link link-basic options__registration" data-popup="registration">
      <span class="navigation-link__text text">Регистрация</span>
    </button>
    
    <button class="navigation-link link-basic options__entrance" data-popup="entrance">
      <span class="navigation-link__text options__entrance_text text">Вход</span>
      <svg class="navigation-link__icon" width="40" height="35" viewBox="0 0 40 35" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 12.5V5.83331L26.6667 17.5L13.3333 29.1666V22.5H0V12.5H13.3333ZM23.3333 0.833313C20.355 0.833313 17.5667 1.62331 15.1483 2.99165L15.5283 3.32498L17.8533 5.35998C19.5267 4.59998 21.3783 4.16665 23.3333 4.16665C30.685 4.16665 36.6667 10.1483 36.6667 17.5C36.6667 24.8516 30.685 30.8333 23.3333 30.8333C21.3783 30.8333 19.5267 30.4 17.8533 29.6416L15.5283 31.6766L15.1483 32.01C17.5667 33.3766 20.355 34.1666 23.3333 34.1666C32.5367 34.1666 40 26.705 40 17.5C40 8.29498 32.5367 0.833313 23.3333 0.833313Z"/>
      </svg>
    </button>
  </div>  
</nav>
  </div>
</div>

`;

export default templateHeader;
