import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from 'app/services/pokemon.service';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import {StatsService} from 'app/services/stats.service';
import {TypeService} from 'app/services/type.service';
import {DetailService} from 'app/search/detail/detail.service';
import 'rxjs-compat/add/observable/empty';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService, StatsService, TypeService]
})
export class DetailComponent implements OnInit {
  public pokemon: PokemonWithAllProperties;
  public pokemonTypeStat: [string, Pokemon.Stat[]][];
  private id: number;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private detailService: DetailService) {
    this.route.queryParams.flatMap(() => {
      this.id = parseInt(this.route.snapshot.params['id'], 10);
       detailService.makeTypeStat(this.id).subscribe(r => this.pokemonTypeStat = Array.from(r.entries()));
      return pokemonService.getById(this.id);
    }).subscribe(pokemon => this.pokemon = pokemon);
  }

  ngOnInit() {}

  public generateClassForType(name: string): string {
    return 'tag ' + this.detailService.getColorForType(name);
  }

  public formatPokemonStat()

}
