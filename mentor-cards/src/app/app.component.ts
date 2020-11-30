import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from './API.service';
import { Card } from '../types/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mentor-cards';
  public createForm: FormGroup;
  cards: Array<Card>;

  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    /*this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required]
    });
    this.api.ListCards().then(event => {
      this.cards = event.items;
    });

  this.api.OnCreateCardListener.subscribe( (event: any) => {
    const newCard = event.value.data.onCreateCard;
    this.cards = [newCard, ...this.cards];
  });
  }

  public onCreate(card: Card) {
    this.api.CreateCard(card).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating card...', e);
    });*/
  }
}
