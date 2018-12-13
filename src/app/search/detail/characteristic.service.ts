import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import RootObject = Characteristic.RootObject;
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {

  constructor(private http: HttpClient) { }

  getDescription(id: number, language: string): Observable<string> {
    return this.http.get(`https://pokeapi.co/api/v2/characteristic/${id}/`)
      .map((res: RootObject) => res)
      .map(res => res.descriptions.filter(description => description.language.name === language)[0])
      .map(description => (description && description.description) || '')
      .catch(() => '')
      ;
  }
}
