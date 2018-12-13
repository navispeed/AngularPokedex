import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) {
  }

  public extractDescription(specie: Species.RootObject, language: string): string {
    return specie.flavor_text_entries.filter(f => f.language.name === language)[0].flavor_text;
  }

  public getSpecie(specie: Pokemon.Specie): Observable<Species.RootObject> {
    return this.http.get(specie.url).map((r: Species.RootObject) => r);
  }
}
