import { Settings, Statistics } from '../models/statistics.interface';
import Loader from './loader';

export const newOptions: Settings = {
  optional: {
    learnedPages: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
  },
};

export const newStatistics: Statistics = {
  learnedWords: 0,
  optional: {
    dayStat: {
      today: new Date().setHours(0, 0, 0, 0),
      newWords: 0,
      learnedWords: 0,
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
      [new Date().setHours(0, 0, 0, 0)]: { learnedWords: 0, totalLearnedWords: 0 },
    },
  },
};

export const createNewDayStat = () => ({
  today: new Date().setHours(0, 0, 0, 0),
  newWords: 0,
  learnedWords: 0,
  newWordsAudiocall: 0,
  correctAudiocall: 0,
  totalAudiocall: 0,
  maxStreakAudiocall: 0,
  newWordsSprint: 0,
  correctSprint: 0,
  totalSprint: 0,
  maxStreakSprint: 0,
});

export const addLearnedWordStat = async () => {
  const stat = await Loader.getStatistics();
  const today = new Date().setHours(0, 0, 0, 0);
  stat.learnedWords += 1;
  if (stat.optional.completeStat[today]) {
    stat.optional.completeStat[today].learnedWords += 1;
    stat.optional.completeStat[today].totalLearnedWords = stat.learnedWords;
  } else {
    stat.optional.completeStat[today] = {
      learnedWords: 1,
      totalLearnedWords: stat.learnedWords,
    };
  }

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.learnedWords += 1;
  Loader.upsertStatistics(stat);
};

export const removeLearnedWordStat = async () => {
  const stat = await Loader.getStatistics();
  const today = new Date().setHours(0, 0, 0, 0);
  stat.learnedWords -= 1;
  if (stat.optional.completeStat[today]) {
    stat.optional.completeStat[today].learnedWords -= 1;
    stat.optional.completeStat[today].totalLearnedWords = stat.learnedWords;
  } else {
    stat.optional.completeStat[today] = {
      learnedWords: -1,
      totalLearnedWords: stat.learnedWords,
    };
  }

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.learnedWords += 1;
  Loader.upsertStatistics(stat);
};
