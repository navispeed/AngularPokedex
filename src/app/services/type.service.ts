import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {PokemonService} from 'app/services/pokemon.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import 'rxjs-compat/add/operator/share';
import {StoreService} from 'app/services/store.service';
import {ExtractIdFromPokemon} from 'app/utils/ExtractIdFromURL';
import { of } from 'rxjs';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import 'rxjs-compat/add/operator/mergeMap';
import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient, private pokemonService: PokemonService, private storeService: StoreService,
              private extractIdFromPokemon: ExtractIdFromPokemon) {
  }

  public getAllPokemonByType(typeId: number): Observable<Array<PokemonWithAllProperties>> {
    const allPokemonIdByTypeId = this.getAllPokemonIdByTypeId(typeId);
    return allPokemonIdByTypeId
      .flatMap(arrayOfId => forkJoin(arrayOfId.map(id => this.pokemonService.getById(id))));
  }

  public getAllPokemonIdByTypeId(typeId: number): Observable<Array<number>> {
    const allIdAssociatedToType = this.storeService.loadTypeResult(typeId);
    if (allIdAssociatedToType.length !== 0) {
      return of(allIdAssociatedToType);
    }
    const observable = this.http.get(`https://pokeapi.co/api/v2/type/${typeId}/`)
      .map((result: TypeResult.RootObject) => result)
      .map(type => type.pokemon.map(p => this.extractIdFromPokemon.extract(p.pokemon)))
      .share();
    observable.subscribe(ids => {
      this.storeService.saveTypeResult(typeId, ids);
      this.storeService.save().subscribe();
    });
    return observable;
  }

}
