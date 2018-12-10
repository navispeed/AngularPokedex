import {Component, OnInit} from '@angular/core';
import {PokemonService} from 'app/services/pokemon.service';
import {StoreService} from 'app/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private pokemonService: PokemonService, private storeService: StoreService) {

  }

  ngOnInit(): void {
    // this.storeService.load().subscribe(() => this.pokemonService.downloadAll().subscribe(() => console.log('Telechargement ok')));
    this.storeService.load().subscribe(() => 0);
  }
}
