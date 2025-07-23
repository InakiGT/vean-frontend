export type GameId = string

export interface Game {
	name: string,
	url: string,
	imgUri?: string,
}

export interface GameWithId extends Game {
	_id: GameId,
}
