import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  pokemonSaved: Set<number> = new Set();

  constructor() {
    this.pokemonSaved = new Set<number>(JSON.parse(sessionStorage.getItem('bookmark')));
  }

  public savePokemon(idPokemon: number): void {
    this.pokemonSaved.add(idPokemon);
    sessionStorage.setItem('bookmark', JSON.stringify(Array.from(this.pokemonSaved)));
  }

  public isSaved(idPokemon: number): boolean {
    return this.pokemonSaved.has(idPokemon);
  }

  public removePokemon(idPokemon: number): void {
    this.pokemonSaved.delete(idPokemon);
    sessionStorage.setItem('bookmark', JSON.stringify(Array.from(this.pokemonSaved)));
  }

  public toogle(idPokemon: number) {
    if (this.isSaved(idPokemon)) {
      this.removePokemon(idPokemon);
    } else {
      this.savePokemon(idPokemon);
    }
  }

  public loadPokemon(): Set<number> {
    return this.pokemonSaved;
  }
}
