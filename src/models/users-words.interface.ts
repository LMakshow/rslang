export interface UsersWord {
  difficulty: string,
  optional: {
    audioSuccess: number,
    audioTotal: number,
    sprintSuccess: number,
    sprintTotal: number
  }
}

export type UserWords = UsersWord[];

export interface ReceivedUserWord extends UsersWord {
  id: string,
  wordId: string
}

export type ReceivedUserWords = ReceivedUserWord[];
