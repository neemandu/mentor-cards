import { Component, Inject, OnInit } from '@angular/core';
import { GuideBookElement, PackContent } from 'src/app/Objects/packs';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { PopoutData, POPOUT_MODAL_DATA } from 'src/app/Services/popout.service';
import { DynamicPrintService } from 'src/app/Services/dynamic-print.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';

@Component({
  selector: 'app-guide-book',
  templateUrl: './guide-book.component.html',
  styleUrls: ['./guide-book.component.css']
})
export class GuideBookComponent implements OnInit {

  guideBook: GuideBookElement[];
  packName: string;
  packDesc: string;
  title: string;
  imgUrl: string;

  constructor(
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData,
    private overlaySpinnerService: OverlaySpinnerService,
    private mixpanelService: MixpanelService,
    private printPdfService: DynamicPrintService
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    // debugger
    if (this.data.guideBook) {
      this.title = "ספר הדרכה"
      this.guideBook = this.data.guideBook;
      this.packName = this.data.packName;
      this.packDesc = this.data.packDesc;
      this.imgUrl = this.data.imgUrl;
    }
    else {
      this.guideBook = new Array<GuideBookElement>();
      this.title = "ספר הדרכה לדוגמא";
      this.packName = "ערכה לדוגמא";
      this.packDesc = "כל ערכת קלפים באתר מגיעה עם ספר הדרכה ייעודי הכולל עשרות שאלות מנחות וטכניקות עבודה מומלצות. \r\n"+
                      "המגוון עצום - תמיד יהיה לכם מה לשאול!  \r\n"+
                      "ספרי ההדרכה שלנו מותאמים לעבודה אחד על אחד, לעבודה ארגונית, ולעבודה קבוצתית. \r\n"+
                      "הרשמו ותהנו מהשפע! :)";
    }
  }

  accordion(subjectRef, subjectDivRef): void {
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

  printPdf(): void {
    this.mixpanelService.track("ButtonClicked", { "Name": "Print GuideBook"});
    let html_url = '/assets/htmlTemplates/guidebook.html'
    this.printPdfService.printHtmlContent(html_url, this.packName, this.packDesc, this.guideBook, this.imgUrl);
  }
}
