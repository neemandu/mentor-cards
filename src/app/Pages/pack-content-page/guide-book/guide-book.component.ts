import { Component, Inject, OnInit } from '@angular/core';
import { GuideBook } from 'src/app/Objects/packs';
import { PopoutData, POPOUT_MODAL_DATA } from 'src/app/Services/popout.service';

@Component({
  selector: 'app-guide-book',
  templateUrl: './guide-book.component.html',
  styleUrls: ['./guide-book.component.css']
})
export class GuideBookComponent implements OnInit {

  panelOpenState = false;
  guideBook: GuideBook;
  packName: string;

  constructor(
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData
  ) { }

  ngOnInit(): void {
    this.guideBook = this.data.guideBook;
    this.packName = this.data.packName;
    // console.log(this.data.guideBook)
  }

}
