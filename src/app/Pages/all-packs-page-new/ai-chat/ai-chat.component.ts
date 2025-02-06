import { Component, HostListener, Input, OnInit } from '@angular/core';
import { APIService, AiInput } from 'src/app/API.service';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {
  hideChat: boolean = false;
  @Input() userStatus: string = '';
  @Input() placeholderText: string = '';
  userInput: string = '';
  placeholderHidden: boolean = false;
  isExpanded: boolean = false;
  responses: string[] = [];

  constructor(private api: APIService){}
  // userStatus: string = 'PLAN';  // Change this value to test different statuses
  // placeholderText: string = 'הייעוץ זמין למנויים בלבד ❤';

  // ngOnInit() {
  //   if (this.userStatus === 'PLAN') {
  //     this.placeholderText = 'איך אפשר לעזור?';
  //   }
  // }
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
    const userQuestion = this.userInput; // Store the user input in a local variable
    this.responses.push(this.userInput); // Add the user input to the responses
    this.userInput = ''; // Clear the input field
    this.showPlaceholder(); // Show the placeholder if the input field is empty

    // Simulate a response from the backend
    setTimeout(() => {    
      console.log("user question: " + userQuestion);
      var input: AiInput = { "question": userQuestion };
      this.api.AskTheAI(input).then(res => {this.responses.push(res.generalAnswer)}
      , reject => {
        console.log("file: ai-chat.component.ts ~ line 49 ~ this.api.sendMessage ~ reject", reject)
      })      
    }, 1000);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const footerHeight = document.querySelector('app-home-page-footer').clientHeight;
    const chatContainer = document.querySelector('.chat-container') as HTMLElement;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - footerHeight) {
      this.hideChat = true;
    } else {
      this.hideChat = false;
    }
  }
}
