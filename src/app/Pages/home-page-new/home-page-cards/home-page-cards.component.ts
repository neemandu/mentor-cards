import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-cards',
  templateUrl: './home-page-cards.component.html',
  styleUrls: ['./home-page-cards.component.css']
})
export class HomePageCardsComponent implements OnInit {

  cardsList = [
    {title: 'Card 1', content: 'הכרות וחיבור', image: '/assets/New/home-page/cards/1.svg'},
    {title: 'Card 2', content: 'מערכות יחסים', image: '/assets/New/home-page/cards/2.svg'},
    {title: 'Card 3', content: 'ילדים ונוער', image: '/assets/New/home-page/cards/3.svg'},
    {title: 'Card 4', content: 'חיבור לעצמי', image: '/assets/New/home-page/cards/4.svg'},
    {title: 'Card 5', content: 'מנהיגות', image: '/assets/New/home-page/cards/5.svg'},
    {title: 'Card 6', content: 'חזון ומטרות', image: '/assets/New/home-page/cards/6.svg'},
    {title: 'Card 7', content: 'העצמה ', image: '/assets/New/home-page/cards/7.svg'},
    {title: 'Card 8', content: 'חגים', image: '/assets/New/home-page/cards/8.svg'},
    {title: 'Card 9', content: 'קריירה', image: '/assets/New/home-page/cards/9.svg'},
    {title: 'Card 10', content: 'רגשות', image: '/assets/New/home-page/cards/10.svg'},
    {title: 'Card 11', content: 'משברים', image: '/assets/New/home-page/cards/11.svg'},
    {title: 'Card 12', content: 'לכל הערכות', image: '/assets/New/home-page/cards/12.svg'},
  ]

  constructor() { }

  ngOnInit(): void {
  }



}
