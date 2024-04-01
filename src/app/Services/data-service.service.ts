import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  setData(data: any): void {
    const dataInLocalStorage = JSON.parse(localStorage.getItem('data'));
    if (dataInLocalStorage) {
     this.clearData();
    }
    localStorage.setItem('data', JSON.stringify(data));
  }

  getData(): any {
    const data = JSON.parse(localStorage.getItem('data'));
    // this.clearData();
    return data;
  }

  clearData(): void {
    localStorage.removeItem('data');
  }
}