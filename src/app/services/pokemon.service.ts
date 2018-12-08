import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/mergeMap';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {HttpClient} from '@angular/common/http';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  public downloadAll(): Observable<any> {
    const observable = this.getPokemonNameList()
      .flatMap(pokemons =>
        forkJoin(pokemons.results.map(pokemon => this.getById(this.extractIdFromPokemon(pokemon)))))
      .share();
    observable.subscribe(c => console.log('Download all :', c));
    return observable;
  }

  public getById(id: number): Observable<PokemonWithAllProperties> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).map((r: PokemonWithAllProperties) => r);
  }

  public getPokemonNameList(limit = false): Observable<GetAllPokemonNames.RootObject> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/').map((r: GetAllPokemonNames.RootObject) => {
      r.results.sort((a, b) => a.name.localeCompare(b.name));
      if (limit) {
        r.results = r.results.slice(0, environment.maxResultPerQuery);
      }
      return r;
    });
  }

  private extractIdFromPokemon(pokemon: GetAllPokemonNames.Pokemon): number {
    return parseInt(pokemon.url.match(/.+\/(\d+)\//)[1], 10);
  }
}
