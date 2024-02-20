
import { HttpClient } from '@angular/common/http';
import { GuideBookElement } from '../Objects/packs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DynamicPrintService {
  constructor(private http: HttpClient) {}

  processGuidebookElement(elements, depth = 0, numbers = []) : string{
    let htmlContent = '';
    elements.forEach((element, index) => {
        const currentNumbers = [...numbers, index + 1];
        const numberStr = currentNumbers.join(".");
        const indent = depth * 20; // Increase indentation by 20px for each level
  
        // Remove the specified string from element name if exists and apply numbering
        const elementName = element.name.replace("לפתיחה לחצו כאן", "");
        if (depth === 0) {
            htmlContent += `<h2 style="margin-right:${indent}px;"><b>${numberStr} ${elementName}</b></h2>`;
        } else if (depth === 1) {
            htmlContent += `<h3 style="margin-right:${indent}px;"><b>${numberStr} ${elementName}</b></h3>`;
        } else {
            htmlContent += `<p style="margin-right:${indent}px;">${numberStr} ${elementName}</p>`;
        }
  
        // Process sub-elements if any, increasing the depth and passing the current numbering path
        if ('subElements' in element && element.subElements) {
          htmlContent += this.processGuidebookElement(element.subElements, depth + 1, currentNumbers);
        }
    });
    return htmlContent;
  }

  generateGuideBookHtml(guideBook): string{  
    return this.processGuidebookElement(guideBook, 0, []);
  }

  printHtmlContent(templatePath: string, packName: string, packDesc: string, guideBook: GuideBookElement[], imgUrl: string): void {
    this.http.get(templatePath, { responseType: 'text' }).subscribe(template => {
      let filledTemplate = template;
      filledTemplate = filledTemplate.replace(new RegExp(`{{name}}`, 'g'), packName);
      filledTemplate = filledTemplate.replace(new RegExp(`{{description}}`, 'g'), packDesc);
      filledTemplate = filledTemplate.replace(new RegExp(`{{imgUrl}}`, 'g'), imgUrl);
      let guidbookHtml = this.generateGuideBookHtml(guideBook);
      filledTemplate = filledTemplate.replace(new RegExp(`{{guidebook}}`, 'g'), guidbookHtml);
      const printWindow = window.open('', '_blank');
      printWindow.document.write(filledTemplate);
      printWindow.document.close(); 
      printWindow.focus(); 

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    });
  }
}
