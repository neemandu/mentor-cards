import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {
  selectedBtn: number = 1;
  title: string = "מהות העבודה עם קלפים";

  constructor() { }

  ngOnInit(): void {
  }

  selectedTopicChanged(index: number, title: string): void {
    this.title = title;
    this.selectedBtn = index;
  }

}
