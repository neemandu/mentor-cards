import { Component, Inject, OnInit } from '@angular/core';
import { GuideBook } from 'src/app/Objects/packs';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
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
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData,
    private overlaySpinnerService: OverlaySpinnerService
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    this.guideBook = this.data.guideBook;
    this.packName = this.data.packName;
  }
}
