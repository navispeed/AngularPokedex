import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PokemonService} from 'app/services/pokemon.service';
import Pokemon = GetAllPokemonNames.Pokemon;
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import 'rxjs/add/operator/filter';

@Injectable()
export class SearchService {

  constructor(private pokemonService: PokemonService) {
  }

  public search(query: String): Observable<any> {
    return this.pokemonService.getPokemonNameList().filter(this.match.bind(this, query));
  }

  private match(query: String, pokemon: Pokemon | PokemonWithAllProperties): boolean {
    const filterValue = query.toLowerCase();

    return pokemon.name.toLowerCase().indexOf(filterValue) === 0;
  }
}
