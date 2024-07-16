import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PackInfo } from 'src/app/Objects/packs';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { PackPreviewComponent, previewData } from 'src/app/Shared Components/pack/pack-preview/pack-preview.component';

@Component({
  selector: 'app-packs-card',
  templateUrl: './packs-card.component.html',
  styleUrls: ['./packs-card.component.css']
})
export class PacksCardComponent implements OnInit {

  constructor(public langDirectionService: LangDirectionService,
     private userAuthService: UserAuthService,
     public dialog: MatDialog,
    ) { }

  @Input() backgroundColor: string;
  @Input() packInfo: PackInfo;
  fav: boolean = false;
  initialLikeCounter: number = 0;
  isFavCard: boolean = false;

  ngOnInit(): void {
    this.initialLikeCounter = this.packInfo.likesCounter;
  }

  addRemoveFavorite(): void {
    if (!this.fav) {
      this.packInfo.likesCounter += 1;
    }
    this.userAuthService.addRemoveFavorite(this.packInfo.id);
  }

  openPreviewDialog(): void {
    // todo add wait time
    setTimeout(() => {
      // Place the code that should execute after the wait here
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
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
    }, 600);
  }


}
