// packs-card.component.ts
import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PackInfo } from 'src/app/Objects/packs';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { PackPreviewComponent, previewData } from 'src/app/Shared Components/pack/pack-preview/pack-preview.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PacksCardService } from './packs-card.service';

@Component({
  selector: 'app-packs-card',
  templateUrl: './packs-card.component.html',
  styleUrls: ['./packs-card.component.css']
})
export class PacksCardComponent implements OnInit, OnDestroy {
  @Input() backgroundColor: string;
  @Input() packInfo: PackInfo;
  fav: boolean = false;
  initialLikeCounter: number = 0;
  isFavCard: boolean = false;
  private cardOpenSubscription: Subscription;

  constructor(
    public langDirectionService: LangDirectionService,
    private userAuthService: UserAuthService,
    public dialog: MatDialog,
    private cardStateService: PacksCardService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.initialLikeCounter = this.packInfo.likesCounter;
  }

  ngOnDestroy(): void {
    if (this.cardOpenSubscription) {
      this.cardOpenSubscription.unsubscribe();
    }
  }

  addRemoveFavorite(): void {
    if (!this.fav) {
      this.packInfo.likesCounter += 1;
    }
    this.userAuthService.addRemoveFavorite(this.packInfo.id);
  }

  openPreviewDialog(event:any): void {
    console.log(event)
    // Check if any card is currently open
    this.cardStateService.getCardOpenState().pipe(take(1)).subscribe(isOpen => {
      if (!isOpen) {
        this.cardStateService.setCardOpen(true);
        setTimeout(() => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.panelClass = 'packs-card-preview';
          dialogConfig.autoFocus = true;
          dialogConfig.maxWidth = '600px';
          dialogConfig.maxHeight = '650px';
    
         dialogConfig.position = this.getDialogPosition(event)
       
          const data: previewData = { pack: this.packInfo, showButtons: false };
          dialogConfig.data = data;

          const dialogRef = this.dialog.open(PackPreviewComponent, dialogConfig);
          const dialogSub = dialogRef.afterClosed().subscribe(() => {
            dialogSub.unsubscribe();
            this.cardStateService.setCardOpen(false);
          });
        }, 1500);
      }
    });
  }



  private getDialogPosition(event:any): { top: string; left: string } {
    const rect = event.srcElement.getBoundingClientRect();
    const dialogWidth = 300; // estimated width of your dialog, adjust as needed
    const dialogHeight = 350; // estimated height of your dialog, adjust as needed

    let top = rect.top - dialogHeight;
    let left = rect.left;

    // Adjust if the dialog goes out of the viewport
    if (top < 0) {
      top = rect.bottom; // Position below the element if it goes above the viewport
    }
    if (left + dialogWidth > window.innerWidth) {
      left = (window.innerWidth - dialogWidth) ; // Adjust to fit within the viewport width
    }
    if (left < 0) {
      left = 0; // Ensure it doesn't go beyond the left edge of the viewport
    }

    return {
      top: `${top}px`,
      left: `${left-150}px`
    };
   
  }
}