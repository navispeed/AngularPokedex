import {Component, OnInit} from '@angular/core';
import {PokemonService} from 'app/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
  }
}
