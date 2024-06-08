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

  videos = [
    {
        src: '/assets/New/home-page/videos/how-to-use-1.mp4',
        thumbnail: '/assets/New/home-page/how-to-use-1.png',
        isPlaying: false
    },
    {
        src: '/assets/New/home-page/videos/how-to-use-2.mp4',
        thumbnail: '/assets/New/home-page/how-to-use-2.png',
        isPlaying: false
    },
    {
        src: '/assets/New/home-page/videos/how-to-use-3.mp4',
        thumbnail: '/assets/New/home-page/how-to-use-3.png',
        isPlaying: false
    }
];

playVideo(video) {
    video.isPlaying = true;
}

}
