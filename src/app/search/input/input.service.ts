import { Injectable } from '@angular/core';
import {PokemonService} from 'app/services/pokemon.service';
import {environment} from 'environments/environment';
import Pokemon = GetAllPokemonNames.Pokemon;
import {PokemonWithPictureUrl} from 'app/search/input/input.model';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  pokemonUrlPng: string = environment.urlPokemonPng;

  constructor() { }

  public pokemonToPokemonWithPng(pokemon: Pokemon): PokemonWithPictureUrl {
    return {...pokemon, pngUrl: `${this.pokemonUrlPng + this.extractIdFromPokemon(pokemon)}.png`};
  }

  // TODO duplicate code
  private extractIdFromPokemon(pokemon: GetAllPokemonNames.Pokemon): number {
    return parseInt(pokemon.url.match(/.+\/(\d+)\//)[1], 10);
  }

}
