export interface Statistics {
  learnedWords: number,
  optional: {
    learnedPages: {
      [group: string] : number[],
    };
    dayStat: {
      today: number,
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
      [date: number]: {
        learnedWords: number,
        totalLearnedWords: number,
      }
    }
  }
}
