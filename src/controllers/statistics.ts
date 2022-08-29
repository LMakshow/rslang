import { Statistics } from '../models/statistics.interface';

export const newStatistics: Statistics = {
  learnedWords: 0,
  optional: {
    learnedPages: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
    dayStat: {
      today: `${new Date().setHours(0, 0, 0, 0)}`,
      newWordsAudiocall: 0,
      correctAudiocall: 0,
      totalAudiocall: 0,
      maxStreakAudiocall: 0,
      newWordsSprint: 0,
      correctSprint: 0,
      totalSprint: 0,
      maxStreakSprint: 0,
    },
    completeStat: {
      [new Date().setHours(0, 0, 0, 0)]: [{ learnedWords: 0, totalLearnedWords: 0 }],
    },
  },
};
