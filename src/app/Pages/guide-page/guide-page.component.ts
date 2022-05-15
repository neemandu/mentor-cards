import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {
  selectedBtn: number = 1;
  title: string = "מהות העבודה עם קלפים";
  playerWidth: number;
  playerHeight: number;

  constructor() { }

  ngOnInit(): void {
    this.playerWidth = window.innerWidth;
    this.playerHeight = this.playerWidth / 1.78
  }

  selectedTopicChanged(index: number, title: string): void {
    this.title = title;
    this.selectedBtn = index;
  }

}
