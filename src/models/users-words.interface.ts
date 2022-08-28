export interface UsersWord {
  difficulty: string,
  optional: {
    audioSuccess: number,
    audioTotal: number,
    sprintSuccess: number,
    sprintTotal: number,
  },
  wordId?: string,
  id?: string,
}

export type UserWords = UsersWord[];

export interface ReceivedUserWord extends UsersWord {
  id: string,
  wordId: string
}
