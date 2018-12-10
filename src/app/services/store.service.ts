import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private pokemonStore: Map<number, Pokemon.PokemonWithAllProperties> = new Map<number, Pokemon.PokemonWithAllProperties>();
  private typeStore: Map<number, Array<number>> = new Map<number, Array<number>>();

  constructor() {
  }

  public saveTypeResult(typeId: number, associatedPokemon: Array<number>): void {
    this.typeStore.set(typeId, associatedPokemon);
  }

  public loadTypeResult(typeId: number): Array<number> {
    return this.typeStore.get(typeId) || [];
  }

  public savePokemonById(id: number, pokemon: Pokemon.PokemonWithAllProperties) {
    this.pokemonStore.set(id, pokemon);
  }

  public getOrElseGetByPokemonId(id: number, defaultValue: () => Observable<Pokemon.PokemonWithAllProperties>)
    : Observable<Pokemon.PokemonWithAllProperties> {
    const retVal: Pokemon.PokemonWithAllProperties = this.pokemonStore.get(id);
    if (retVal) {
      console.log('recupéré du cache :', id, retVal);
    }
    return retVal ? of(retVal) : defaultValue();
  }

  public save(): Observable<void> {
    return new Observable(subscriber => {
      const value = Array.from(this.pokemonStore.entries());
      for (let i = 0; i < value.length && i < 9; ++i) {
        i += 20;
        sessionStorage.setItem('pokemonStore' + parseInt((i / 20).toString(10), 10), JSON.stringify(value.slice(i, i + 20)));
      }
      // console.log(JSON.stringify(Array.from(this.pokemonStore.entries())).length);
      sessionStorage.setItem('typeStore', JSON.stringify(Array.from(this.typeStore.entries())));
      subscriber.complete();
    });
  }


  public load() {
    return new Observable(subscriber => {
      let tab = [];
      for (let i = 0; ; ++i) {
        const item = sessionStorage.getItem('pokemonStore' + i);
        if (item === null) {
          break;
        }
        console.log(item);
        tab = tab.concat(JSON.parse(item));
      }
      this.pokemonStore = new Map<number, Pokemon.PokemonWithAllProperties>(tab);
      this.typeStore = new Map<number, Array<number>>(JSON.parse(sessionStorage.getItem('typeStore')));
      subscriber.complete();
    });
  }

}
