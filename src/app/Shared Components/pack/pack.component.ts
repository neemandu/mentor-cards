import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PackInfo } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { PackPreviewComponent } from './pack-preview/pack-preview.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css'],
})
export class PackComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();

  @Input() packInfo: PackInfo;
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
  fav: boolean = false;

  constructor(private cardsService: CardsService, public dialog: MatDialog) { }

  ngOnInit() {
    // console.log("packInfo", this.packInfo)
    this.Subscription.add(this.cardsService.favoriteChangeEmmiter.subscribe((favorites: string[]) => {
      this.fav = favorites.includes(this.packInfo.id)
    }));
    this.fav = this.cardsService.isFavorite(this.packInfo.id)
  }

  addRemoveFavorite(): void {
    this.fav = this.cardsService.addRemoveFavorite(this.packInfo.id)
  }

  imgLoaded(): any {
    this.loaded.emit();
  }

  // openPreviewBottomSheet(): void {
  //   this._bottomSheet.open(PackPreviewComponent, {
  //     data: {'packInfo': this.packInfo}
  //   });
  // }

  openPreviewDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.packInfo;
    const dialogRef = this.dialog.open(PackPreviewComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
