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

const addUsersRightWordFromAudiocall = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };

      usersWord.optional.audioSuccess += 1;

      if (
        ((usersWord.optional.audioSuccess + usersWord.optional.sprintSuccess) > 3
          && usersWord.difficulty === 'new')
      ) {
        usersWord.difficulty = 'learned';
      }

      if (
        ((usersWord.optional.audioTotal + usersWord.optional.sprintSuccess) > 5
          && usersWord.difficulty === 'hard')
      ) {
        usersWord.difficulty = 'learned';
      }

      usersWord.optional.audioTotal += 1;

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
          },
        },
      );
    });
};

const addUsersWrongWordFromAudiocall = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };

      if (
        (usersWord.difficulty === 'learned')
      ) {
        usersWord.difficulty = 'new';
      }

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
          },
        },
      );
    });
};

export { addUsersRightWordFromAudiocall, addUsersWrongWordFromAudiocall };
