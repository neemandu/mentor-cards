import { Component, OnInit } from '@angular/core';
import { APIService } from './API.service';
import { CardsPack } from '../types/cardsPacks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'mentor-cards';

  cardsPacks: Array<CardsPack>;
  randomPackId: string;
  randomCardPack: CardsPack;

  constructor(private api: APIService) { }

  async ngOnInit() {
    /* fetch cards when app loads */
    await this.api.ListCardsPacks().then(event => {
      this.cardsPacks = event.items;
      this.randomPackId = event.items[1].id;
    });

    await this.api.GetCardsPack(this.randomPackId).then(event => {
      this.randomCardPack = event;
    });
  }
}
