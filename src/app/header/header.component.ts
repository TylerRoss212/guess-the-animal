import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayStats: boolean = false;
  prod = environment.production;

  constructor() {
  }

  ngOnInit(): void {
  }

  showStats() {
      this.displayStats = true;
  }

}
