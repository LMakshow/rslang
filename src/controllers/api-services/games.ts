import Loader from '../loader';
import { UsersWord } from '../../models/users-words.interface';

const getUserWord: (wordId: string) => Promise<UsersWord> = (wordId: string) => {
  return Loader.getUserWord(wordId);
}

const postUserWord: (wordId: string, params: UsersWord) => Promise<UsersWord> = (wordId: string, params: UsersWord) => {
  return Loader.createWord(wordId, params).then((res: Response) => res.json());
}

const putUserWord: (wordId: string, params: UsersWord) => Promise<UsersWord> = (wordId: string, params: UsersWord) => {
  return Loader.udateWord(wordId, params).then((res: Response) => res.json());
}

const addUsersRightWordFromAudiocall = (wordId: string) => {
    getUserWord(wordId)
      .then((usersWord: UsersWord) => {
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

        putUserWord(wordId, (({id, wordId, ...rest}: UsersWord) => rest)(usersWord));
    })
      .catch((err) => {
        postUserWord(
          wordId,
          {
            difficulty: 'new',
            optional: {
              audioSuccess: 1,
              audioTotal: 1,
              sprintSuccess: 0,
              sprintTotal: 0
            }
          })
      });
};

const addUsersWrongWordFromAudiocall = (wordId: string) => {
  getUserWord(wordId)
    .then((usersWord: UsersWord) => {
      if (
        (usersWord.difficulty === 'learned')
      ) {
        usersWord.difficulty = 'new';
      }

      usersWord.optional.audioTotal += 1;

      putUserWord(wordId, (({id, wordId, ...rest}: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 1,
            sprintSuccess: 0,
            sprintTotal: 0
          }
        })
    });
};


export { addUsersRightWordFromAudiocall, addUsersWrongWordFromAudiocall }