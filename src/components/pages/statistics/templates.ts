const templateStatistics = `
      <div class="total-stat">
        <div class="statistics__heading total-stat__heading">
          <div class="total-stat__heading-wrapper wrapper">
            <span class="statistics__heading_text">Статистика</span>
          </div>
        </div>
        <div class="total-stat__wrapper wrapper">
          <div class="total-stat__app app-stat">
            <div class="app-stat__date">
              <div class="app-stat__date_img">
                <img src="./assets/images/statistics/date.svg" alt="Date">
              </div>
              <div class="app-stat__date_text"><span>31 августа 2022</span></div>
            </div>
            <div class="app-stat__info info-items">
              <div class="info-item item-total">
                <img class="item-total_icon" src="./assets/images/statistics/icon-1.svg" alt="All learned words">
                <span class="info-item__text item-total__text">Всего изученных слов: <span class="info-item__count item-total__count">1925
              </span></span>
              </div>
              <div class="info-item">
                <img class="info-item_icon" src="./assets/images/statistics/icon-2.svg" alt="New words per day">
                <span class="info-item__text">Новых слов за день: <span class="info-item__count">350</span></span>
              </div>
              <div class="info-item">
                <img class="info-item_icon" src="./assets/images/statistics/icon-3.svg" alt="Learned words per day">
                <span class="info-item__text">Изученных слов за день: <span class="info-item__count">108</span></span>
              </div>
              <div class="info-item">
                <img class="info-item_icon" src="./assets/images/statistics/icon-4.svg" alt="Percentage of correct answers per day">
                <span class="info-item__text">Процент правильных ответов за день: <span class="info-item__count">50%</span></span>
              </div>
            </div>
            <div class="app-stat__diagram"></div>
          </div>
          <div class="total-stat__games">
            <div class="game-stat audiocall-stat">
              <div class="game-stat__img audiocall-stat__img">
              <img src="./assets/images/statistics/dog-audiocall.svg" alt="Audiocall game">
              </div>
              <div class="game-stat__content">
                <span class="game-stat__heading">Аудиовызов</span>
                <div class="game-stat__info game-items">
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-2.svg" alt="New words per day">
                    <span class="game-item__text">Новых слов за день: <span class="game-item__count">180</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-4.svg" alt="Percentage of correct answers">
                    <span class="game-item__text">Правильные ответы: <span class="game-item__count">90%</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-5.svg" alt="Longest streak">
                    <span class="game-item__text">Самая длинная серия: <span class="game-item__count">96</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="game-stat sprint-stat">
              <div class="game-stat__img sprint-stat__img">
              <img src="./assets/images/statistics/dog-sprint.svg" alt="Sprint game">
              </div>
              <div class="game-stat__content">
                <span class="game-stat__heading">Спринт</span>
                <div class="game-stat__info game-items">
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-2.svg" alt="New words per day">
                    <span class="game-item__text">Новых слов за день: <span class="game-item__count">180</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-4.svg" alt="Percentage of correct answers">
                    <span class="game-item__text">Правильные ответы: <span class="game-item__count">90%</span></span>
                  </div>
                  <div class="game-item">
                    <img class="game-item_icon" src="./assets/images/statistics/icon-5.svg" alt="Longest streak">
                    <span class="game-item__text">Самая длинная серия: <span class="game-item__count">96</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="daily-stat">
        <div class="statistics__heading daily-stat__heading">
          <div class="daily-stat__heading-wrapper wrapper">
            <span class="statistics__heading_text">Ежедневный прогресс</span>
          </div>
        </div>
        <div class="daily-stat__wrapper wrapper">
        <div class="daily-stat__chart"></div>
        </div>
      </div>`;

export { templateStatistics }