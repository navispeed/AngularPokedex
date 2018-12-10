import {Injectable} from '@angular/core';
import {TypeService} from 'app/services/type.service';
import {PokemonService} from 'app/services/pokemon.service';
import 'rxjs-compat/add/operator/mergeMap';
import {ExtractIdFromPokemon} from 'app/utils/ExtractIdFromURL';
import {Observable} from 'rxjs/Observable';
import {FutureDetailTypeStatTuple} from 'app/search/detail/detail.model';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import Stat = Pokemon.Stat;

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private static _color = {
    'normal': 'is-white',
    'fighting': 'is-warning',
    'flying': 'is-primary',
    'poison': 'is-success',
    'ground': 'is-dark',
    'rock': 'is-dark',
    'bug': 'is-success',
    'ghost': 'is-dark',
    'steel': 'is-light',
    'fire': 'is-danger',
    'water': 'is-info',
    'grass': 'is-dark',
    'electric': 'is-warning',
    'psychic': 'is-info',
    'ice': 'is-link',
    'dragon': 'is-light',
    'dark': 'is-dark',
    'fairy': 'is-white',
    'unknown': 'is-black',
    'shadow': 'is-dark'
  };

  constructor(private pokemonService: PokemonService, private typeService: TypeService,
              private extractIdFromPokemon: ExtractIdFromPokemon) {
  }

  public makeTypeStat(pokemonId: number): Observable<Map<string, Stat[]>> {
    return this.pokemonService.getById(pokemonId).map(pokemon => {
      return (pokemon.types
        .map(type => <FutureDetailTypeStatTuple>{
          type: type.type.name,
          associatedPokemons: this.typeService.getAllPokemonByType(this.extractIdFromPokemon.extract(type.type))
        }));
    }).flatMap(r => forkJoin(r.map(p => {
      return p.associatedPokemons.map(s => {
        return {name: p.type, associatedPokemons: s};
      });
    })))
      .map(tupleTypePlusallPokemonByTypeArray => {
        const retVal: Map<string, Stat[]> = new Map<string, Stat[]>();
        console.log(tupleTypePlusallPokemonByTypeArray);

        for (const value of tupleTypePlusallPokemonByTypeArray) {
          retVal.set(value.name, this.extractStatForType(value.associatedPokemons));
        }
        return retVal;
      });
  }

  public getColorForType(typeName: string) {
    return DetailService._color[typeName];
  }

  private extractStatForType(pokemonOfType: PokemonWithAllProperties[]) {
    const retVal: Pokemon.Stat[] = pokemonOfType[0].stats;

    retVal.forEach(r => r.base_stat = 0);
    for (const pokemon of pokemonOfType) {
      pokemon.stats.forEach(((value, index) => {
        retVal[index].base_stat += value.base_stat;
      }));
    }
    retVal.forEach(r => r.base_stat /= pokemonOfType.length);

    return retVal;
  }
}
