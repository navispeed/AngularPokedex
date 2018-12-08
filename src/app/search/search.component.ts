import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private query = 'p';

  constructor() {
  }

  ngOnInit() {
  }

  public updateResult(query: string): void {
    this.query = query;
  }

}
