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

  guideBook: GuideBook;
  packName: string;
  packDesc: string;
<<<<<<< HEAD
=======
  title: string;
>>>>>>> b96cfedd083c2bb73c5c4d9d3a04d341690b530d

  constructor(
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData,
    private overlaySpinnerService: OverlaySpinnerService
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    // debugger
    if(this.data.guideBook){
      this.title = "ספר הדרכה"
      this.guideBook = this.data.guideBook;
      this.packName = this.data.packName;
      this.packDesc = this.data.packDesc;
    }
    else{
      this.guideBook = new GuideBook().setDefault();
<<<<<<< HEAD
      this.packName = "ערכה לדוגמא";
=======
      this.title = "ספר הדרכה לדוגמא"
      this.packName = "ערכה לדוגמא",
>>>>>>> b96cfedd083c2bb73c5c4d9d3a04d341690b530d
      this.packDesc = "תאור ערכה לדוגמא";
    }
  }

  accordion(subjectRef, subjectDivRef): void {
    // debugger
    // console.log("file: guide-book.component.ts ~ line 49 ~ accordion ~ $event", subjectRef)
    /* Toggle between hiding and showing the active panel */
    var panel = subjectRef.nextElementSibling;
    if (panel.style.maxHeight !== "0px") {
      panel.style.maxHeight = "0px";
      panel.style.padding = "0vh 0vw"
      subjectDivRef.style.marginTop = "0vh"
    } else {
      panel.style.maxHeight = "1000%";
      panel.style.padding = "1vh 0vw"
      subjectDivRef.style.marginTop = "2vh"
    }
  }
}
