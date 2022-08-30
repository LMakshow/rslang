import Loader from '../../../controllers/loader';
import { BaseObject } from '../../../models/base.interface';
import { ReceivedUserWord, UsersWord } from '../../../models/users-words.interface';
import { addActiveCardBtns, checkPage } from './active-classes';
import { getStorageItem } from '../../../controllers/api-services/storage';
import { addLearnedWordStat, removeLearnedWordStat } from '../../../controllers/statistics';

const sendWord = (wordId: string, difficulty: string) => {
  const query = `users/${localStorage.getItem('userId')}/words/${wordId}`;
  Loader.authorizedGet<ReceivedUserWord>(query, localStorage.getItem('token')).then((data: ReceivedUserWord) => {
    if (difficulty === data.difficulty) { // Повторное нажатие на кнопку для снятия выделения
      const isUsedWord = Object.keys(data.optional)
        .filter((option) => ((data.optional as BaseObject)[option] as number) !== 0).length !== 0;
      if (!isUsedWord) Loader.deleteWord(wordId); // Если слово не использовалось в минииграх
      else {
        const params = {
          difficulty: 'new',
          optional: data.optional,
        };
        Loader.updateWord(wordId, params);
      }
    } else {
      const params = {
        difficulty,
        optional: data.optional,
      };
      Loader.updateWord(wordId, params);
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
          successStreak: 0,
        },
      };
      return Loader.createWord(wordId, params);
    });
};

const addCardButtons = () => {
  if (localStorage.getItem('token')) {
    ['.btn-hard', '.btn-learn', '.games-stat'].forEach((elem) => {
      document.querySelector(elem).classList.remove('no-display');
    });
  }

  const wordId = getStorageItem('id') as string;
  const btnHard = document.querySelector('.btn-hard');
  const btnLearn = document.querySelector('.btn-learn');
  const card = document.querySelector(`.word-list__card[data-word="${wordId}"]`);
  btnHard.addEventListener('click', () => {
    if (!card) return;
    card.classList.toggle('hard');
    card.classList.remove('learned');
    btnHard.classList.toggle('active');
    btnLearn.classList.remove('active');
    sendWord(wordId, 'hard');
    checkPage();
  });
  btnLearn.addEventListener('click', () => {
    if (!card) return;
    card.classList.toggle('learned');
    card.classList.remove('hard');
    btnHard.classList.remove('active');
    btnLearn.classList.toggle('active');
    sendWord(wordId, 'learned');
    if (btnLearn.classList.contains('active')) {
      addLearnedWordStat();
    } else removeLearnedWordStat();
    checkPage();
  });
  addActiveCardBtns(btnHard as HTMLButtonElement, btnLearn as HTMLButtonElement);
};

export { addCardButtons };
