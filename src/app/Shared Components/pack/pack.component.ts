import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PackInfo } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { AboutAuthorComponent } from './about-author/about-author.component';
import { PackPreviewComponent, previewData } from './pack-preview/pack-preview.component';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css'],
})
export class PackComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();

  @Input() packInfo: PackInfo;
  @Input() orgName: string;
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() packChange: EventEmitter<any> = new EventEmitter<any>();
  fav: boolean = false;

  constructor(private cardsService: CardsService, public dialog: MatDialog) { }

  ngOnInit() {
    // console.log("packInfo", this.packInfo)
    this.Subscription.add(this.cardsService.favoriteChangeEmmiter.subscribe((favorites: string[]) => {
      this.fav = favorites.includes(this.packInfo.id)
    }));
    this.fav = this.cardsService.isFavorite(this.packInfo.id);

  }

  addRemoveFavorite(): void {
    this.fav = this.cardsService.addRemoveFavorite(this.packInfo.id)
    // this.favoriteChangedEmmiter.emit();
  }

  imgLoaded(): any {
    this.loaded.emit();
  }

  // getBorderColor(): string {
  //   return this.cardsService.getCategoryColor(this.packInfo.categories[0]);
  // }

  get isStillFree() {
    return new Date() < new Date(this.packInfo.freeUntilDate);
  }

  get freeUntilDate() {//TODO
    return new Date(this.packInfo.freeUntilDate).toLocaleDateString('he-IL');
  }

  openPreviewDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '85vw';
    dialogConfig.maxHeight = '90vh';
    const data: previewData = { 'pack': this.packInfo, 'showButtons': false };
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(PackPreviewComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.packChange.emit();
      }
    });
  }

  // openAboutDialog(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.maxWidth = '30vw';
  //   dialogConfig.data = this.packInfo;
  //   this.dialog.open(AboutAuthorComponent, dialogConfig);
  // }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
