import {Observable} from 'rxjs/Observable';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;

export interface FutureDetailTypeStatTuple {
  type: string;
  associatedPokemons: Observable<PokemonWithAllProperties[]>;
}

export interface DetailTypeStatTuple {
  type: string;
  associatedPokemons: PokemonWithAllProperties[];
}


export interface Series {
  name: string;
  value: number;
}

export interface Graph {
  name: string;
  series: Series[];
}
