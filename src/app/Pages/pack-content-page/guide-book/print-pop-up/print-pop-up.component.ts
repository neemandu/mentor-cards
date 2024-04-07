import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuideBookElement, PackContent } from 'src/app/Objects/packs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/Services/data-service.service';
import { PopoutData } from 'src/app/Services/popout.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { DynamicPrintService } from 'src/app/Services/dynamic-print.service';

@Component({
  selector: 'app-print-pop-up',
  templateUrl: './print-pop-up.component.html',
  styleUrls: ['./print-pop-up.component.css']
})
export class PrintPopUpComponent implements OnInit {

  guideBook: GuideBookElement[];
  packName: string;
  packDesc: string;
  title: string;
  imgUrl: string;
  isError: boolean = false;
  data: PopoutData;


  constructor(private router: Router,
    private overlaySpinnerService: OverlaySpinnerService,
    private mixpanelService: MixpanelService,
    private printPdfService: DynamicPrintService,
    private dataService: DataService,
    private dialog: MatDialog,
    private http: HttpClient) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    const navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      console.log('Data:', data);
      this.data = data;
      if (this.data.guideBook) {
        this.title = 'ספר הדרכה';
        this.guideBook = this.data.guideBook;
        this.packName = this.data.packName;
        this.packDesc = this.data.packDesc;
        this.imgUrl = this.data.imgUrl;
      } else {
        this.guideBook = new Array<GuideBookElement>();
        this.title = 'ספר הדרכה לדוגמא';
        this.packName = 'ערכה לדוגמא';
        this.packDesc =
          'כל ערכת קלפים באתר מגיעה עם ספר הדרכה ייעודי הכולל עשרות שאלות מנחות וטכניקות עבודה מומלצות. \r\n' +
          'המגוון עצום - תמיד יהיה לכם מה לשאול!  \r\n' +
          'ספרי ההדרכה שלנו מותאמים לעבודה אחד על אחד, לעבודה ארגונית, ולעבודה קבוצתית. \r\n' +
          'הרשמו ותהנו מהשפע! :)';
      }
  } else {
    console.log(' error in data fetching')
  }
}

  accordion(subjectRef, subjectDivRef): void {
    /* Toggle between hiding and showing the active panel */
    var panel = subjectRef.nextElementSibling;
    if (panel.style.maxHeight !== '0px') {
      panel.style.maxHeight = '0px';
      panel.style.padding = '0vh 0vw';
      subjectDivRef.style.marginTop = '0vh';
    } else {
      panel.style.maxHeight = '1000%';
      panel.style.padding = '1vh 0vw';
      subjectDivRef.style.marginTop = '2vh';
    }
  }


  printPdf(): void {
    this.mixpanelService.track('ButtonClicked', { Name: 'Print GuideBook' });
    let html_url = '/assets/htmlTemplates/guidebook.html';
    console.log('Print Guidebook in new window 2');
    this.http.get(html_url, { responseType: 'text' }).subscribe(template => {
      let filledTemplate = template;
      filledTemplate = filledTemplate.replace(new RegExp(`{{name}}`, 'g'), this.packName);
      filledTemplate = filledTemplate.replace(new RegExp(`{{description}}`, 'g'), this.packDesc);
      filledTemplate = filledTemplate.replace(new RegExp(`{{imgUrl}}`, 'g'), this.imgUrl);
      let guidbookHtml = this.generateGuideBookHtml(this.guideBook);
      filledTemplate = filledTemplate.replace(new RegExp(`{{guidebook}}`, 'g'), guidbookHtml);
      const printWindow = window.open('', '_blank');
      printWindow.document.write(filledTemplate);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    });
  }




  // printPdf(): void {
  //   console.log('Print Guidebook in new window');
  //   // const printWindow = window.open('', '_blank');
  //   const newWindow = window.open('', '_blank');
  //   if (newWindow.print() === null || typeof newWindow.print() === 'undefined') {
  //     newWindow.close();
  //     console.log('Popup blocked');
  //     this.isError = true;
  //     this.dialog.open(PopupDialogComponent);
  //   } else {

  //     this.isError = false;
  //     this.mixpanelService.track('ButtonClicked', { Name: 'Print GuideBook' });
  //     console.log('Print Guidebook');
  //     let html_url = '/assets/htmlTemplates/guidebook.html';
  //     if (newWindow) {
  //       newWindow.close();
  //       console.log('Print Guidebook in new window 2');
  //       // this.printPdfService.printHtmlContent(
  //       //   html_url,
  //       //   this.packName,
  //       //   this.packDesc,
  //       //   this.guideBook,
  //       //   this.imgUrl,
  //       // );
  //       try{
  //         // debugger
  //         this.http.get(html_url, { responseType: 'text' }).subscribe(template => {
  //         let filledTemplate = template;
  //         filledTemplate = filledTemplate.replace(new RegExp(`{{name}}`, 'g'), this.packName);
  //         filledTemplate = filledTemplate.replace(new RegExp(`{{description}}`, 'g'), this.packDesc);
  //         filledTemplate = filledTemplate.replace(new RegExp(`{{imgUrl}}`, 'g'), this.imgUrl);
  //         let guidbookHtml = this.generateGuideBookHtml(this.guideBook);
  //         filledTemplate = filledTemplate.replace(new RegExp(`{{guidebook}}`, 'g'), guidbookHtml);
  //         const printWindow = window.open('', '_blank');
  //         console.log('Print Guidebook in new window')
  //         printWindow.document.write(filledTemplate);
  //         printWindow.document.close(); 
  //         printWindow.focus(); 

  //         setTimeout(() => {
  //           printWindow.print();
  //           printWindow.close();
  //         }, 250);
  //       });
  //       }catch(err){
  //           console.log(err);
  //       }
  //     }
  //   } 
  // }


  // printPdf(): void {
  //   console.log('Print Guidebook in new window');
  //   const newWindow = window.open('', '_blank');
  //   if (newWindow) {
  //     newWindow.close();
  //     this.isError = false;
  //     this.mixpanelService.track('ButtonClicked', { Name: 'Print GuideBook' });
  //     console.log('Print Guidebook');
  //     let html_url = '/assets/htmlTemplates/guidebook.html';
  //     this.printPdfService.printHtmlContent(
  //       html_url,
  //       this.packName,
  //       this.packDesc,
  //       this.guideBook,
  //       this.imgUrl,
  //     );
  //   } else {
  //     console.log('Popup blocked');
  //     this.isError = true;
  //     this.dialog.open(PopupDialogComponent);
  //   }
  // }

  generateGuideBookHtml(guideBook): string {
    return this.processGuidebookElement(guideBook, 0, []);
  }

  processGuidebookElement(elements, depth = 0, numbers = []): string {
    let htmlContent = '';
    elements.forEach((element, index) => {
      const currentNumbers = [...numbers, index + 1];
      const numberStr = currentNumbers.join(".");
      const indent = depth * 20; // Increase indentation by 20px for each level

      // Remove the specified string from element name if exists and apply numbering
      const elementName = element.name.replace("לפתיחה לחצו כאן", "");
      if (depth === 0) {
        htmlContent += `<h2 style="margin-right:${indent}px;"><b>${numberStr} ${elementName}</b></h2>`;
      } else if (depth === 1) {
        htmlContent += `<p style="margin-right:${indent}px;">${numberStr} ${elementName}</p>`;
      } else {
        htmlContent += `<p style="margin-right:${indent}px;">${numberStr} ${elementName}</p>`;
      }

      // Process sub-elements if any, increasing the depth and passing the current numbering path
      if ('subElements' in element && element.subElements) {
        htmlContent += this.processGuidebookElement(element.subElements, depth + 1, currentNumbers);
      }
    });
    return htmlContent;
  }

}

@Component({
  selector: 'app-popup-dialog',
  template: `<h1 mat-dialog-title>חסימת חלונות קופצים</h1>
    <div mat-dialog-content>אנא אפשר חלונות קופצים עבור אתר זה</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">אישור</button>
    </div>`,
})
export class PopupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

