import { Injectable } from '@angular/core';
import { PackInfo } from 'src/app/Objects/packs';

@Injectable({
  providedIn: 'root',
})
export class PackDataService {
  private topQuestions: string[];

  setTopQuestions(questions: string[]): void {
    this.topQuestions = questions;
    console.log('Top questions set:', questions);
  }

  getTopQuestions(): string[] {
    console.log('Top questions retrieved:', this.topQuestions);
    return this.topQuestions;
  }
}
