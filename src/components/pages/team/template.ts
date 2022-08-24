const templateTeam: string = `
<div class="wrapper">
    <div class="team__container">
        <h2 class="team__heading">Наша команда</h2>
        <div class="team__content">
            <div class="team__cards">
                <div class="team__card">
                    <h4 class="team__name">Aida Ya</h4>
                    <img class="team__img" src="assets/images/team/maksim.png" alt="Name">
                    <a class="team__link" href="https://github.com/adypr">adypr</a>
                    <div class="team__cloud">
                        На выходных кто-то деплоит дист, а кто-то деплоит батарею банок из кабачков! Я уже со счета сбилась!
                    </div>
                    <p class="team__description">Взялась за бэкенд так успешно, что он ни разу не упал! А еще сделала логику взаимодействия с сервером, авторизацию, статистику и эту страничку.</p>
                </div>

                <div class="team__card">
                    <h4 class="team__name">Bella Makhova</h4>
                    <img class="team__img" src="assets/images/team/bella.png" alt="Name">
                    <a class="team__link" href="https://github.com/rgvder">rgvder</a>
                    <div class="team__cloud">
                        10 лет — корпоративный юрист. Теперь JS-разработчик. И там, и там законы и правила, но все совсем иначе, и бумаги на столе гораздо меньше. И ближе к мечте, переехать к морю.
                    </div>
                    <p class="team__description">Верстка главной страницы, логика учебника, мини-игра “Аудиовызов” — это всё она. Порой она верстала быстрее, чем дизайнер рисовал странички!</p>
                </div>

                <div class="team__card">
                    <h4 class="team__name">Maksym Lytvyn</h4>
                    <img class="team__img" src="assets/images/team/maksim.png" alt="Name">
                    <a class="team__link" href="https://github.com/LMakshow">lmakshow</a>
                    <div class="team__cloud">
                    Чем только не занимался в жизни! Инжиниринг, дизайн, фотография, танцы... Но программировать я люблю с самого детства — еще на старом ZX Spectrum на Basic.
                    </div>
                    <p class="team__description">Тимлид и дизайнер. Из-под его рук Рислинг прибежал в наш сайт и он приобрел “супергеройский” вид. А еще верстал, правил код, ловил баги и придумывал логику игр.</p>
                </div>

                <div class="team__card">
                    <h4 class="team__name">Ivan Michalchanka</h4>
                    <img class="team__img" src="assets/images/team/ivan.png" alt="Name">
                    <a class="team__link" href="https://github.com/spaceragga">spaceragga</a>
                    <div class="team__cloud">
                    Меня можно сюда не добавлять!\n
                    Я останусь инкогнито, как и положено супергерою!
                    </div>
                    <p class="team__description">Ментор, куратор, стратег и организатор. На этом можно было бы и остановиться, но пользуясь случаем, еще раз передадим ему спасибо за помощь, советы и участие!</p>
                </div>
                
            </div>
            <button class="team__button" onclick="window.location.href = 'index.html';"><span class="team__button_big">Вернуться н</span><span class="team__button_small">Н</span>а главную</button>
        </div>
    </div>
</div>
`;

export default templateTeam;
