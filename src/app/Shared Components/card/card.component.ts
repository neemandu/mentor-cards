import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/Objects/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardContent: Card;
  @Input() selected: boolean = false;
  @Input() index: number;
  @Input() flipped: boolean = true;
  @Output() cardSelectedEmmiter: EventEmitter<any> = new EventEmitter();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onRightClick(): boolean {
    return false;
  }
}

