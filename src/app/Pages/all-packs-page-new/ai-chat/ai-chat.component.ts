import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {
  userInput: string = '';
  placeholderHidden: boolean = false;
  isExpanded: boolean = false;
  responses: string[] = [];

  hidePlaceholder() {
    this.placeholderHidden = true;
  }

  showPlaceholder() {
    this.placeholderHidden = !this.userInput;
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
