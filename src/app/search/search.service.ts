import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PokemonService} from 'app/services/pokemon.service';
import Pokemon = GetAllPokemonNames.Pokemon;
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import 'rxjs/add/operator/filter';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {of} from 'rxjs/observable/of';


@Injectable()
export class SearchService {

  constructor(private pokemonService: PokemonService) {
  }

  public search(query: String): Observable<PokemonWithAllProperties[]> {
    if (!query) {
      return of([]);
    }
    return this.pokemonService.getPokemonNameList()
      .map(results => results.results)
      .map(allPokemons => allPokemons.filter(this.match.bind(this, query)))
      .flatMap(allPokemonFiltered => forkJoin(allPokemonFiltered
        .map(pokemon => this.pokemonService.getById(this.pokemonService.extractIdFromPokemon(pokemon)))));
  }

  private match(query: String, pokemon: Pokemon | PokemonWithAllProperties): boolean {
    const filterValue = query.toLowerCase();

    return pokemon.name.toLowerCase().indexOf(filterValue) === 0;
  }
}
