// packs-card.component.ts
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  DialogPosition,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { PackInfo } from 'src/app/Objects/packs';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import {
  PackPreviewComponent,
  previewData,
} from 'src/app/Shared Components/pack/pack-preview/pack-preview.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PacksCardService } from './packs-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-packs-card',
  templateUrl: './packs-card.component.html',
  styleUrls: ['./packs-card.component.css'],
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
  isCardOpen: boolean = false;

  constructor(
    public langDirectionService: LangDirectionService,
    private userAuthService: UserAuthService,
    public dialog: MatDialog,
    private cardStateService: PacksCardService,
    private snackBar: MatSnackBar
  ) {}

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

  // openPreviewDialog(event: any): void {
  //   const rect = this.targetDiv.nativeElement.getBoundingClientRect();

  //   // Calculate the center of the div
  //   const divCenterX = rect.left + rect.width / 2;
  //   const divCenterY = rect.top + rect.height / 2;

  //   // Assuming the dialog has maxWidth and maxHeight defined as 60vw and 70vh,
  //   const dialogMaxWidth = window.innerWidth * 0.6; // 60vw
  //   const dialogMaxHeight = window.innerHeight * 0.7; // 70vh

  //   // Define bottomThreshold - e.g., 80% of viewport height
  //   const bottomThreshold = window.innerHeight * 0.9;

  //   // Calculate initial top and left to center the dialog over the div
  //   let left = divCenterX - dialogMaxWidth / 2;
  //   let top = divCenterY - dialogMaxHeight / 2;

  //   // Adjust the position to ensure the dialog stays within the viewport boundaries
  //   if (left < 0) {
  //     left = 20; // Add some padding from the edge
  //   } else if (left + dialogMaxWidth > window.innerWidth) {
  //     left = window.innerWidth - dialogMaxWidth - 20; // Add some padding from the right edge
  //   }

  //   if (rect.bottom > bottomThreshold) {
  //     // If card is near the bottom, show tooltip and adjust dialog position
  //     top = window.innerHeight - dialogMaxHeight - 20;
  //     this.snackBar.open(this.getScrollMessage(), '', {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //     });
  //     this.isCardOpen = true;
  //   } else {
  //     // For cards in the middle, center the dialog vertically
  //     top = rect.top + rect.height / 2 - dialogMaxHeight / 2;
  //     this.isCardOpen = false;
  //   }

  //   // Set dialog position using the adjusted values
  //   const dialogPosition: DialogPosition = {
  //     left: `${left}px`,
  //     top: `${top}px`,
  //   };

  //   const isMobile = window.innerWidth <= 768;
  //   this.hoverTimeout = setTimeout(() => {
  //     this.cardStateService
  //       .getCardOpenState()
  //       .pipe(take(1))
  //       .subscribe((isOpen) => {
  //         if (!isOpen && !this.isCardOpen) {
  //           this.cardStateService.setCardOpen(true);
  //           setTimeout(() => {
  //             const dialogConfig = new MatDialogConfig();
  //             dialogConfig.autoFocus = true;
  //             dialogConfig.maxWidth = isMobile ? '90vw' : '620px';
  //             dialogConfig.maxHeight = isMobile ? '60vh' : '600px';
  //             if (!isMobile) {
  //               dialogConfig.position = dialogPosition;
  //             }
  //             const data: previewData = {
  //               pack: this.packInfo,
  //               showButtons: false,
  //             };
  //             dialogConfig.data = data;

  //             const dialogRef = this.dialog.open(
  //               PackPreviewComponent,
  //               dialogConfig
  //             );
  //             const dialogSub = dialogRef.afterClosed().subscribe(() => {
  //               dialogSub.unsubscribe();
  //               this.cardStateService.setCardOpen(false);
  //             });
  //           }, 0);
  //         }
  //       });
  //   }, 700);
  //   // Check if any card is currently open
  // }

  openPreviewDialog(event: any): void {
    const rect = this.targetDiv.nativeElement.getBoundingClientRect();
  
    // Calculate the center of the div
    const divCenterX = rect.left + rect.width / 2;
    const divCenterY = rect.top + rect.height / 2;
  
    // Assuming the dialog has maxWidth and maxHeight defined as 60vw and 70vh
    const dialogMaxWidth = window.innerWidth * 0.2; // 60vw
    const dialogMaxHeight = window.innerHeight * 0.3; // 70vh
  
    // Calculate the initial position to center the dialog over the div
    let dialogLeft = divCenterX - dialogMaxWidth / 2;
    let dialogTop = divCenterY - dialogMaxHeight / 2;
  
    // Adjust position to stay within viewport
    if (dialogLeft < 0) {
      dialogLeft = 10; // Small padding from the left edge
    } else if (dialogLeft + dialogMaxWidth > window.innerWidth) {
      dialogLeft = window.innerWidth - dialogMaxWidth - 10; // Padding from the right edge
    }
  
    if (dialogTop < 0) {
      dialogTop = 10; // Small padding from the top edge
    } else if (dialogTop + dialogMaxHeight > window.innerHeight) {
      dialogTop = window.innerHeight - dialogMaxHeight - 10; // Padding from the bottom edge
    }
  
    const dialogPosition: DialogPosition = {
      left: `${dialogLeft}px`,
      top: `${dialogTop}px`,
    };
  
    const isMobile = window.innerWidth <= 768;
    this.hoverTimeout = setTimeout(() => {
      this.cardStateService.getCardOpenState().pipe(take(1)).subscribe((isOpen) => {
        if (!isOpen) {
          this.cardStateService.setCardOpen(true);
          setTimeout(() => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.maxWidth = isMobile ? '90vw' : '480px';
            dialogConfig.maxHeight = isMobile ? '60vh' : '460px';
            if (!isMobile) {
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
    }, 700);
  }

  private getScrollMessage(): string {
    // Get current language from your language service
    const currentLang = this.langDirectionService.currentLang;

    const messages: { [key: string]: string } = {
      en: 'Scroll down a little bit to see it',
      he: 'גלול מטה מעט כדי לראות',
      ar: 'قم بالتمرير لأسفل قليلاً لرؤيته',
      es: 'Desplázate un poco hacia abajo para verlo',
      fr: 'Faites défiler un peu vers le bas pour le voir',
    };

    return messages[currentLang] || messages['en']; // Fallback to English if language not found
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
