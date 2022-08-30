export interface Settings {
  optional: {
    learnedPages: {
      [group: string] : number[],
    };
  }
}

export interface Statistics {
  learnedWords: number,
  optional: {
    dayStat: {
      today: number,
      newWords: number,
      learnedWords: number,
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
