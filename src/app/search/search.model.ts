declare module GetAllPokemonNames {

  export interface Pokemon {
    name: string;
    url: string;
  }

  export interface RootObject {
    count: number;
    next?: any;
    previous?: any;
    results: Pokemon[];
  }

}

