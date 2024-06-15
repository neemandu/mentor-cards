import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit {
  @Input() userStatus: string = '';
  userInput: string = '';
  placeholderHidden: boolean = false;
  isExpanded: boolean = false;
  responses: string[] = [];
  // userStatus: string = 'PLAN';  // Change this value to test different statuses
  placeholderText: string = 'הייעוץ זמין למנויים בלבד ❤';

  ngOnInit() {
    if (this.userStatus === 'PLAN') {
      this.placeholderText = 'איך אפשר לעזור?';
    }
  }
  hidePlaceholder() {
    this.placeholderHidden = true;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  showPlaceholder() {
    this.placeholderHidden = this.userInput.length > 0;
  }

  sendMessage() {
    this.isExpanded = true;
    this.responses.push(this.userInput); // Add the user input to the responses
    this.userInput = ''; // Clear the input field
    this.showPlaceholder(); // Show the placeholder if the input field is empty

    // Simulate a response from the backend
    setTimeout(() => {
      this.responses.push('Placeholder response from backend');
    }, 1000);
  }
}
