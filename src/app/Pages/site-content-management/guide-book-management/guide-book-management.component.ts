import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { APIService, UpdateCardsPackInput } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { GuideBook, GuideBookElement, PackContent } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { NewEditNewsComponent, newEditObject } from 'src/app/Shared Components/Dialogs/new-edit-news/new-edit-news.component';

interface GuideBookPack {
  id: string,
  name: string,
  guideBook: GuideBook
}

@Component({
  selector: 'app-guide-book-management',
  templateUrl: './guide-book-management.component.html',
  styleUrls: ['./guide-book-management.component.css']
})
export class GuideBookManagementComponent implements OnInit, OnDestroy {

  allPacks: GuideBookPack[] = [];
  selectedPack: GuideBookPack;
  selectedIndex: number;
  changesMade: boolean = false;
  Subscription: Subscription = new Subscription();

  constructor(private cardsService: CardsService, public dialog: MatDialog,
    private api: APIService, private overlaySpinnerService: OverlaySpinnerService) { }

  ngOnInit(): void {
    this.getAllPacks();
  }

  /**
   * Retrive all packs
   */
  getAllPacks(): void {
    if (this.cardsService.allPacks) {
      this.allPacks = this.cardsService.allPacks.map(pack => ({
        name: pack.name,
        id: pack.id,
        guideBook: pack.guideBook
      }));
      // console.log("file: guide-book-management.component.ts ~ line 26 ~ getAllPacks ~ this.allPacks", this.allPacks)
    } else {
      this.Subscription.add(this.cardsService.allPacksReadyEmmiter.subscribe(() => {
        // sub.unsubscribe();
        this.allPacks = this.cardsService.allPacks.map(pack => ({
          name: pack.name,
          id: pack.id,
          guideBook: pack.guideBook
        }));
        // console.log("file: guide-book-management.component.ts ~ line 32 ~ sub ~ this.allPacks", this.allPacks)
      }));
      this.cardsService.getAllPacks();
    }
  }

  changePackSelected(selectedPack: PackContent): void {
    if (this.changesMade) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = new DynamicDialogData("שמירה?", ["האם לשמור שינויים לפי מעבר לערכה אחרת?"], "אישור", "ביטול")
      const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
      var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
        dialogSub.unsubscribe();
        if (res) {
          this.saveChanges((selectedPack: PackContent) => {
            this.selectedIndex = this.allPacks.findIndex(pack => pack.name === selectedPack.name);
            this.selectedPack = JSON.parse(JSON.stringify(selectedPack));
            this.changesMade = false;
          });
        } else {
          this.selectedIndex = this.allPacks.findIndex(pack => pack.name === selectedPack.name);
          this.selectedPack = JSON.parse(JSON.stringify(selectedPack));
          this.changesMade = false;
        }
      });
    } else {
      this.selectedIndex = this.allPacks.findIndex(pack => pack.name === selectedPack.name);
      this.selectedPack = JSON.parse(JSON.stringify(selectedPack));
    }
    console.log("file: guide-book-management.component.ts ~ line 61 ~ this.saveChanges ~ this.selectedPack", this.selectedPack)
  }

  removeElement(index: number, listOfEl: GuideBookElement[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("מחיקת שורה", ["האם למחוק שורה זו? אם מדובר בנושא, כל מה שבתוכו ימחק"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (res) {
        listOfEl.splice(index, 1)
        this.changesMade = true;
      }
    });
  }

  editElement(listOfEl: GuideBookElement[], index?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    let dataForModal: newEditObject = {
      value: listOfEl[index],
      valueFieldName: 'name'
    }
    dialogConfig.data = dataForModal;
    const dialogRef = this.dialog.open(NewEditNewsComponent, dialogConfig);
    var sub = dialogRef.afterClosed().subscribe((newElementValue: any) => {
      sub.unsubscribe();
      if (newElementValue) {
        this.changesMade = true;
        listOfEl[index].name = newElementValue;
      }
    });
  }

  addElement(listOfEl: GuideBookElement[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    const dialogRef = this.dialog.open(NewEditNewsComponent, dialogConfig);
    var sub = dialogRef.afterClosed().subscribe((newElementValue: any) => {
      sub.unsubscribe();
      if (newElementValue) {
        this.changesMade = true;
        listOfEl.push(new GuideBookElement(newElementValue, []));
      }
    });
  }

  saveChanges(cb?): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    let input: UpdateCardsPackInput = {
      id: this.selectedPack.id,
      guideBook: this.selectedPack.guideBook
    }
    this.api.UpdateCardsPack(input).then(res => {
      this.cardsService.setPackAfterChanges(this.selectedIndex, res);
      this.allPacks[this.selectedIndex].guideBook = this.selectedPack.guideBook;
      if (cb)
        cb();
      this.changesMade = false;
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.cardsService._snackBar.open('ספר הדרכה נשמר בהצלחה', '', {
        duration: 3000,
        panelClass: ['rtl-snackbar']
      });
    }).catch(err => {
      console.log("file: guide-book-management.component.ts ~ line 150 ~ this.api.UpdateCardsPack ~ err", err)
      this.overlaySpinnerService.changeOverlaySpinner(false);
    })
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
