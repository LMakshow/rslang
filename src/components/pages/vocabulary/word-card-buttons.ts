import Loader from '../../../controllers/loader';
import { BaseObject } from '../../../models/base.interface';
import { ReceivedUserWord, UsersWord } from '../../../models/users-words.interface';

const sendWord = (wordId: string, difficulty: string) => {
  const query = `users/${localStorage.getItem('userId')}/words/${wordId}`;
  Loader.autorizedGet<ReceivedUserWord>(query, localStorage.getItem('token')).then((data: ReceivedUserWord) => {
    if (difficulty === data.difficulty) { // Повторное нажатие на кнопку для снятия выделения
      const isUsedWord = Object.keys(data.optional)
        .filter((option) => ((data.optional as BaseObject)[option] as number) !== 0).length !== 0;
      if (!isUsedWord) Loader.deleteWord(wordId); // Если слово не использовалось в минииграх
      else {
        const params = {
          difficulty: 'new',
          optional: data.optional,
        };
        Loader.udateWord(wordId, params);
      }
    } else {
      const params = {
        difficulty,
        optional: data.optional,
      };
      Loader.udateWord(wordId, params);
    }
  })
    .catch(() => {
      const params: UsersWord = {
        difficulty,
        optional: {
          audioSuccess: 0,
          audioTotal: 0,
          sprintSuccess: 0,
          sprintTotal: 0,
        },
      };
      return Loader.createWord(wordId, params);
    });
};

const updateGamesParams = (data: ReceivedUserWord) => {
  document.querySelector('.games-stat__audio-success').textContent = String(data.optional.audioSuccess);
  document.querySelector('.games-stat__audio-total').textContent = String(data.optional.audioTotal);
  document.querySelector('.games-stat__sprint-success').textContent = String(data.optional.sprintSuccess);
  document.querySelector('.games-stat__sprint-total').textContent = String(data.optional.sprintTotal);
};

const addCardButtons = () => {
  if (localStorage.getItem('token')) {
    ['.btn-hard', '.btn-learn', '.games-stat'].forEach((elem) => {
      document.querySelector(elem).classList.remove('no-display');
    });
  }

  const wordId = localStorage.getItem('id');
  const btnHard = document.querySelector('.btn-hard');
  const btnLearn = document.querySelector('.btn-learn');
  const card = document.querySelector(`.word-list__card[data-word="${wordId}"]`);
  btnHard.addEventListener('click', () => {
    card.classList.toggle('hard');
    card.classList.remove('learned');
    btnHard.classList.toggle('active');
    btnLearn.classList.remove('active');
    sendWord(wordId, 'hard');
  });
  btnLearn.addEventListener('click', () => {
    card.classList.toggle('learned');
    card.classList.remove('hard');
    btnHard.classList.remove('active');
    btnLearn.classList.toggle('active');
    sendWord(wordId, 'learned');
  });
};

export { addCardButtons };
