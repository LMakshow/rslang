export interface Statistics {
  learnedWords: number,
  optional: {
    learnedPages: {
      [group: string] : number[]
    };
  }
}
