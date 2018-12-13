import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from 'app/services/pokemon.service';
import {StatsService} from 'app/services/stats.service';
import {TypeService} from 'app/services/type.service';
import {DetailService} from 'app/search/detail/detail.service';
import 'rxjs-compat/add/observable/empty';
import {CharacteristicService} from 'app/search/detail/characteristic.service';
import PokemonWithAllProperties = Pokemon.PokemonWithAllProperties;
import {SpeciesService} from 'app/search/detail/species.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService, StatsService, TypeService, SpeciesService]
})
export class DetailComponent implements OnInit {
  public pokemon: PokemonWithAllProperties;
  public pokemonTypeStat: [string, Pokemon.Stat[]][];
  public description: string;
  private id: number;

  constructor(private route: ActivatedRoute,
              private pokemonService: PokemonService,
              private detailService: DetailService,
              private speciesService: SpeciesService) {
    this.route.queryParams.flatMap(() => {
      this.id = parseInt(this.route.snapshot.params['id'], 10);
      detailService.makeTypeStat(this.id).subscribe(r => {
        this.pokemonTypeStat = Array.from(r.entries());
        console.log('Stat: ', this.pokemonTypeStat);
      });
      return pokemonService.getById(this.id);
    }).subscribe(this.onReceivePokemon.bind(this));
  }

  ngOnInit() {
  }

  public generateClassForType(name: string): string {
    return 'tag ' + this.detailService.getColorForType(name);
  }

  private onReceivePokemon(pokemon: PokemonWithAllProperties) {
    this.pokemon = pokemon;
    this.speciesService.getSpecie(pokemon.species).map(specie => this.speciesService.extractDescription(specie, 'en'))
      .subscribe(result => this.description = result);
  }
}
