import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent  {
  @Input() imageSrc: string = '';
  @Input() buttonText: string = '';
  @Input() filterText: string = '';
  @Input() isActive: boolean = false;
  @Output() categoryClick = new EventEmitter<string>();

  handleClick() {
    this.categoryClick.emit(this.filterText);
  }
}
