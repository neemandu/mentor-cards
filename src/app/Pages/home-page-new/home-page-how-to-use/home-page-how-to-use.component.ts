import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-how-to-use',
  templateUrl: './home-page-how-to-use.component.html',
  styleUrls: ['./home-page-how-to-use.component.css']
})
export class HomePageHowToUseComponent implements OnInit {

  imgSrc = ''
  constructor() { }

  ngOnInit(): void {
  }
  
  changeImageSrc(event: any, imageName: string) {
    event.target.src = `/assets/New/home-page/icons/${imageName}-blue.svg`;
  }

  resetImageSrc(event: any, imageName: string) {
    event.target.src = `/assets/New/home-page/icons/${imageName}-pink.svg`;
  }


}
