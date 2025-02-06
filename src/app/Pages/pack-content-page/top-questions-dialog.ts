import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-questions-dialog',
  templateUrl: './top-questions-dialog.html',
  styleUrls: [],
})
export class TopQuestionsCustomDialogComponent {
  @Input() isOpen: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();

  onClose() {
    this.closeDialog.emit();
  }
}
