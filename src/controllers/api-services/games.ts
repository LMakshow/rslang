import Loader from '../loader';
import { UsersWord } from '../../models/users-words.interface';

const getUserWord: (wordId: string) => Promise<UsersWord> = (
  wordId: string,
) => Loader.getUserWord(wordId);

const postUserWord: (wordId: string, params: UsersWord) => Promise<UsersWord> = (
  wordId: string,
  params: UsersWord,
) => Loader.createWord(wordId, params).then((res: Response) => res.json());

const putUserWord: (wordId: string, params: UsersWord) => Promise<UsersWord> = (
  wordId: string,
  params: UsersWord,
) => Loader.updateWord(wordId, params).then((res: Response) => res.json());

const checkDifficultyWhenRightAnswer = (usersWord: UsersWord) => {
  const wordProperties = usersWord;
  if (usersWord.optional.successStreak >= 3
    && wordProperties.difficulty === 'new') {
    wordProperties.difficulty = 'learned';
  }

  if (usersWord.optional.successStreak >= 5
    && wordProperties.difficulty === 'hard') {
    wordProperties.difficulty = 'learned';
  }

  return wordProperties;
};

const addUsersRightWordFromAudiocall = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      let usersWord: UsersWord = { ...wordProperties };

      usersWord.optional.audioSuccess += 1;
      usersWord.optional.successStreak += 1;
      usersWord.optional.audioTotal += 1;
      usersWord = checkDifficultyWhenRightAnswer(usersWord);

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 1,
            audioTotal: 1,
            sprintSuccess: 0,
            sprintTotal: 0,
            successStreak: 1,
          },
        },
      );
    });
};

const addUsersWrongWordFromAudiocall = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };
      if (usersWord.difficulty === 'learned') usersWord.difficulty = 'new';
      usersWord.optional.successStreak = 0;
      usersWord.optional.audioTotal += 1;

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 1,
            sprintSuccess: 0,
            sprintTotal: 0,
            successStreak: 0,
          },
        },
      );
    });
};

const addUsersRightWordFromSprint = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      let usersWord: UsersWord = { ...wordProperties };

      usersWord.optional.sprintSuccess += 1;
      usersWord.optional.sprintTotal += 1;
      usersWord.optional.successStreak += 1;
      usersWord = checkDifficultyWhenRightAnswer(usersWord);

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 0,
            sprintSuccess: 1,
            sprintTotal: 1,
            successStreak: 1,
          },
        },
      );
    });
};

const addUsersWrongWordFromSprint = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };

      if (usersWord.difficulty === 'learned') usersWord.difficulty = 'new';
      usersWord.optional.successStreak = 0;
      usersWord.optional.sprintTotal += 1;

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 0,
            sprintSuccess: 0,
            sprintTotal: 1,
            successStreak: 0,
          },
        },
      );
    });
};

export {
  addUsersRightWordFromAudiocall,
  addUsersWrongWordFromAudiocall,
  addUsersRightWordFromSprint,
  addUsersWrongWordFromSprint,
};
