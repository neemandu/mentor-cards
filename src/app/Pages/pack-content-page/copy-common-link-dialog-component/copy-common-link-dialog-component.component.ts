import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-copy-common-link-dialog-component',
  templateUrl: './copy-common-link-dialog-component.component.html',
  styleUrls: ['./copy-common-link-dialog-component.component.css']
})
export class CopyCommonLinkDialogComponent implements OnInit {
  constructor(private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  isMenuOpen = false;

  toggleMenu(state?: boolean) {
    this.isMenuOpen = state === undefined ? !this.isMenuOpen : state;
  }
  
  copyLink(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('הקישור הועתק בהצלחה', 'סגור', {
        duration: 2000
      });
    }).catch(err => this.snackBar.open('Failed to copy', 'Close'));
  }

  shareViaWhatsApp(url: string): void {
    const text = " הוזמנת להצטרף לחווית עבודה משותפת במנטור-קארדס! לכניסה, לחצו על הקישור: "
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text+url)}`;
    window.open(whatsappUrl, '_blank');
  }

  shareViaEmail(url: string): void {
    const subject = encodeURIComponent('הוזמנת להצטרף לחווית עבודה משותפת במנטור-קארדס!');
    const emailBody = encodeURIComponent(`לכניסה, לחצו על הקישור: ${url}`);
    window.open(`mailto:?subject=${subject}&body=${emailBody}`, '_blank');
  }

}
