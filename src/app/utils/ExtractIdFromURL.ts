import Pokemon = GetAllPokemonNames.Pokemon;
import {Injectable} from '@angular/core';

@Injectable()
export class ExtractIdFromPokemon {
  public extract(pokemon: GetAllPokemonNames.Pokemon | Pokemon): number {
    return parseInt(pokemon.url.match(/.+\/(\d+)\//)[1], 10);
  }
}
