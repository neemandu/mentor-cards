import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PackInfo } from 'src/app/Objects/packs';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import {
  PackPreviewComponent,
  previewData,
} from './pack-preview/pack-preview.component';

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
  // @Output() packChange: EventEmitter<any> = new EventEmitter<any>();
  fav: boolean = false;
  isSubscriber: boolean = false;

  constructor(
    public dialog: MatDialog,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    this.Subscription.add(
      this.userAuthService.favoritesChangeEmmiter.subscribe(
        (favorites: number[]) => {
          this.fav = favorites.includes(parseInt(this.packInfo.id));
        }
      )
    );
    this.fav = this.userAuthService.favorites?.includes(
      parseInt(this.packInfo.id)
    );
    this.isSubscriber = this.userAuthService.userData.status === 'PLAN';
  }

  addRemoveFavorite(): void {
    if (!this.fav) {
      this.packInfo.likesCounter += 1;
    }
    this.userAuthService.addRemoveFavorite(this.packInfo.id);
  }

  imgLoaded(): any {
    this.loaded.emit();
  }

  get isStillFree() {
    return new Date() < new Date(this.packInfo.freeUntilDate);
  }

  get freeUntilDate() {
    //TODO
    return new Date(this.packInfo.freeUntilDate).toLocaleDateString('he-IL');
  }

  openPreviewDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '85vw';
    dialogConfig.maxHeight = '95vh';
    const data: previewData = { pack: this.packInfo, showButtons: false };
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(PackPreviewComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res) => {
      dialogSub.unsubscribe();
      // if (res) {
      //   this.packChange.emit();
      // }
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
