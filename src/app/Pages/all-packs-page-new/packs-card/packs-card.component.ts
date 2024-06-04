import { Component, Input, OnInit } from '@angular/core';
import { PackInfo } from 'src/app/Objects/packs';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-packs-card',
  templateUrl: './packs-card.component.html',
  styleUrls: ['./packs-card.component.css']
})
export class PacksCardComponent {

  constructor(public langDirectionService: LangDirectionService) { }

  @Input() backgroundColor: string;
  @Input() packInfo: PackInfo;

}
