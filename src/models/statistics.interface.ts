export interface Statistics {
  learnedWords: number,
  optional: {
    learnedPages: {
      [group: string] : number[],
    };
    dayStat: {
      today: string,
      newWordsAudiocall: number,
      correctAudiocall: number,
      totalAudiocall: number,
      maxStreakAudiocall: number,
      newWordsSprint: number,
      correctSprint: number,
      totalSprint: number,
      maxStreakSprint: number,
    }
    completeStat: {
      [date: string]: {
        learnedWords: number,
        totalLearnedWords: number,
      }[]
    }
  }
}
