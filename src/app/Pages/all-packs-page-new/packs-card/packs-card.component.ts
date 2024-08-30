// packs-card.component.ts
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  @ViewChild('targetDiv', { read: ElementRef }) targetDiv!: ElementRef;

  @Input() backgroundColor: string;
  @Input() packInfo: PackInfo;
  fav: boolean = false;
  initialLikeCounter: number = 0;
  isFavCard: boolean = false;
  private cardOpenSubscription: Subscription;
  private hoverTimeout: any;

  constructor(
    public langDirectionService: LangDirectionService,
    private userAuthService: UserAuthService,
    public dialog: MatDialog,
    private cardStateService: PacksCardService
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

  openPreviewDialog(event: any): void {
    const rect = this.targetDiv.nativeElement.getBoundingClientRect();

    // Calculate the center of the div
    const divCenterX = rect.left + rect.width / 2;
    const divCenterY = rect.top + rect.height / 2;
  
    // Assuming the dialog has maxWidth and maxHeight defined as 60vw and 70vh, 
    // we need to calculate the offset to center the dialog over the div
    const dialogMaxWidth = window.innerWidth * 0.6; // 60vw
    const dialogMaxHeight = window.innerHeight * 0.7; // 70vh
  
    // Calculate the top and left to center the dialog over the div
    const dialogPosition: DialogPosition = {
      left: `${divCenterX - dialogMaxWidth / 6.5}px`,
      top: `${divCenterY - dialogMaxHeight / 4}px`
    };

    const isMobile = window.innerWidth <= 768;
    this.hoverTimeout = setTimeout(() => {  
      this.cardStateService.getCardOpenState().pipe(take(1)).subscribe(isOpen => {
        if (!isOpen) {
          this.cardStateService.setCardOpen(true);
          setTimeout(() => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.maxWidth = isMobile ? '90vw' : '480px'
            dialogConfig.maxHeight = isMobile ? '60vh' : '460px'; 
            if ( !isMobile ){
              dialogConfig.position = dialogPosition;
            }
            const data: previewData = { pack: this.packInfo, showButtons: false };
            dialogConfig.data = data;
  
            const dialogRef = this.dialog.open(PackPreviewComponent, dialogConfig);
            const dialogSub = dialogRef.afterClosed().subscribe(() => {
              dialogSub.unsubscribe();
              this.cardStateService.setCardOpen(false);
            });
          }, 0);
        }
      });
    },700);
    // Check if any card is currently open

  }



  onMouseEnter(event: any): void {
    // Start hover timer when mouse enters
    this.openPreviewDialog(event);
  }

  onMouseLeave(): void {
    // Clear the timeout if mouse leaves before 1 second
    clearTimeout(this.hoverTimeout);
  }
  
}