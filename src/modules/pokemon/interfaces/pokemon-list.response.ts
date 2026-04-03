export interface PokemonListResponse {
  count: number;
  next: string;
  previous: null;
  result: Result[];
}

export interface Result {
  name: string;
  url: string;
}
