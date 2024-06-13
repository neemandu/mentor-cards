import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {
  userInput: string = '';
  placeholderHidden: boolean = false;
  isChatDialogOpen: boolean = false;

  constructor(public dialog: MatDialog) {}

  sendMessage() {
    console.log(this.userInput);
    this.userInput = '';
  }

  hidePlaceholder() {
    this.placeholderHidden = true;
    this.isChatDialogOpen = true;
  }

  showPlaceholder() {
    if (!this.userInput) {
      this.placeholderHidden = false;
      this.isChatDialogOpen = false;
    }
  }

}
