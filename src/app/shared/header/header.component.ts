import { Component } from '@angular/core';
import {headerImages} from "../core/constans";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  protected readonly headerImages = headerImages;
}
