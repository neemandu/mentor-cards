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
        src: 'https://master-cards.s3.eu-west-2.amazonaws.com/videos/got+stuck.mp4',
        thumbnail: 'https://master-cards.s3.eu-west-2.amazonaws.com/videos/image1.png',
        isPlaying: false
    },
    {
        src: 'https://master-cards.s3.eu-west-2.amazonaws.com/videos/%D7%A4%D7%A8%D7%A1%D7%95%D7%9E%D7%AA+%D7%9E%D7%A4%D7%97%D7%93%D7%99%D7%9D+%D7%9C%D7%94%D7%99%D7%AA%D7%A7%D7%A2.mov',
        thumbnail: '/assets/New/home-page/how-to-use-2.png',
        isPlaying: false
    },
    {
        src: 'https://master-cards.s3.eu-west-2.amazonaws.com/videos/%D7%A4%D7%A8%D7%A1%D7%95%D7%9E%D7%AA+%D7%A0%D7%AA%D7%A7%D7%A2%D7%AA%D7%9D+%D7%91%D7%90%D7%9E%D7%A6%D7%A2+%D7%94%D7%98%D7%99%D7%A4%D7%95%D7%9C%2B%D7%A1%D7%99%D7%95%D7%A8+%D7%91%D7%90%D7%AA%D7%A8.mov ',
        thumbnail: '/assets/New/home-page/how-to-use-3.png',
        isPlaying: false
    }
];

playVideo(video) {
    video.isPlaying = true;
}

}
