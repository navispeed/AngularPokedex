import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private pokemonStore: Map<number, Pokemon.PokemonWithAllProperties> = new Map<number, Pokemon.PokemonWithAllProperties>();

  constructor() {
    this.load();
  }

  public savePokemonById(id: number, pokemon: Pokemon.PokemonWithAllProperties) {
    this.pokemonStore.set(id, pokemon);
  }

  public getOrElseGet(id: number, defaultValue: () => Observable<Pokemon.PokemonWithAllProperties>)
    : Observable<Pokemon.PokemonWithAllProperties> {
    const retVal: Pokemon.PokemonWithAllProperties = this.pokemonStore.get(id);
    return retVal ? of(retVal) : defaultValue();
  }

  public save() {
    sessionStorage.setItem('pokemonStore', JSON.stringify(Array.from(this.pokemonStore.entries())));
  }


  public load() {
    this.pokemonStore = new Map<number, Pokemon.PokemonWithAllProperties>(JSON.parse(sessionStorage.getItem('pokemonStore')));
  }

}
